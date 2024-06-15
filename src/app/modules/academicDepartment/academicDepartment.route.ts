import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validate';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.CreateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get('/:departmentId', AcademicDepartmentController.getSingleAcademicDepartment);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.UpdateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;
