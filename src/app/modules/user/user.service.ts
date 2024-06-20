/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // is password is given, default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set generate id
    userData.id = await generateStudentId(admissionSemester);

    // create user transaction-1
    const newUser = await User.create([userData], { session });

    // create student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err as any);
  }
};

const createFacultyIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // is password is given, default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'faculty';

  // find academic semester info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(400, 'Academic Department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set generate id
    userData.id = await generateFacultyId();

    // create user transaction-1
    const newUser = await User.create([userData], { session });

    // create student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
