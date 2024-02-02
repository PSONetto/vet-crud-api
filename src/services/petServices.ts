import { Pet } from '@prisma/client';

import prisma from '../lib/prisma';

export async function listPets() {
  const pets = await prisma.pet.findMany({
    include: {
      owner: true,
    },
  });

  return pets;
}

export async function listPetsByOwner(ownerId: number) {
  const pets = await prisma.pet.findMany({
    where: {
      ownerId,
    },
  });

  return pets;
}

export async function getPet(id: number) {
  const pet = await prisma.pet.findUnique({
    include: {
      owner: true,
    },
    where: {
      id,
    },
  });

  return pet;
}

export async function createPet(pet: Pet) {
  const result = await prisma.pet.create({
    data: {
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      birthDate: pet.birthDate,
      sex: pet.sex,
      neuteredSpayed: pet.neuteredSpayed,
      colorMarks: pet.colorMarks,
      weight: pet.weight,
      dietaryNotes: pet.dietaryNotes,
      behavioralNotes: pet.behavioralNotes,
      ownerId: pet.ownerId,
    },
  });

  return result;
}

export async function updatePet(pet: Pet, id: number) {
  const result = await prisma.pet.update({
    data: {
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      birthDate: pet.birthDate,
      sex: pet.sex,
      neuteredSpayed: pet.neuteredSpayed,
      colorMarks: pet.colorMarks,
      weight: pet.weight,
      dietaryNotes: pet.dietaryNotes,
      behavioralNotes: pet.behavioralNotes,
      ownerId: pet.ownerId,
    },
    where: {
      id,
    },
  });

  return result;
}

export async function deletePet(id: number) {
  const result = await prisma.pet.delete({
    where: {
      id,
    },
  });

  return result;
}
