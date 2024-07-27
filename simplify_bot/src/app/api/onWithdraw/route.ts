import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Strategy from '@/models/Strategy';
import { Admin } from '@/models/User';

export async function POST(request: NextRequest) {
    await connectToDatabase();
    try {
        const { strategyId, userId, amount } = await request.json();

        const strategy = await Strategy.findOne({ strategyId });
        if (!strategy) {
            return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
        }

        const admin = await Admin.findOne({ strategyOwner: userId });
        if (!admin) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }

        strategy.balance -= amount;

        admin.totalBalance -= amount;

        const withdrawalRequest = strategy.withdrawalRequests.find((req: { userId: any; status: string; strategyId: string; }) => req.userId === userId && req.status === 'pending' && req.strategyId === strategyId);
        if (withdrawalRequest) {
            withdrawalRequest.status = 'done';
        } else {
            return NextResponse.json({ error: 'Pending withdrawal request not found' }, { status: 404 });
        }

        await strategy.save();
        await admin.save();

        return NextResponse.json({ message: 'Withdrawal processed successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Server Error: ${error}` }, { status: 500 });
    }
}