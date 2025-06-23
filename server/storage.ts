import {
  users,
  lessons,
  situations,
  resolutions,
  evaluations,
  userProgress,
  type User,
  type UpsertUser,
  type Lesson,
  type Situation,
  type Resolution,
  type Evaluation,
  type UserProgress,
  type InsertSituation,
  type InsertResolution,
  type InsertEvaluation,
  type UpdateProgress,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Lesson operations
  getAllLessons(): Promise<Lesson[]>;
  getLessonById(id: number): Promise<Lesson | undefined>;
  
  // Situation operations
  getSituationsByLessonId(lessonId: number): Promise<Situation[]>;
  getSituationById(id: number): Promise<Situation | undefined>;
  createSituation(situation: InsertSituation): Promise<Situation>;
  
  // Resolution operations
  createResolution(resolution: InsertResolution): Promise<Resolution>;
  getResolutionsByUserId(userId: string): Promise<Resolution[]>;
  getResolutionById(id: number): Promise<Resolution | undefined>;
  updateResolution(id: number, resolution: Partial<InsertResolution>): Promise<Resolution>;
  
  // Evaluation operations
  createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation>;
  getEvaluationByResolutionId(resolutionId: number): Promise<Evaluation | undefined>;
  
  // Progress operations
  getUserProgress(userId: string): Promise<UserProgress[]>;
  getUserProgressByLesson(userId: string, lessonId: number): Promise<UserProgress | undefined>;
  updateUserProgress(userId: string, lessonId: number, progress: UpdateProgress): Promise<UserProgress>;
  
  // Dashboard data
  getUserStats(userId: string): Promise<{
    weeklyScore: number;
    totalResolutions: number;
    completedLessons: number;
    currentStreak: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations - mandatory for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Lesson operations
  async getAllLessons(): Promise<Lesson[]> {
    return await db.select().from(lessons).orderBy(lessons.order);
  }

  async getLessonById(id: number): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson;
  }

  // Situation operations
  async getSituationsByLessonId(lessonId: number): Promise<Situation[]> {
    return await db.select().from(situations).where(eq(situations.lessonId, lessonId));
  }

  async getSituationById(id: number): Promise<Situation | undefined> {
    const [situation] = await db.select().from(situations).where(eq(situations.id, id));
    return situation;
  }

  async createSituation(situation: InsertSituation): Promise<Situation> {
    const [newSituation] = await db.insert(situations).values(situation).returning();
    return newSituation;
  }

  // Resolution operations
  async createResolution(resolution: InsertResolution): Promise<Resolution> {
    const [newResolution] = await db.insert(resolutions).values(resolution).returning();
    return newResolution;
  }

  async getResolutionsByUserId(userId: string): Promise<Resolution[]> {
    return await db
      .select()
      .from(resolutions)
      .where(eq(resolutions.userId, userId))
      .orderBy(desc(resolutions.createdAt));
  }

  async getResolutionById(id: number): Promise<Resolution | undefined> {
    const [resolution] = await db.select().from(resolutions).where(eq(resolutions.id, id));
    return resolution;
  }

  async updateResolution(id: number, resolution: Partial<InsertResolution>): Promise<Resolution> {
    const [updatedResolution] = await db
      .update(resolutions)
      .set({ ...resolution, updatedAt: new Date() })
      .where(eq(resolutions.id, id))
      .returning();
    return updatedResolution;
  }

  // Evaluation operations
  async createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation> {
    const [newEvaluation] = await db.insert(evaluations).values(evaluation).returning();
    return newEvaluation;
  }

  async getEvaluationByResolutionId(resolutionId: number): Promise<Evaluation | undefined> {
    const [evaluation] = await db
      .select()
      .from(evaluations)
      .where(eq(evaluations.resolutionId, resolutionId));
    return evaluation;
  }

  // Progress operations
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async getUserProgressByLesson(userId: string, lessonId: number): Promise<UserProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.lessonId, lessonId)));
    return progress;
  }

  async updateUserProgress(userId: string, lessonId: number, progress: UpdateProgress): Promise<UserProgress> {
    const [updatedProgress] = await db
      .insert(userProgress)
      .values({ ...progress, userId, lessonId, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.lessonId],
        set: { ...progress, updatedAt: new Date() },
      })
      .returning();
    return updatedProgress;
  }

  // Dashboard data
  async getUserStats(userId: string): Promise<{
    weeklyScore: number;
    totalResolutions: number;
    completedLessons: number;
    currentStreak: number;
  }> {
    const userResolutions = await this.getResolutionsByUserId(userId);
    const userProgressData = await this.getUserProgress(userId);
    
    // Calculate weekly score (last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklyResolutions = userResolutions.filter(
      r => r.createdAt && new Date(r.createdAt) >= oneWeekAgo
    );
    
    // This would need to be calculated based on evaluations
    const weeklyScore = weeklyResolutions.length > 0 ? 87 : 0; // Placeholder calculation
    
    const completedLessons = userProgressData.filter(p => p.isCompleted).length;
    
    return {
      weeklyScore,
      totalResolutions: userResolutions.length,
      completedLessons,
      currentStreak: 0, // Would need streak calculation logic
    };
  }
}

export const storage = new DatabaseStorage();
