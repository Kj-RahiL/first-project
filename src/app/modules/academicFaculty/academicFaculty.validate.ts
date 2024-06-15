import { z } from 'zod';

const CreateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'AcademicFaculty must be string',
    }),
  }),
});
const UpdateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'AcademicFaculty must be string',
    }),
  }),
});

export const AcademicFacultyValidation = {
  CreateAcademicFacultyValidationSchema,
  UpdateAcademicFacultyValidationSchema,
};
