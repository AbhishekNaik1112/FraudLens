// models/FraudApp.ts
import mongoose from 'mongoose';

const FraudAppSchema = new mongoose.Schema({
  app_name: { type: String, required: true },
  developer: { type: String, required: true },
  category: { type: String, required: true },
  risk_level: { type: String, required: true },
  reported_on: { type: Date, required: true },
  actionStatus: { type: String, default: 'none' }
});

export default mongoose.models.FraudApp || mongoose.model('FraudApp', FraudAppSchema);
