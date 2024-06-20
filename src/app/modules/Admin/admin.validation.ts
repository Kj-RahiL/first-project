import { z } from 'zod';
import { BloodGroup, Gender } from './admin.constant';

// Define the Zod schema for the userName schema
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string().min(1, { message: 'Last Name is Required' }),
});

// Define the Zod schema for the faculty schema
const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      designation: z.string().min(1, { message: 'Designation is required' }),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().min(1, { message: 'Email is required' }).email(),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      profileImg: z.string().optional(),
    }),
  }),
});

// update
const updateUserNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

// Define the Zod schema for the admin schema
const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      designation: z.string().optional(),
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.date().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
