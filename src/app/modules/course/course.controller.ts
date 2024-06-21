import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { CourseService } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCourseFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.updateCourseFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});

const assignFacultiesWIthCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.assignFacultiesWIthCourseIntoDB(id, faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assign successfully',
    data: result,
  });
});
const removeFacultiesWIthCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.removeFacultiesWIthCourseIntoDB(id, faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assign successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWIthCourse,
  removeFacultiesWIthCourse
};
