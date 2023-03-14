// pages/api/homes.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, meterInstructions } = req.body;

    const home = await prisma.home.create({
      data: {
        name,
        meterInstructions,
      },
    });

    res.status(200).json(home);
  } else if (req.method === 'GET') {
    const homes = await prisma.home.findMany();

    res.status(200).json(homes);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
