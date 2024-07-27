import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Strategy from '@/models/Strategy';


export async function GET(request: NextRequest, {params}: {params: {strategyID: string}}) {
    await connectToDatabase();
    try {
        const { strategyID } = params;
        if (!strategyID) {
            return NextResponse.json({ error: 'Strategy ID is required' }, { status: 400 });
        }

        const strategy = await Strategy.findOne({ strategyId: strategyID });
        if (!strategy) {
            return NextResponse.json({ error: 'Strategy not found' }, { status: 404 });
        }
        
        return NextResponse.json(strategy, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Server Error: ${error}` }, { status: 500 });
    }
}