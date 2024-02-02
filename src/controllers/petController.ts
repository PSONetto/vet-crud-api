import { Pet } from '@prisma/client';
import { Request, Response } from 'express';

import { invalidOwnerIdError, notFoundError } from '../errors/errors';
import {
  createPet,
  deletePet,
  getPet,
  listPets,
  updatePet,
} from '../services/petServices';

export async function listPetsController(req: Request, res: Response) {
  const pets = await listPets();

  pets ? res.json(pets) : res.status(404).json(notFoundError);
}

export async function getPetController(req: Request, res: Response) {
  const petId = Number(req.params.id);

  if (isNaN(petId)) res.status(400).json(invalidOwnerIdError);
  const pet = await getPet(petId);

  pet ? res.json(pet) : res.status(404).json(notFoundError);
}

export async function createPetController(req: Request, res: Response) {
  const pet = req.body as Pet;

  const result = await createPet(pet);

  result ? res.status(201).json(result) : res.status(404).json(notFoundError);
}

export async function updatePetController(req: Request, res: Response) {
  const pet = req.body as Pet;

  const petId = Number(req.params.id);
  if (isNaN(petId)) {
    res.status(400).json(invalidOwnerIdError);
  } else {
    const result = await updatePet(pet, petId);

    result ? res.json(result) : res.status(404).json(notFoundError);
  }
}

export async function deletePetController(req: Request, res: Response) {
  const petId = Number(req.params.id);
  if (isNaN(petId)) {
    res.status(400).json(invalidOwnerIdError);
  } else {
    const result = await deletePet(petId);

    result ? res.status(200).json(result) : res.status(404).json(notFoundError);
  }
}
