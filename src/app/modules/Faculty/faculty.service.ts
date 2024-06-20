import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { FacultySearchableFields } from './faculty.constant';
import { Faculty } from './faculty.model';
import { TFaculty } from './faculty.interface';
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../user/user.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
    const { name, ...remainingFacultyData } = payload;
  
    const modifiedUpdateData: Record<string, unknown> = {
      ...remainingFacultyData,
    };
  
    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdateData[`name.${key}`] = value;
      }
    }
  
    const result = await Faculty.findByIdAndUpdate(id, modifiedUpdateData, {
      new: true,
      runValidators: true,
    });
  
    return result;
  };
  

const deleteFacultyFromDB = async (id: string) => {
  const isStudentExist = await Faculty.findById(id);

  if (!isStudentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This student does not exist');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }
    // get user id from deleted user
    const userId = deletedStudent.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete ');
  }
};

export const facultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
