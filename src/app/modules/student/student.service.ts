import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  
  const {name, guardian, localGuardian, ...remainingSTudentData} = payload;

  const modifiedUpdateData : Record<string, unknown> ={
    ...remainingSTudentData
  }

  if(name && Object.keys(name).length ){
    for(const [key, value] of Object.entries(name)){
      modifiedUpdateData[`name.${key}`] = value
    }
  }

  if(guardian && Object.keys(guardian)){
    for(const [key, value] of Object.entries(guardian)){
      modifiedUpdateData[`guardian.${key}`] = value
    }
  }

  if(localGuardian && Object.keys(localGuardian)){
    for(const [key, value] of Object.entries(localGuardian)){
      modifiedUpdateData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findOneAndUpdate(
    { id },
    modifiedUpdateData,
    {new: true, runValidators:true}
  )
    
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const isStudentExist = await Student.findOne({ id });

  if (!isStudentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This student does not exist');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
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

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
