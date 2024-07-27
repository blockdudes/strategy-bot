import mongoose, { Schema, Document } from 'mongoose';

interface IInvestment extends Document {
  amount: number;
  token: string;
  strategyId: string;
}

interface IWithdrawalRequest extends Document {
  token: string;
  amount: number;
  strategyId: string;
  status: string;
}

const InvestmentSchema: Schema<IInvestment> = new Schema({
  amount: { type: Number, required: true },
  token: { type: String, required: true },
  strategyId: { type: String, required: true },
}, { timestamps: true });

const WithdrawalRequestSchema: Schema<IWithdrawalRequest> = new Schema({
  token: { type: String, required: true },
  amount: { type: Number, required: true },
  strategyId: { type: String, required: true },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

export const Investment = mongoose.models.Investment || mongoose.model<IInvestment>('Investment', InvestmentSchema);
export const WithdrawalRequest = mongoose.models.WithdrawalRequest || mongoose.model<IWithdrawalRequest>('WithdrawalRequest', WithdrawalRequestSchema);

export type { IInvestment, IWithdrawalRequest };