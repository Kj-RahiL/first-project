import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.constant';
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
const createFacultyValidationSchema = z.object({
  id: z.string().min(1, { message: 'Id is required' }),
  user: z.string().min(1, { message: 'User is required' }),
  designation: z.string().min(1, { message: 'Designation is required' }),
  name: createUserNameValidationSchema,
  gender: z.enum([...Gender] as [string, ...string[]]),
  dateOfBirth: z.date().optional(),
  email: z.string().min(1, { message: 'Email is required' }).email(),
  contactNo: z.string().min(1, { message: 'Contact number is required' }),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'Emergency contact number is required' }),
  bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
  presentAddress: z.string().min(1, { message: 'Present address is required' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent address is required' }),
  profileImg: z.string().optional(),
  academicDepartment: z
    .string()
    .min(1, { message: 'Academic department is required' }),
  isDeleted: z.boolean().optional().default(false),
});

// update
const updateUserNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

// Define the Zod schema for the faculty schema
const updateFacultyValidationSchema = z.object({
  id: z.string().optional(),
  user: z.string().optional(),
  designation: z.string().optional(),
  name: updateUserNameValidationSchema,
  gender: z.enum([...Gender] as [string, ...string[]]).optional(),
  dateOfBirth: z.date().optional(),
  email: z.string().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  profileImg: z.string().optional(),
  academicDepartment: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export const facultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
