import { test as base, expect } from '@playwright/test';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

type EncryptedPasswordFixtures = {
  EncryptedPassword: string;
};

const secretPass = process.env.SECRET_PASS;

if (!secretPass) {
  throw new Error('The SECRET_PASS environment variable is not set, be sure to set it before running the tests.');
}

function encryptPass(pass: string): string {
  return crypto.createHash('sha256').update(pass).digest('hex');
}

export const test = base.extend<EncryptedPasswordFixtures>({
  EncryptedPassword: [async ({}, use) => {
    const encrypted = encryptPass(secretPass);
    console.log('Successful logging, encrypted key:', encrypted);
    await use(encrypted);
  }, { auto: true }],
});

test.afterEach(async () => {
  console.log('Date and time of test completion:', new Date().toLocaleString());
});

export { expect };
