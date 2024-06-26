import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistraion.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester:z.string(),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

const updateSemesterRegistrationValidateSchema = z.object({
  body: z.object({
    status: z
      .enum([...SemesterRegistrationStatus] as [string, ...string[]])
      .optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidateSchema,
};
