import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from './admin.validation';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/:id', AdminControllers.getSingleAdmin);
router.patch(
  '/:id',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
router.delete('/:id', AdminControllers.deleteAdmin);
router.get('/', AdminControllers.getAllAdmin);

export const AdminRoutes = router;
