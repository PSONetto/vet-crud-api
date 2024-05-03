import { Address, Owner } from '@prisma/client';

import prisma from '../lib/prisma';

export async function listOwners() {
  const owners = await prisma.owner.findMany({
    include: {
      address: true,
      pets: true,
    },
  });

  return owners;
}

export async function getOwner(id: number) {
  const owner = await prisma.owner.findUnique({
    include: {
      address: true,
      pets: true,
    },
    where: {
      id,
    },
  });

  return owner;
}

export async function getOwnerByEmail(email: string) {
  const owner = await prisma.owner.findFirst({
    where: {
      emailAddress: email,
    },
  });

  return owner;
}

export async function createOwner(owner: Owner & Address) {
  const result = await prisma.owner.create({
    data: {
      firstName: owner.firstName,
      lastName: owner.lastName,
      emailAddress: owner.emailAddress,
      phoneNumber: owner.phoneNumber,
      alternativePhoneNumber: owner.alternativePhoneNumber,
      preferredContactMethod: owner.preferredContactMethod,
      idNumber: owner.idNumber,
      occupation: owner.occupation,
      additionalNotes: owner.additionalNotes,
      acceptUpdates: owner.acceptUpdates,
      acceptMarketing: owner.acceptMarketing,
      referralSource: owner.referralSource,
      treatmentAuthorization: owner.treatmentAuthorization,
      address: {
        create: {
          street: owner.street,
          city: owner.city,
          state: owner.state,
          zipCode: owner.zipCode,
        },
      },
    },
  });

  return result;
}

export async function updateOwner(owner: Owner & Address, id: number) {
  const result = await prisma.owner.update({
    data: {
      firstName: owner.firstName,
      lastName: owner.lastName,
      emailAddress: owner.emailAddress,
      phoneNumber: owner.phoneNumber,
      alternativePhoneNumber: owner.alternativePhoneNumber,
      preferredContactMethod: owner.preferredContactMethod,
      idNumber: owner.idNumber,
      occupation: owner.occupation,
      additionalNotes: owner.additionalNotes,
      acceptUpdates: owner.acceptUpdates,
      acceptMarketing: owner.acceptMarketing,
      referralSource: owner.referralSource,
      treatmentAuthorization: owner.treatmentAuthorization, 
      address: {
        update: {
          data: {
            street: owner.street,
            city: owner.city,
            state: owner.state,
            zipCode: owner.zipCode,
          },
          where: {
            ownerId: id,
          },
        },
      },
    },
    where: {
      id,
    },
  });

  return result;
}

export async function deleteOwner(id: number) {
  const result = await prisma.owner.delete({
    where: {
      id,
    },
  });

  return result;
}
