import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicValidations } from './academicSemester.Validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicValidations.createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);
router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemesters,
);
router.patch(
  '/:semesterId',
  validateRequest(AcademicValidations.updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.getUpdateAcademicSemesters,
);

export const AcademicSemesterRoutes = router;
