import { Router } from 'express';

import {
  createPetController,
  deletePetController,
  getPetController,
  listPetsController,
  updatePetController,
} from '../controllers/petController';
import petValidationMiddleware from '../middlewares/petValidationMiddleware';

const router = Router();

router.get('/', listPetsController);
router.get('/:id', getPetController);
router.post('/', createPetController);
router.patch('/:id', petValidationMiddleware, updatePetController);
router.delete('/:id', deletePetController);

export default router;
