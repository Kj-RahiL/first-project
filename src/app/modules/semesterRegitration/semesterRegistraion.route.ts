import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistraion.controller';
import { SemesterRegistrationValidations } from './semesterRegistraion.validate';

const router = express.Router();

router.post(
  '/create-semesterRegistration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidateSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const CourseRoutes = router;
