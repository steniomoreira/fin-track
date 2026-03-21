import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  const adapter = new PrismaPg({ connectionString });
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.cachedPrisma) {
    const adapter = new PrismaPg({ connectionString });
    global.cachedPrisma = new PrismaClient({ adapter });
  }

  prisma = global.cachedPrisma;
}

export const db = prisma;
