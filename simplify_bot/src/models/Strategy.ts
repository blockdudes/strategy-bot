import mongoose, { Schema, Document } from 'mongoose';


interface ExecutionStep {
    executionContract: string;
    data: string;
    value: string;
    type: string;
}

interface IStrategy extends Document {
  strategyId: string;
  strategyName: string;
  strategyDescription: string;
  ExecutionSteps: ExecutionStep[];
  isPublic: boolean;
  balance: number;
  totalInvested: number;
}
const IStrategySchema: Schema<IStrategy> = new Schema({
  strategyId: { type: String, required: true },
  strategyName: { type: String, required: true },
  strategyDescription: { type: String, required: true },
  ExecutionSteps: { type: [{ type: Schema.Types.Mixed }], required: true },
  isPublic: { type: Boolean },
  balance: { type: Number, default: 0 }, 
  totalInvested: { type: Number, default: 0 },
}, { timestamps: true });


const Strategy = mongoose.models.Strategy || mongoose.model<IStrategy>('Strategy', IStrategySchema);

export default Strategy
export type { IStrategy };