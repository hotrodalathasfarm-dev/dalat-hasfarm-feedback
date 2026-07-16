import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const feedback = pgTable("feedback", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 120 }),
  phone: varchar("phone", { length: 20 }),
  department: varchar("department", { length: 140 }),
  content: text("content").notNull(),
  imagePath: text("image_path"),
  imageName: varchar("image_name", { length: 255 }),
  sheetSynced: boolean("sheet_synced").notNull().default(false),
  emailSent: boolean("email_sent").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type FeedbackRow = typeof feedback.$inferSelect;
export type NewFeedbackRow = typeof feedback.$inferInsert;
