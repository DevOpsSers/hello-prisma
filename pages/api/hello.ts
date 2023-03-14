// pages/api/hello.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name } = req.body;

    res.status(200).json({ message: `Hello, ${name}!` });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
