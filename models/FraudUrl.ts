import mongoose from 'mongoose';

const FraudUrlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  risk_level: { type: String, required: true },
  detected_on: { type: Date, required: true },
  category: { type: String, required: true },
  actionStatus: { type: String, default: 'none' }
});

export default mongoose.models.FraudUrl || mongoose.model('FraudUrl', FraudUrlSchema);
