import { z } from "zod";

export const favoriteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["Movie", "TV Show"]),
  director: z.string().min(1, "Director is required"),
  budget: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  year: z.string().optional().nullable(),
  posterUrl: z.string().url().optional().nullable()
});

export type FavoriteInput = z.infer<typeof favoriteSchema>;
