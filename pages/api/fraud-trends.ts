// pages/api/fraud-trends.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongoose';
import FraudApp from '../../models/FraudApp';
import FraudUrl from '../../models/FraudUrl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const appTrends = await FraudApp.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$reported_on" } },
        count: { $sum: 1 }
      }
    }
  ]);

  const urlTrends = await FraudUrl.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$detected_on" } },
        count: { $sum: 1 }
      }
    }
  ]);

  const trendsMap: Record<string, number> = {};
  appTrends.forEach(item => {
    trendsMap[item._id] = (trendsMap[item._id] || 0) + item.count;
  });
  urlTrends.forEach(item => {
    trendsMap[item._id] = (trendsMap[item._id] || 0) + item.count;
  });

  const trends = Object.keys(trendsMap).map(date => ({
    date,
    fraud_cases_detected: trendsMap[date]
  }));
  trends.sort((a, b) => a.date.localeCompare(b.date));

  res.status(200).json(trends);
}
