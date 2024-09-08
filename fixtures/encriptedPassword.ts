import { test as base, expect } from '@playwright/test';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

type EncryptedPasswordFixtures = {
  EncryptedPassword: string;
};

const secretPass = process.env.SECRET_PASS;

if (!secretPass) {
  throw new Error('La variable de entorno SECRET_PASS no está definida, asegúrate de definirla antes de correr los tests');
}

function encryptPass(pass: string): string {
  return crypto.createHash('sha256').update(pass).digest('hex');
}

export const test = base.extend<EncryptedPasswordFixtures>({
  EncryptedPassword: async ({}, use) => {
    const encrypted = encryptPass(secretPass);
    console.log('Logueo exitoso, clave encriptada:', encrypted);
    await use(encrypted);
  },
});

export { expect };