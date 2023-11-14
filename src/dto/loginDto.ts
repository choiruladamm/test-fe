import * as z from 'zod';

export const loginDto = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(4, 'Password must have than 4 characters'),
});
