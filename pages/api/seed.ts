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
      app_name: 'QuickCash Loan',
      developer: 'FastMoney Group',
      category: 'Finance',
      risk_level: 'High',
      reported_on: new Date('2025-03-10'),
    },
    {
      app_name: 'Fitness Tracker Pro',
      developer: 'HealthTech Mobile',
      category: 'Health',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-10'),
    },
    {
      app_name: 'VideoDownload Master',
      developer: 'Media Tools Co',
      category: 'Utilities',
      risk_level: 'Low',
      reported_on: new Date('2025-03-10'),
    },
    {
      app_name: 'Bitcoin Miner Pro',
      developer: 'Crypto Solutions',
      category: 'Trading',
      risk_level: 'High',
      reported_on: new Date('2025-03-10'),
    },
    {
      app_name: 'PDF Converter Elite',
      developer: 'Document Tools Inc',
      category: 'Productivity',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-05'),
    },
    {
      app_name: 'SocialPay Wallet',
      developer: 'Fintech Innovations',
      category: 'Finance',
      risk_level: 'High',
      reported_on: new Date('2025-03-05'),
    },
    {
      app_name: 'AI Photo Enhancer',
      developer: 'Creative Labs',
      category: 'Photography',
      risk_level: 'Low',
      reported_on: new Date('2025-03-05'),
    },
    {
      app_name: 'eTax Calculator',
      developer: 'Financial Tools Ltd',
      category: 'Finance',
      risk_level: 'High',
      reported_on: new Date('2025-02-28'),
    },
    {
      app_name: 'MediTracker',
      developer: 'HealthCare Apps',
      category: 'Health',
      risk_level: 'Medium',
      reported_on: new Date('2025-02-25'),
    },
    {
      app_name: 'FileLocker Secure',
      developer: 'Security First',
      category: 'Tools',
      risk_level: 'Low',
      reported_on: new Date('2025-02-22'),
    },
    {
      app_name: 'StockMarket Guru',
      developer: 'Trading Experts',
      category: 'Trading',
      risk_level: 'High',
      reported_on: new Date('2025-03-01'),
    },
    {
      app_name: 'LuxuryDeals',
      developer: 'Shopping Network',
      category: 'Shopping',
      risk_level: 'Medium',
      reported_on: new Date('2025-03-01'),
    },
    {
      app_name: 'VideoCall Assistant',
      developer: 'Communication Tools',
      category: 'Social',
      risk_level: 'Low',
      reported_on: new Date('2025-03-01'),
    },
    {
      app_name: 'Crypto Exchange Pro',
      developer: 'Blockchain Systems',
      category: 'Trading',
      risk_level: 'High',
      reported_on: new Date('2025-03-01'),
    },
    {
      app_name: 'SmartRecipes',
      developer: 'FoodTech Mobile',
      category: 'Lifestyle',
      risk_level: 'Medium',
      reported_on: new Date('2025-02-18'),
    },
    {
      app_name: 'GPS Tracker Plus',
      developer: 'Location Services',
      category: 'Navigation',
      risk_level: 'Low',
      reported_on: new Date('2025-02-15'),
    },
    {
      app_name: 'eBook Reader Pro',
      developer: 'Digital Publishing',
      category: 'Education',
      risk_level: 'Medium',
      reported_on: new Date('2025-02-14'),
    },
    {
      app_name: 'SmartHome Controller',
      developer: 'IoT Solutions',
      category: 'Utilities',
      risk_level: 'High',
      reported_on: new Date('2025-02-20'),
    },
    {
      app_name: 'Language Tutor AI',
      developer: 'EdTech Innovations',
      category: 'Education',
      risk_level: 'Medium',
      reported_on: new Date('2025-02-24'),
    },
    {
      app_name: 'Car Rental Finder',
      developer: 'Travel Services',
      category: 'Travel',
      risk_level: 'Low',
      reported_on: new Date('2025-02-27'),
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
      url: 'http://secure-bank-login.com',
      risk_level: 'High',
      detected_on: new Date('2025-03-10'),
      category: 'Phishing',
    },
    {
      url: 'http://free-stock-tips.com',
      risk_level: 'Medium',
      detected_on: new Date('2025-03-10'),
      category: 'Scam',
    },
    {
      url: 'http://movie-downloads.pro',
      risk_level: 'Low',
      detected_on: new Date('2025-03-10'),
      category: 'Malware',
    },
    {
      url: 'http://crypto-airdrop.info',
      risk_level: 'High',
      detected_on: new Date('2025-03-10'),
      category: 'Crypto Scam',
    },
    {
      url: 'http://unlimited-downloads.net',
      risk_level: 'Low',
      detected_on: new Date('2025-03-10'),
      category: 'Malware',
    },
    {
      url: 'http://tax-refund-express.com',
      risk_level: 'High',
      detected_on: new Date('2025-03-05'),
      category: 'Phishing',
    },
    {
      url: 'http://free-antivirus.download',
      risk_level: 'Medium',
      detected_on: new Date('2025-03-05'),
      category: 'Malware',
    },
    {
      url: 'http://dating-app-premium.com',
      risk_level: 'High',
      detected_on: new Date('2025-03-05'),
      category: 'Dating Scam',
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
      url: 'http://health-insurance-discount.com',
      risk_level: 'High',
      detected_on: new Date('2025-02-28'),
      category: 'Phishing',
    },
    {
      url: 'http://free-gift-cards.info',
      risk_level: 'Medium',
      detected_on: new Date('2025-02-28'),
      category: 'Scam',
    },
    {
      url: 'http://celebrity-news.pro',
      risk_level: 'Low',
      detected_on: new Date('2025-02-28'),
      category: 'Malware',
    },
    {
      url: 'http://investment-opportunity.net',
      risk_level: 'High',
      detected_on: new Date('2025-02-28'),
      category: 'Scam',
    },
    {
      url: 'http://social-security-update.com',
      risk_level: 'High',
      detected_on: new Date('2025-02-25'),
      category: 'Phishing',
    },
    {
      url: 'http://free-ebooks.download',
      risk_level: 'Medium',
      detected_on: new Date('2025-02-22'),
      category: 'Malware',
    },
    {
      url: 'http://job-offers-apply-now.com',
      risk_level: 'High',
      detected_on: new Date('2025-02-20'),
      category: 'Scam',
    },
    {
      url: 'http://covid-relief-funds.com',
      risk_level: 'High',
      detected_on: new Date('2025-02-18'),
      category: 'Phishing',
    },
    {
      url: 'http://free-music-downloads.xyz',
      risk_level: 'Low',
      detected_on: new Date('2025-02-15'),
      category: 'Malware',
    },
    {
      url: 'http://online-gaming-cheats.pro',
      risk_level: 'Medium',
      detected_on: new Date('2025-02-14'),
      category: 'Scam',
    },
    {
      url: 'http://credit-card-offer.net',
      risk_level: 'High',
      detected_on: new Date('2025-02-16'),
      category: 'Phishing',
    },
    {
      url: 'http://free-travel-voucher.com',
      risk_level: 'Medium',
      detected_on: new Date('2025-02-19'),
      category: 'Scam',
    },
    {
      url: 'http://government-grant-apply.now',
      risk_level: 'High',
      detected_on: new Date('2025-02-21'),
      category: 'Phishing',
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
