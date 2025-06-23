import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  real,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - mandatory for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - mandatory for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  school: varchar("school"),
  class: varchar("class").default("Terminale D"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Lessons table for the 12 mathematical topics
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description"),
  icon: varchar("icon").default("fas fa-book"),
  color: varchar("color").default("blue"),
  order: integer("order").notNull(),
  isActive: boolean("is_active").default(true),
});

// Complex situations (math problems) for each lesson
export const situations = pgTable("situations", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id),
  title: varchar("title").notNull(),
  context: text("context").notNull(),
  supports: jsonb("supports"), // Array of support materials
  functions: jsonb("functions"), // Array of mathematical functions
  instructions: jsonb("instructions"), // Array of problem instructions
  difficulty: varchar("difficulty").default("medium"), // easy, medium, hard
  createdAt: timestamp("created_at").defaultNow(),
});

// User's problem resolutions
export const resolutions = pgTable("resolutions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  situationId: integer("situation_id").references(() => situations.id),
  introduction: text("introduction"),
  development: text("development"),
  conclusion: text("conclusion"),
  toolsUsed: jsonb("tools_used"), // Array of mathematical tools used
  steps: jsonb("steps"), // Array of solution steps
  aiAnalysis: jsonb("ai_analysis"), // AI-generated analysis
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Evaluations based on UEMOA criteria
export const evaluations = pgTable("evaluations", {
  id: serial("id").primaryKey(),
  resolutionId: integer("resolution_id").references(() => resolutions.id),
  cm1Pertinence: real("cm1_pertinence").default(0), // 0.75 max
  cm2OutilsMath: real("cm2_outils_math").default(0), // 2.5 max
  cm3Coherence: real("cm3_coherence").default(0), // 1.25 max
  cpPerfectionnement: real("cp_perfectionnement").default(0), // 0.5 max
  totalScore: real("total_score").default(0), // 5 max
  feedback: jsonb("feedback"), // Array of feedback comments
  createdAt: timestamp("created_at").defaultNow(),
});

// User progress tracking
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  lessonId: integer("lesson_id").references(() => lessons.id),
  completedSituations: integer("completed_situations").default(0),
  averageScore: real("average_score").default(0),
  totalAttempts: integer("total_attempts").default(0),
  lastAttempt: timestamp("last_attempt"),
  isCompleted: boolean("is_completed").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  resolutions: many(resolutions),
  progress: many(userProgress),
}));

export const lessonsRelations = relations(lessons, ({ many }) => ({
  situations: many(situations),
  userProgress: many(userProgress),
}));

export const situationsRelations = relations(situations, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [situations.lessonId],
    references: [lessons.id],
  }),
  resolutions: many(resolutions),
}));

export const resolutionsRelations = relations(resolutions, ({ one }) => ({
  user: one(users, {
    fields: [resolutions.userId],
    references: [users.id],
  }),
  situation: one(situations, {
    fields: [resolutions.situationId],
    references: [situations.id],
  }),
  evaluation: one(evaluations, {
    fields: [resolutions.id],
    references: [evaluations.resolutionId],
  }),
}));

export const evaluationsRelations = relations(evaluations, ({ one }) => ({
  resolution: one(resolutions, {
    fields: [evaluations.resolutionId],
    references: [resolutions.id],
  }),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [userProgress.lessonId],
    references: [lessons.id],
  }),
}));

// Zod schemas for validation
export const upsertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertSituationSchema = createInsertSchema(situations).omit({
  id: true,
  createdAt: true,
});

export const insertResolutionSchema = createInsertSchema(resolutions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEvaluationSchema = createInsertSchema(evaluations).omit({
  id: true,
  createdAt: true,
});

export const updateProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  updatedAt: true,
});

// Types
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Situation = typeof situations.$inferSelect;
export type Resolution = typeof resolutions.$inferSelect;
export type Evaluation = typeof evaluations.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertSituation = z.infer<typeof insertSituationSchema>;
export type InsertResolution = z.infer<typeof insertResolutionSchema>;
export type InsertEvaluation = z.infer<typeof insertEvaluationSchema>;
export type UpdateProgress = z.infer<typeof updateProgressSchema>;
