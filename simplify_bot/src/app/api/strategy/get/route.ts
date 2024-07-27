import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Strategy from '@/models/Strategy';

export async function GET(request: NextRequest) {
    await connectToDatabase();
    try {
        const publicStrategies = await Strategy.find({ isPublic: true });

        return NextResponse.json(publicStrategies, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Server Error: ${error}` }, { status: 500 });
    }
}