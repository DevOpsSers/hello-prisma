import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma/client';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (req.method === 'GET') {
    try {
      const home = await prisma.home.findUnique({
        where: { id: parseInt(id) },
        include: { readings: true },
      });

      if (!home) {
        return res.status(404).json({ message: `Home with ID ${id} not found` });
      }

      return res.status(200).json(home);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving home data' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { readings } = req.body;

      const updatedReadings = await Promise.all(
        readings.map(async (reading) => {
          const updatedReading = await prisma.reading.upsert({
            where: { id: reading.id },
            update: { value: reading.value },
            create: { homeId: parseInt(id), value: reading.value },
          });
          return updatedReading;
        })
      );

      return res.status(200).json(updatedReadings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating readings data' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
