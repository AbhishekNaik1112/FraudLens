// pages/api/seed.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongoose';
import FraudApp from '../../models/FraudApp';
import FraudUrl from '../../models/FraudUrl';
import User from '../../models/User';

const mockData = {
  fraudulent_apps: [
    {
      app_name: 'FakeBank Pro',
      developer: 'XYZ Solutions',
      category: 'Finance',
      risk_level: 'High',
      reported_on: new Date('2025-03-15'),
    },
    {
      app_name: 'FreeCryptoWin',
      developer: 'ABC Corp',
      category: 'Trading',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-12'),
    },
    {
      app_name: 'LoanFastNow',
      developer: 'QuickMoney Ltd',
      category: 'Finance',
      risk_level: 'High',
      reported_on: new Date('2025-03-10'),
    },
    {
      app_name: 'MusicDownloader',
      developer: 'Unknown Dev',
      category: 'Entertainment',
      risk_level: 'Low',
      reported_on: new Date('2025-03-09'),
    },
    {
      app_name: 'InstaFollowers',
      developer: 'GrowthHackers Inc',
      category: 'Social Media',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-07'),
    },
    {
      app_name: 'HealthTracker Plus',
      developer: 'Wellness Apps Co',
      category: 'Health',
      risk_level: 'High',
      reported_on: new Date('2025-03-14'),
    },
    {
      app_name: 'DiscountDeals',
      developer: 'Savings Network',
      category: 'Shopping',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-13'),
    },
    {
      app_name: 'LoveConnect',
      developer: 'Dating Solutions LLC',
      category: 'Dating',
      risk_level: 'High',
      reported_on: new Date('2025-03-11'),
    },
    {
      app_name: 'TaxRefundFast',
      developer: 'Financial Services Group',
      category: 'Finance',
      risk_level: 'High',
      reported_on: new Date('2025-03-08'),
    },
    {
      app_name: 'BatterySaver Pro',
      developer: 'Mobile Tools Inc',
      category: 'Utilities',
      risk_level: 'Low',
      reported_on: new Date('2025-03-06'),
    },
    {
      app_name: 'VPNMaster Elite',
      developer: 'Security Networks',
      category: 'Tools',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-05'),
    },
    {
      app_name: 'PhotoEditor Pro',
      developer: 'Creative Apps Ltd',
      category: 'Entertainment',
      risk_level: 'Low',
      reported_on: new Date('2025-03-04'),
    },
    {
      app_name: 'CryptoMiner X',
      developer: 'Blockchain Technologies',
      category: 'Trading',
      risk_level: 'High',
      reported_on: new Date('2025-03-03'),
    },
    {
      app_name: 'FitnessGuru',
      developer: 'Health & Wellness Co',
      category: 'Health',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-02'),
    },
    {
      app_name: 'StockPredictor',
      developer: 'Market Analytics Corp',
      category: 'Trading',
      risk_level: 'High',
      reported_on: new Date('2025-03-01'),
    },
  ],
  fraudulent_urls: [
    {
      url: 'http://free-money-now.com',
      risk_level: 'High',
      detected_on: new Date('2025-03-14'),
      category: 'Phishing',
    },
    {
      url: 'http://get-rich-fast.biz',
      risk_level: 'Medium',
      detected_on: new Date('2025-03-12'),
      category: 'Scam',
    },
    {
      url: 'http://unlimited-downloads.net',
      risk_level: 'Low',
      detected_on: new Date('2025-03-10'),
      category: 'Malware',
    },
    {
      url: 'http://win-bitcoins-today.com',
      risk_level: 'High',
      detected_on: new Date('2025-03-09'),
      category: 'Crypto Scam',
    },
    {
      url: 'http://fakebank-login.com',
      risk_level: 'High',
      detected_on: new Date('2025-03-06'),
      category: 'Phishing',
    },
    {
      url: 'http://health-premium.com',
      risk_level: 'High',
      detected_on: new Date('2025-03-13'),
      category: 'Phishing',
    },
    {
      url: 'http://discount-gadgets.net',
      risk_level: 'Medium',
      detected_on: new Date('2025-03-11'),
      category: 'Scam',
    },
    {
      url: 'http://find-love-today.com',
      risk_level: 'High',
      detected_on: new Date('2025-03-08'),
      category: 'Dating Scam',
    },
    {
      url: 'http://tax-refund-now.com',
      risk_level: 'High',
      detected_on: new Date('2025-03-07'),
      category: 'Phishing',
    },
    {
      url: 'http://free-vpn-service.com',
      risk_level: 'Medium',
      detected_on: new Date('2025-03-05'),
      category: 'Malware',
    },
  ],
  user_authentication: [
    {
      email: 'admin@fraudlens.com',
      password: 'password',
      role: 'Admin',
    },
    {
      email: 'analyst@fraudlens.com',
      password: 'password',
      role: 'Analyst',
    },
  ],
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  await FraudApp.deleteMany({});
  await FraudUrl.deleteMany({});
  await User.deleteMany({});

  await FraudApp.insertMany(mockData.fraudulent_apps);
  await FraudUrl.insertMany(mockData.fraudulent_urls);
  await User.insertMany(mockData.user_authentication);

  res.status(200).json({ success: true, message: 'Database seeded successfully' });
}
