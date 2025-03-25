import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongoose';
import User from '../../models/User';

type AuthResponse = { success: boolean; message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthResponse>) {
  await connectDB();
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && password === "password") {
      return res.status(200).json({ success: true, message: 'Login successful' });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
