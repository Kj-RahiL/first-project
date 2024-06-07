/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utiles/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utiles/catchAsync';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;

  // const zodParseData = studentValidationSchema.parse(studentData)

  const result = await userServices.createStudentIntoDB(
    password,
    studentData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
};
