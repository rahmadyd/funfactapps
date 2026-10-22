import { z } from "zod";

export const FactSchema = z.object({
  category: z.enum(["python", "toefl", "design", "japanese", "machinelearning"]),
  title: z.string().max(120),
  body: z.string(),
  example: z.string(),
  result: z.string(),
  why: z.string(),
  howTo: z.array(z.string()).min(2).max(5),
  usage: z.string(),
  quote: z.string().optional(), // Optional quote, mainly for design category
});

export type Fact = z.infer<typeof FactSchema>;
export type Category = Fact["category"];

export const RequestSchema = z.object({
  category: z.enum(["python", "toefl", "design", "japanese", "machinelearning", "mixed"]),
  avoid: z.array(z.string().max(120)).max(15).default([]),
});

export type FactRequest = z.infer<typeof RequestSchema>;