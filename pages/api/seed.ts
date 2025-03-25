// pages/api/seed.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongoose';
import FraudApp from '../../models/FraudApp';
import FraudUrl from '../../models/FraudUrl';
import User from '../../models/User';

const mockData = {
  fraudulent_apps: [
    {
      app_name: 'QuickPay Express',
      developer: 'Innovatech Labs',
      category: 'Finance',
      risk_level: 'Low',
      reported_on: new Date('2025-03-01'),
      actionStatus: 'pending',
    },
    {
      app_name: 'InstaSafe Wallet',
      developer: 'TechNova Solutions',
      category: 'Finance',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-02'),
      actionStatus: 'report',
    },
    {
      app_name: 'CryptoGuard Pro',
      developer: 'GlobalSoft',
      category: 'Security',
      risk_level: 'High',
      reported_on: new Date('2025-03-03'),
      actionStatus: 'block',
    },
    {
      app_name: 'LoanZoom',
      developer: 'AlphaDev',
      category: 'Finance',
      risk_level: 'Low',
      reported_on: new Date('2025-03-04'),
      actionStatus: 'investigate',
    },
    {
      app_name: 'MusicStream Plus',
      developer: 'BetaWorks',
      category: 'Entertainment',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-05'),
      actionStatus: 'pending',
    },
    {
      app_name: 'SnapShopper',
      developer: 'Creative Minds',
      category: 'Shopping',
      risk_level: 'High',
      reported_on: new Date('2025-03-06'),
      actionStatus: 'report',
    },
    {
      app_name: 'FitLife Tracker',
      developer: 'NextGen Studios',
      category: 'Health',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-07'),
      actionStatus: 'block',
    },
    {
      app_name: 'EduMate Hub',
      developer: 'Digital Frontier',
      category: 'Education',
      risk_level: 'Low',
      reported_on: new Date('2025-03-08'),
      actionStatus: 'investigate',
    },
    {
      app_name: 'PhotoMagic Editor',
      developer: 'Pixel Perfect',
      category: 'Photography',
      risk_level: 'High',
      reported_on: new Date('2025-03-09'),
      actionStatus: 'pending',
    },
    {
      app_name: 'TravelMate Now',
      developer: 'Bright Future Inc.',
      category: 'Travel',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-10'),
      actionStatus: 'report',
    },
    {
      app_name: 'GameZone Arcade',
      developer: 'FutureWave',
      category: 'Gaming',
      risk_level: 'Low',
      reported_on: new Date('2025-03-11'),
      actionStatus: 'block',
    },
    {
      app_name: 'HealthFirst Monitor',
      developer: 'HealthTech Mobile',
      category: 'Health',
      risk_level: 'High',
      reported_on: new Date('2025-03-12'),
      actionStatus: 'investigate',
    },
    {
      app_name: 'BizConnect CRM',
      developer: 'Biz Innovators',
      category: 'Productivity',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-13'),
      actionStatus: 'pending',
    },
    {
      app_name: 'Foodie Finder',
      developer: 'FoodTech Ventures',
      category: 'Food',
      risk_level: 'Low',
      reported_on: new Date('2025-03-14'),
      actionStatus: 'report',
    },
    {
      app_name: 'NewsFlash Today',
      developer: 'MediaWorks',
      category: 'News',
      risk_level: 'High',
      reported_on: new Date('2025-03-15'),
      actionStatus: 'block',
    },
    {
      app_name: 'StyleSavvy',
      developer: 'StyleMakers',
      category: 'Lifestyle',
      risk_level: 'Medium',
      reported_on: new Date('2025-02-25'),
      actionStatus: 'investigate',
    },
    {
      app_name: 'TaskMaster Pro',
      developer: 'TaskForce',
      category: 'Productivity',
      risk_level: 'Low',
      reported_on: new Date('2025-02-26'),
      actionStatus: 'pending',
    },
    {
      app_name: 'EcoDrive Navigator',
      developer: 'EcoDynamics',
      category: 'Navigation',
      risk_level: 'High',
      reported_on: new Date('2025-02-27'),
      actionStatus: 'report',
    },
    {
      app_name: 'BuildIt Pro',
      developer: 'BuildSmart',
      category: 'Tools',
      risk_level: 'Medium',
      reported_on: new Date('2025-02-28'),
      actionStatus: 'block',
    },
    {
      app_name: 'CloudSync Manager',
      developer: 'CloudNine Systems',
      category: 'Utilities',
      risk_level: 'Low',
      reported_on: new Date('2025-03-01'),
      actionStatus: 'investigate',
    },
    {
      app_name: 'EventHive Planner',
      developer: 'Eventify',
      category: 'Event Management',
      risk_level: 'High',
      reported_on: new Date('2025-03-02'),
      actionStatus: 'pending',
    },
    {
      app_name: 'ZenMeditate',
      developer: 'Zenith Labs',
      category: 'Wellness',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-03'),
      actionStatus: 'report',
    },
    {
      app_name: 'ShopEase',
      developer: 'ShopSmart',
      category: 'Shopping',
      risk_level: 'Low',
      reported_on: new Date('2025-03-04'),
      actionStatus: 'block',
    },
    {
      app_name: 'CodeCraft IDE',
      developer: 'CodeMaster Inc.',
      category: 'Development',
      risk_level: 'High',
      reported_on: new Date('2025-03-05'),
      actionStatus: 'investigate',
    },
    {
      app_name: 'TravelEase',
      developer: 'TravelTech',
      category: 'Travel',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-06'),
      actionStatus: 'pending',
    },
  ],
  fraudulent_urls: [
    {
      url: 'http://secure-payments.com',
      risk_level: 'High',
      detected_on: new Date('2025-03-01'),
      category: 'Phishing',
    },
    {
      url: 'http://quick-loan.net',
      risk_level: 'Medium',
      detected_on: new Date('2025-03-02'),
      category: 'Scam',
    },
    {
      url: 'http://crypto-trade.org',
      risk_level: 'Low',
      detected_on: new Date('2025-03-03'),
      category: 'Malware',
    },
    {
      url: 'http://music-downloads.biz',
      risk_level: 'High',
      detected_on: new Date('2025-03-04'),
      category: 'Crypto Scam',
    },
    {
      url: 'http://shop-smart.io',
      risk_level: 'Medium',
      detected_on: new Date('2025-03-05'),
      category: 'Dating Scam',
    },
    {
      url: 'http://health-checkup.info',
      risk_level: 'Low',
      detected_on: new Date('2025-03-06'),
      category: 'Phishing',
    },
    {
      url: 'http://gamezone.fun',
      risk_level: 'High',
      detected_on: new Date('2025-03-07'),
      category: 'Scam',
    },
    {
      url: 'http://photo-editing.co',
      risk_level: 'Medium',
      detected_on: new Date('2025-03-08'),
      category: 'Malware',
    },
    {
      url: 'http://travel-deals.net',
      risk_level: 'Low',
      detected_on: new Date('2025-03-09'),
      category: 'Crypto Scam',
    },
    {
      url: 'http://edu-resources.com',
      risk_level: 'High',
      detected_on: new Date('2025-03-10'),
      category: 'Dating Scam',
    },
    {
      url: 'http://finance-plus.com',
      risk_level: 'Medium',
      detected_on: new Date('2025-03-11'),
      category: 'Phishing',
    },
    {
      url: 'http://invest-now.biz',
      risk_level: 'Low',
      detected_on: new Date('2025-03-12'),
      category: 'Scam',
    },
    {
      url: 'http://blockchain-hub.org',
      risk_level: 'High',
      detected_on: new Date('2025-03-13'),
      category: 'Malware',
    },
    {
      url: 'http://movie-streaming.net',
      risk_level: 'Medium',
      detected_on: new Date('2025-03-14'),
      category: 'Crypto Scam',
    },
    {
      url: 'http://fast-foods.io',
      risk_level: 'Low',
      detected_on: new Date('2025-03-15'),
      category: 'Dating Scam',
    },
    {
      url: 'http://news-desk.info',
      risk_level: 'High',
      detected_on: new Date('2025-02-20'),
      category: 'Phishing',
    },
    {
      url: 'http://social-media.fun',
      risk_level: 'Medium',
      detected_on: new Date('2025-02-21'),
      category: 'Scam',
    },
    {
      url: 'http://coding-zone.co',
      risk_level: 'Low',
      detected_on: new Date('2025-02-22'),
      category: 'Malware',
    },
    {
      url: 'http://home-automation.net',
      risk_level: 'High',
      detected_on: new Date('2025-02-23'),
      category: 'Crypto Scam',
    },
    {
      url: 'http://event-planner.com',
      risk_level: 'Medium',
      detected_on: new Date('2025-02-24'),
      category: 'Dating Scam',
    },
    {
      url: 'http://meditation.space',
      risk_level: 'Low',
      detected_on: new Date('2025-02-25'),
      category: 'Phishing',
    },
    {
      url: 'http://shopping-center.biz',
      risk_level: 'High',
      detected_on: new Date('2025-02-26'),
      category: 'Scam',
    },
    {
      url: 'http://crypto-miner.org',
      risk_level: 'Medium',
      detected_on: new Date('2025-02-27'),
      category: 'Malware',
    },
    {
      url: 'http://dating-tips.net',
      risk_level: 'Low',
      detected_on: new Date('2025-02-28'),
      category: 'Crypto Scam',
    },
    {
      url: 'http://investment-alerts.io',
      risk_level: 'High',
      detected_on: new Date('2025-03-01'),
      category: 'Dating Scam',
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
