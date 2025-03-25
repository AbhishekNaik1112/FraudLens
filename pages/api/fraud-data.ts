import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongoose';
import FraudApp from '../../models/FraudApp';
import FraudUrl from '../../models/FraudUrl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const fraudulent_apps = await FraudApp.find({});
  const fraudulent_urls = await FraudUrl.find({});
  res.status(200).json({ fraudulent_apps, fraudulent_urls });
}
