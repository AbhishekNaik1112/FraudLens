import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongoose';
import FraudApp from '../../models/FraudApp';
import FraudUrl from '../../models/FraudUrl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { entityType, id, action } = req.body;

  if (!entityType || !id || !action) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  let updatedDoc;
  try {
    if (entityType === 'app') {
      updatedDoc = await FraudApp.findByIdAndUpdate(id, { actionStatus: action }, { new: true });
    } else if (entityType === 'url') {
      updatedDoc = await FraudUrl.findByIdAndUpdate(id, { actionStatus: action }, { new: true });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid entity type' });
    }
    if (!updatedDoc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    return res.status(200).json({ success: true, message: `Action '${action}' applied successfully`, data: updatedDoc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
