import { z } from 'zod';

export const experienceSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  company: z.string().min(1, 'Company is required'),
  period: z.string().min(1, 'Period is required'),
  description: z.string().min(1, 'Description is required'),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;

