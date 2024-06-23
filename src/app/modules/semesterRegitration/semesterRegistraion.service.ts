import AppError from '../../errors/appError';
import QueryBuilder from '../../builder/QueryBuilder';
import httpStatus from 'http-status';
import { TSemesterRegistration } from './semesterRegistraion.interface';
import { SemesterRegistration } from './semesterRegistraion.model';
import { RegistrationStatus } from './semesterRegistraion.constant';
import { AcademicSemester } from '../academicSemester/academicSemester.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */
  const academicSemester = payload?.academicSemester;

  // step1
  const isThereAnyUpComingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpComingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpComingOrOngoingSemester.status} registered semester !`,
    );
  }

  // step2
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This Academic Semester is not found`,
    );
  }

  // step3
  const isSemesterExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterExists) {
    throw new AppError(httpStatus.CONFLICT, `This Semester is already exists`);
  }
  // step4
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const SemesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
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

const updateSemesterRegistrationFromDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
/**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   */

  // step1
  const isSemesterExists = await SemesterRegistration.findById(id);
  if (!isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, `This Semester is not exists`);
  }

  // step3
  const currentSemesterStatus = isSemesterExists?.status
  const requestedStatus = payload?.status;

  if(currentSemesterStatus === RegistrationStatus.ENDED ){
    throw new AppError(httpStatus.BAD_REQUEST, "This semester is already ended")
  }

  // step4
  if(currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED){
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  // step5
  if(currentSemesterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING){
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new:true,
    runValidators: true
  })

  return result
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationFromDB,
};
