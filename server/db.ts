import { and, desc, eq, lte, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { blogPosts, InsertLead, InsertUser, leads, users } from "../drizzle/schema";
import { ENV } from "./_core/env";
import { blogSeedPosts } from "./blogSeed";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  textFields.forEach(field => {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  });
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  values.lastSignedIn ??= new Date();
  updateSet.lastSignedIn ??= new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function createLead(input: InsertLead) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(leads).values(input);
}

export async function listLeads() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function listPublishedPosts() {
  const db = await getDb();
  if (!db) return [];
  const now = new Date();
  return db.select().from(blogPosts).where(and(eq(blogPosts.status, "published"), or(lte(blogPosts.publishedAt, now), eq(blogPosts.publishedAt, null as never)))).orderBy(desc(blogPosts.publishedAt));
}

export async function listAllPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).orderBy(desc(blogPosts.updatedAt));
}

export async function getPostBySlug(slug: string, includeUnpublished = false) {
  const db = await getDb();
  if (!db) return undefined;
  const now = new Date();
  const visibility = includeUnpublished ? undefined : and(eq(blogPosts.status, "published"), or(lte(blogPosts.publishedAt, now), eq(blogPosts.publishedAt, null as never)));
  const conditions = visibility ? and(eq(blogPosts.slug, slug), visibility) : eq(blogPosts.slug, slug);
  const result = await db.select().from(blogPosts).where(conditions).limit(1);
  return result[0];
}

export async function savePost(input: {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  status: "draft" | "scheduled" | "published";
  publishedAt?: Date | null;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const values = { ...input, coverImage: input.coverImage || null, publishedAt: input.publishedAt ?? null };
  if (input.id) {
    await db.update(blogPosts).set(values).where(eq(blogPosts.id, input.id));
    return input.id;
  }
  const result = await db.insert(blogPosts).values(values);
  return Number(result[0].insertId);
}

export async function removePost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}


export async function ensureBlogSeed() {
  const db = await getDb();
  if (!db) return;
  try {
    for (const post of blogSeedPosts) {
      const existing = await db.select().from(blogPosts).where(eq(blogPosts.slug, post.slug)).limit(1);
      if (!existing.length) {
        await db.insert(blogPosts).values(post);
      } else {
        const current = existing[0];
        const isBotoxPost = post.slug.includes("botox");
        const needsContentRefresh = current.title.includes("Utera") || current.excerpt.includes("Utera") || current.content.includes("Utera") || (isBotoxPost && (!current.content.includes("Dysport") || !current.content.includes("Nabota") || !current.content.includes("Botox Allergan")));
        if (needsContentRefresh) {
          await db.update(blogPosts).set({ title: post.title, excerpt: post.excerpt, content: post.content, coverImage: post.coverImage, category: post.category, status: post.status, publishedAt: post.publishedAt }).where(eq(blogPosts.id, current.id));
        }
      }
    }
  } catch (error) {
    console.warn("[Blog] Seed skipped:", error);
  }
}
