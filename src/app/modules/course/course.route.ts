import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validate';
const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get('/:id', CourseController.getSingleCourse);

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidateSchema),
  CourseController.updateCourse,
);
router.delete('/:id', CourseController.deleteCourse);

router.put(
  '/:id/assign-faculties',
  validateRequest(CourseValidations.courseFacultyValidationSchema),
  CourseController.assignFacultiesWIthCourse,
);
router.delete(
  '/:id/remove-faculties',
  validateRequest(CourseValidations.courseFacultyValidationSchema),
  CourseController.removeFacultiesWIthCourse,
);

router.get('/', CourseController.getAllCourses);

export const CourseRoutes = router;
