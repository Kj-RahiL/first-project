import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { facultyServices } from './faculty.service';
// import studentValidationSchema from '../student.joi.valdation';

const getAllFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultiesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrieved successfully',
    data: result,
  });
});

const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.getSingleFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is retrieved successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;

  const result = await facultyServices.updateFacultyIntoDB(id, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated successfully',
    data: result,
  });
});

const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await facultyServices.deleteFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is deleted successfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
