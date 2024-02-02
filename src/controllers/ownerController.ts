import { Address, Owner } from '@prisma/client';
import { Request, Response } from 'express';

import {
  emailConflictError,
  invalidOwnerIdError,
  notFoundError,
} from '../errors/errors';
import {
  createOwner,
  deleteOwner,
  getOwner,
  getOwnerByEmail,
  listOwners,
  updateOwner,
} from '../services/ownerServices';

export async function listOwnersController(req: Request, res: Response) {
  const owners = await listOwners();

  owners ? res.json(owners) : res.status(404).json(notFoundError);
}

export async function getOwnerController(req: Request, res: Response) {
  const ownerId = Number(req.params.id);

  if (isNaN(ownerId)) res.status(400).json(invalidOwnerIdError);
  const owner = await getOwner(ownerId);

  owner ? res.json(owner) : res.status(404).json(notFoundError);
}

export async function createOwnerController(req: Request, res: Response) {
  const owner = req.body as Owner & Address;

  const email = await getOwnerByEmail(owner.emailAddress);
  if (email) {
    res.status(409).json(emailConflictError);
  } else {
    const result = await createOwner(owner);

    result ? res.status(201).json(result) : res.status(404).json(notFoundError);
  }
}

export async function updateOwnerController(req: Request, res: Response) {
  const owner = req.body as Owner & Address;

  const ownerId = Number(req.params.id);
  if (isNaN(ownerId)) {
    res.status(400).json(invalidOwnerIdError);
  } else {
    const result = await updateOwner(owner, ownerId);

    result ? res.json(result) : res.status(404).json(notFoundError);
  }
}

export async function deleteOwnerController(req: Request, res: Response) {
  const ownerId = Number(req.params.id);
  if (isNaN(ownerId)) {
    res.status(400).json(invalidOwnerIdError);
  } else {
    const result = await deleteOwner(ownerId);

    result ? res.status(200).json(result) : res.status(404).json(notFoundError);
  }
}
