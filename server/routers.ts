import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createLead, getPostBySlug, listAllPosts, listLeads, listPublishedPosts, removePost, savePost } from "./db";

const fallbackPosts = [
  { id: 1, title: "Como escolher o protocolo ideal para sua pele", slug: "como-escolher-o-protocolo-ideal", excerpt: "Uma boa avaliação transforma dúvidas em um plano de cuidado possível, seguro e personalizado.", content: "Cada pele tem uma história. Na avaliação, observamos textura, sensibilidade, rotina e objetivos para construir um protocolo que respeite o seu tempo e a sua individualidade.\n\nTecnologia é ferramenta: o cuidado começa na escuta.", coverImage: "/assets/aya-editorial.jpg", category: "Cuidado", status: "published", publishedAt: new Date("2026-09-20T10:00:00Z") },
  { id: 2, title: "Tecnologia e naturalidade podem caminhar juntas", slug: "tecnologia-e-naturalidade", excerpt: "Conheça a lógica por trás de tratamentos que valorizam resultados progressivos e elegantes.", content: "Na estética avançada, o resultado mais bonito é aquele que parece seu. Protocolos progressivos, tecnologia adequada e acompanhamento próximo ajudam a preservar a naturalidade.", coverImage: "/assets/aya-treatment.jpg", category: "Tecnologia", status: "published", publishedAt: new Date("2026-09-12T10:00:00Z") },
] as const;

const postInput = z.object({
  id: z.number().optional(),
  title: z.string().min(4).max(180),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(20),
  coverImage: z.string().url().or(z.string().startsWith("/")),
  category: z.string().min(2).max(80),
  status: z.enum(["draft", "scheduled", "published"]),
  publishedAt: z.string().datetime().nullable().optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  leads: router({
    create: publicProcedure.input(z.object({ name: z.string().min(2).max(120), phone: z.string().min(8).max(30), email: z.string().email().max(320) })).mutation(async ({ input }) => {
      await createLead({ ...input, source: "site" });
      return { success: true };
    }),
    list: adminProcedure.query(() => listLeads()),
  }),
  blog: router({
    list: publicProcedure.query(async () => {
      const posts = await listPublishedPosts();
      return posts.length ? posts : fallbackPosts;
    }),
    bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      return (await getPostBySlug(input.slug)) ?? fallbackPosts.find(post => post.slug === input.slug) ?? null;
    }),
    adminList: adminProcedure.query(() => listAllPosts()),
    save: adminProcedure.input(postInput).mutation(({ input }) => savePost({ ...input, publishedAt: input.publishedAt ? new Date(input.publishedAt) : null })),
    remove: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => removePost(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
