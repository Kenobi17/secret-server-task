import { Db, Collection, ObjectId } from 'mongodb';
import { randomBytes } from 'crypto';
import { encrypt, decrypt } from './crypto.utils';

import client from '../db';

const db: Db = client.db('secret-db');
const collection: Collection = db.collection('secrets');

export interface ISecret {
  _id: ObjectId;
  hash: string;
  secretText: string;
  createdAt: Date;
  expiresAt: Date;
}

export const writeSecretToDB = async (
  secret: string,
  expireAfter: number
): Promise<ISecret> => {
  const expiresAt =
    !expireAfter || expireAfter <= 0
      ? new Date(+0)
      : new Date(new Date().setSeconds(new Date().getSeconds() + expireAfter));

  const secretObj: ISecret = {
    _id: new ObjectId(),
    hash: randomBytes(20).toString('hex'),
    secretText: encrypt(secret),
    createdAt: new Date(),
    expiresAt,
  };

  const result = await collection.insertOne(secretObj);

  const savedSecret = (await collection.findOne({
    _id: result.insertedId,
  })) as ISecret;

  return savedSecret;
};

export const findSecret = async (hash: string): Promise<ISecret> => {
  const secret = (await collection.findOne({
    hash,
  })) as ISecret;

  if (!secret) {
    throw new Error('Secret not found');
  }

  if (secret.expiresAt.getTime() < new Date().getTime()) {
    throw new Error('Secret expired');
  }

  const decryptedSecret: ISecret = {
    ...secret,
    secretText: decrypt(secret.secretText),
  };

  return decryptedSecret;
};
