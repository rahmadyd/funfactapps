import { z } from "zod";

export const CATEGORIES = [
  "python",
  "toefl",
  "design",
  "japanese",
  "machinelearning",
  "react",
  "nodejs",
  "sql",
  "nosql",
  "excel",
  "ielts",
  "affirmation",
  "linux",
  "git",
  "cicd",
  "docker",
  "tailwind",
  "publicspeaking",
  "confidence",
  // Fase 1 — Software Engineering
  "javascript",
  "htmlcss",
  "dsa",
  "networking",
  "restapi",
  "testing",
] as const;

export const FactSchema = z.object({
  category: z.enum(CATEGORIES),
  title: z.string().max(250),
  body: z.string(),
  example: z.string(),
  result: z.string(),
  why: z.string(),
  howTo: z.array(z.string()).min(1).max(8),
  usage: z.string(),
  quote: z.string().optional(), // Optional quote for design, affirmation, publicspeaking & confidence
});

export type Fact = z.infer<typeof FactSchema>;
export type Category = Fact["category"];

export const RequestSchema = z.object({
  category: z.enum([...CATEGORIES, "mixed"]),
  avoid: z.array(z.string().max(120)).max(15).default([]),
});

export type FactRequest = z.infer<typeof RequestSchema>;