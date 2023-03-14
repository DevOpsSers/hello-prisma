// pages/api/meter-readings.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { homeId, bookingId, readingDate, readingValue } = req.body;

    const meterReading = await prisma.meterReading.create({
      data: {
        home: {
          connect: { id: homeId },
        },
        booking: {
          connect: { id: bookingId },
        },
        readingDate,
        readingValue,
      },
    });

    res.status(200).json(meterReading);
  } else if (req.method === 'GET') {
    const meterReadings = await prisma.meterReading.findMany();

    res.status(200).json(meterReadings);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
