import { z } from 'zod';

export const CATEGORIES = ['sale', 'buy', 'service', 'exchange', 'other'] as const;

export const createAnnouncementSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(100, 'Title must be at most 100 characters'),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(2000, 'Description must be at most 2000 characters'),
  price: z.number().int('Price must be an integer').min(0, 'Price cannot be negative'),
  category: z.enum(CATEGORIES),
});

// Усі поля опціональні, але порожній об'єкт {} не дозволений
export const updateAnnouncementSchema = createAnnouncementSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const idParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const listQuerySchema = z.object({
  search: z.string().trim().optional(),
  sort: z.enum(['newest', 'oldest']).default('newest'),
  page: z.coerce.number().int().min(1).default(1),
});

export type IdParams = z.infer<typeof idParamsSchema>;
export type ListQuery = z.infer<typeof listQuerySchema>;
