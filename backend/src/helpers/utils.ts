import { PrismaClient } from '@prisma/client';
const APP_SECRET = process.env.APP_SECRET;
const jwt = require('jsonwebtoken');

export const prisma = new PrismaClient();

export function getTokenPayload(token: string) {
  return jwt.verify(token, APP_SECRET);
}
