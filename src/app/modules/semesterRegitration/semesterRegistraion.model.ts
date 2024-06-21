import { Schema, model } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistraion.interface';
import { SemesterRegistrationStatus } from './semesterRegistraion.constant';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      required: true,
      enum: SemesterRegistrationStatus,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      required: true,
    },
    maxCredit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistration = model<TSemesterRegistration>('SemesterRegistration', semesterRegistrationSchema)
