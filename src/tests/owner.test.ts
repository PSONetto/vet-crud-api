import { Address, Owner } from '@prisma/client';
import request from 'supertest';
import { App } from 'supertest/types';

import { createApp } from '../app';
import prisma from '../lib/prisma';

describe('POST /owner', () => {
  let app: App;

  const path = '/owner';

  const ownerData: Partial<Owner & Address> = {
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'john.doe@email.com',
    phoneNumber: '4445553333',
    alternativePhoneNumber: '4445552222',
    preferredContactMethod: 'Phone',
    idNumber: '999999999',
    occupation: 'Professor',
    additionalNotes: 'Nothing to mention',
    acceptUpdates: true,
    acceptMarketing: false,
    referralSource: 'Google',
    treatmentAuthorization: true,
    street: '498th Av Roses',
    city: 'Springfield',
    state: 'NY',
    zipCode: '12345',
  };

  beforeAll(() => {
    app = createApp();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Checking successful owner creation
  it('should create a new owner', async () => {
    const response = await request(app).post(path).send(ownerData).expect(201);

    const createdOwner: Owner = await response.body;

    // Checking if response type is JSON
    expect(response.type).toEqual('application/json');

    // Checking if response body contains core properties
    expect(createdOwner).toHaveProperty('id');
    expect(createdOwner).toHaveProperty('createdAt');
    expect(createdOwner).toHaveProperty('updatedAt');

    // checking if response body information matches the request body information
    expect(createdOwner.firstName).toEqual(ownerData.firstName);
    expect(createdOwner.lastName).toEqual(ownerData.lastName);
    expect(createdOwner.emailAddress).toEqual(ownerData.emailAddress);
    expect(createdOwner.phoneNumber).toEqual(ownerData.phoneNumber);
    expect(createdOwner.alternativePhoneNumber).toEqual(
      ownerData.alternativePhoneNumber,
    );
    expect(createdOwner.preferredContactMethod).toEqual(
      ownerData.preferredContactMethod,
    );
    expect(createdOwner.idNumber).toEqual(ownerData.idNumber);
    expect(createdOwner.occupation).toEqual(ownerData.occupation);
    expect(createdOwner.additionalNotes).toEqual(ownerData.additionalNotes);
    expect(createdOwner.acceptUpdates).toEqual(ownerData.acceptUpdates);
    expect(createdOwner.acceptMarketing).toEqual(ownerData.acceptMarketing);
    expect(createdOwner.referralSource).toEqual(ownerData.referralSource);
    expect(createdOwner.treatmentAuthorization).toEqual(
      ownerData.treatmentAuthorization,
    );

    // Deletes created owner from database
    await prisma.owner.delete({
      where: {
        id: createdOwner.id,
      },
    });
  });

  // Checking if field is missing
  it('should return 422 if first name is missing', async () => {
    const { firstName: _, ...newOwnerData } = ownerData;
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if last name is missing', async () => {
    const { lastName: _, ...newOwnerData } = ownerData;
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if phone is missing', async () => {
    const { phone: _, ...newOwnerData } = ownerData;
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if address is missing', async () => {
    const { address: _, ...newOwnerData } = ownerData;
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  // Checking if field is empty
  it('should return 422 if name is empty', async () => {
    const newOwnerData = { ...ownerData, name: '' };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if email is empty', async () => {
    const newOwnerData = { ...ownerData, email: '' };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if phone is empty', async () => {
    const newOwnerData = { ...ownerData, phone: '' };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if address is empty', async () => {
    const newOwnerData = { ...ownerData, address: '' };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  // Checking if field is null
  it('should return 422 if name is null', async () => {
    const newOwnerData = { ...ownerData, name: null };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if email is null', async () => {
    const newOwnerData = { ...ownerData, email: null };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if phone is null', async () => {
    const newOwnerData = { ...ownerData, phone: null };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if address is null', async () => {
    const newOwnerData = { ...ownerData, address: null };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  // Checking if field is undefined
  it('should return 422 if name is undefined', async () => {
    const newOwnerData = { ...ownerData, name: undefined };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if email is undefined', async () => {
    const newOwnerData = { ...ownerData, email: undefined };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if phone is undefined', async () => {
    const newOwnerData = { ...ownerData, phone: undefined };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if address is undefined', async () => {
    const newOwnerData = { ...ownerData, address: undefined };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  // Checking if field fails validation
  it('should return 422 if name contains numbers', async () => {
    const newOwnerData = { ...ownerData, name: 'John Doe2' };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if name contains symbols', async () => {
    const newOwnerData = { ...ownerData, name: 'John Doe*' };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if email is invalid', async () => {
    const newOwnerData = { ...ownerData, email: 'john.doe.com' };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if phone contains letters', async () => {
    const newOwnerData = { ...ownerData, phone: '551199999a999' };
    await request(app).post(path).send(newOwnerData).expect(422);
  });

  it('should return 422 if phone contains symbols', async () => {
    const newOwnerData = { ...ownerData, phone: '551199999*999' };
    await request(app).post(path).send(newOwnerData).expect(422);
  });
});
