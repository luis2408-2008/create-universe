import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const theories = pgTable("theories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // scientific, conspiracy, fun-fact
  imageUrl: text("image_url"),
  source: text("source"),
  year: text("year"),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  videoUrl: text("video_url").notNull(),
  duration: text("duration"),
  views: integer("views").default(0),
});

export const expertOpinions = pgTable("expert_opinions", {
  id: serial("id").primaryKey(),
  expertName: text("expert_name").notNull(),
  position: text("position").notNull(),
  opinion: text("opinion").notNull(),
  imageUrl: text("image_url"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTheorySchema = createInsertSchema(theories);
export const insertVideoSchema = createInsertSchema(videos);
export const insertExpertOpinionSchema = createInsertSchema(expertOpinions);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTheory = z.infer<typeof insertTheorySchema>;
export type Theory = typeof theories.$inferSelect;

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;

export type InsertExpertOpinion = z.infer<typeof insertExpertOpinionSchema>;
export type ExpertOpinion = typeof expertOpinions.$inferSelect;
