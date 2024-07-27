import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IInvestment, IWithdrawalRequest } from './Investment';



interface IUser extends Document {
  username: string;
  privateKey: string;
  investments: IInvestment[];
  withdrawalRequests: IWithdrawalRequest[];
}

interface IAdmin extends Document {
  strategyOwner: string;
  ownedStrategies: string[];
  totalBalance: number;
}

const AdminSchema: Schema<IAdmin> = new Schema({
  strategyOwner: { type: String, required: true, unique: true, lowercase: true },
  ownedStrategies: [{ type: String, ref: 'Strategy' }]
}, { timestamps: true });

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true},
  privateKey: { type: String, required: true },
  investments: [{ type: Schema.Types.ObjectId, ref: 'Investment' }],
  withdrawalRequests: [{ type: Schema.Types.ObjectId, ref: 'WithdrawalRequest' }]
}, { timestamps: true });

// Apply the uniqueValidator plugin to UserSchema
UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
AdminSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

// Add collation to make username case-insensitive
UserSchema.index({ username: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });
AdminSchema.index({ strategyOwner: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });


export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export type { IUser , IAdmin};
