import { Schema, model } from 'mongoose';
import {
  TAcademicSemester,
} from './academicSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemesterConstant';



const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, required: true, enum: AcademicSemesterName },
  code: { type: String, required: true, enum: AcademicSemesterCode },
  year: { type: String, required: true },
  startMonth: { type: String, required: true, enum: Months },
  endMOnth: { type: String, required: true, enum: Months },
});

export const academicSemester = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
);
