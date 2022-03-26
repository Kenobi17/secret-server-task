import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  Cipher,
  Decipher,
} from 'crypto';

const algorithm: string = 'AES-256-ECB';
const secretKey: string = randomBytes(16).toString('hex');
const iv: Buffer = Buffer.from('');

export const encrypt = (text: string): string => {
  const cipher: Cipher = createCipheriv(algorithm, secretKey, iv);

  const encrypted: string = Buffer.concat([
    cipher.update(text),
    cipher.final(),
  ]).toString('hex');

  return encrypted;
};

export const decrypt = (encryptedText: string): string => {
  const decipher: Decipher = createDecipheriv(algorithm, secretKey, iv);

  const decrpyted: string = Buffer.concat([
    decipher.update(Buffer.from(encryptedText, 'hex')),
    decipher.final(),
  ]).toString();

  return decrpyted;
};
