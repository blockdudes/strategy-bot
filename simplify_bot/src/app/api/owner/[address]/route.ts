import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Strategy from '@/models/Strategy';
import { Admin } from '@/models/User';

export async function GET(request: NextRequest, {params}: {params: {address: string}}) {
    await connectToDatabase();
    try {
        const { address } = params;
        if (!address) {
            return NextResponse.json({ error: 'Admin ID is required' }, { status: 400 });
        }

        const admin = await Admin.findOne({ strategyOwner: address });
        if (!admin) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }

        const strategyIDs = admin.ownedStrategies;
        const strategies = await Strategy.find({ strategyId: { $in: strategyIDs } });

        return NextResponse.json(strategies, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Server Error: ${error}` }, { status: 500 });
    }
}