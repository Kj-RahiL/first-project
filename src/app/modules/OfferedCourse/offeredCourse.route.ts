import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const router = express.Router()

router.post('/create-offered-course', validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema), OfferedCourseController.createOfferedCourse)

router.get('/:id', OfferedCourseController.getSingleOfferedCourse)
router.patch('/:id',validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema), OfferedCourseController.updateOfferedCourse)
router.delete('/:id', OfferedCourseController.deleteOfferedCourse)
router.get('/', OfferedCourseController.getAllOfferedCourse)

export const OfferedCourseRoutes = router;