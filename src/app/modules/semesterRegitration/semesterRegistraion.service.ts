import AppError from '../../errors/appError';
import QueryBuilder from '../../builder/QueryBuilder';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TSemesterRegistration } from './semesterRegistraion.interface';
import { SemesterRegistration } from './semesterRegistraion.model';

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {
  const SemesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('AcademicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await SemesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationFromDB = async (id: string, payload: Partial<TSemesterRegistration>) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updateBasicSemesterRegistrationInfo = await SemesterRegistration.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updateBasicSemesterRegistrationInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Basic update SemesterRegistration');
    }

    await session.commitTransaction();
    await session.endSession();
    const result = await SemesterRegistration.findById(id)
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    console.error('Error updating SemesterRegistration:', err); 
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to err update SemesterRegistration');
  }
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationFromDB,
};
