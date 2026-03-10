import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().optional(),
  tech: z.string().optional(),
  github: z.string().optional(),
  external: z.string().optional(),
  featured: z.boolean().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

