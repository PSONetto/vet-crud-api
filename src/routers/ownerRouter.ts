import { Router } from 'express';

import {
  createOwnerController,
  deleteOwnerController,
  getOwnerController,
  listOwnersController,
  updateOwnerController,
} from '../controllers/ownerController';
import ownerValidationMiddleware from '../middlewares/ownerValidationMiddleware';

const router = Router();

router.get('/', listOwnersController);
router.get('/:id', getOwnerController);
router.post('/', ownerValidationMiddleware, createOwnerController);
router.patch('/:id', ownerValidationMiddleware, updateOwnerController);
router.delete('/:id', deleteOwnerController);

export default router;
