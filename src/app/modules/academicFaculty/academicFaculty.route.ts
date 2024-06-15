import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validate';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.CreateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.UpdateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
