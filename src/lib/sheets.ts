import { google } from "googleapis";
import { readFile } from "fs/promises";
import path from "path";
import { vietnamTimestamp } from "./constants";

export type SheetRecord = {
  fullName: string;
  phone: string;
  department: string;
  content: string;
  imagePath: string | null;
  imageName: string | null;
};

function getAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey) return null;
  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });
}

async function uploadEvidenceToDrive(
  auth: NonNullable<ReturnType<typeof getAuth>>,
  record: SheetRecord,
): Promise<string | null> {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!folderId || !record.imagePath) return null;
  try {
    const drive = google.drive({ version: "v3", auth });
    const buffer = await readFile(record.imagePath);
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Readable } = require("stream") as typeof import("stream");
    const created = await drive.files.create({
      requestBody: {
        name: record.imageName ?? path.basename(record.imagePath),
        parents: [folderId],
      },
      media: { body: Readable.from(buffer) },
      fields: "id,webViewLink",
    });
    const fileId = created.data.id;
    if (fileId) {
      await drive.permissions.create({
        fileId,
        requestBody: { role: "reader", type: "anyone" },
      });
    }
    return (
      created.data.webViewLink ??
      (fileId ? `https://drive.google.com/file/d/${fileId}/view` : null)
    );
  } catch (err) {
    console.error("[sheets] Drive upload failed:", err);
    return null;
  }
}

/**
 * Appends one feedback row to the configured Google Sheet.
 * Returns true when the row was written, false when skipped/failed.
 */
export async function appendFeedbackToSheet(
  record: SheetRecord,
  createdAt: Date,
): Promise<boolean> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const auth = getAuth();
  if (!spreadsheetId || !auth) {
    console.warn(
      "[sheets] GOOGLE_SHEET_ID / GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY not configured — skipping sheet sync.",
    );
    return false;
  }

  try {
    const imageLink = await uploadEvidenceToDrive(auth, record);
    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: process.env.GOOGLE_SHEET_RANGE || "Sheet1!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            vietnamTimestamp(createdAt),
            record.fullName || "Ẩn danh",
            record.phone,
            record.department,
            record.content,
            imageLink ?? (record.imageName ? record.imageName : ""),
            "Mới",
          ],
        ],
      },
    });
    return true;
  } catch (err) {
    console.error("[sheets] append failed:", err);
    return false;
  }
}
