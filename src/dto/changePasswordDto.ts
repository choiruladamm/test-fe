import * as z from 'zod';

export const changePasswordDto = z
  .object({
    oldPassword: z.string().min(1, 'Old Password is required'),
    newPassword: z
      .string()
      .min(1, 'New Password is required')
      .min(4, 'New Password must have than 4 characters'),
    confirmNewPassword: z
      .string()
      .min(1, 'New Confirm Password confirmation is required'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Password do not match',
  });
