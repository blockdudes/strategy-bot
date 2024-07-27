import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import connectToDatabase from '@/lib/mongodb';
import { User, IUser } from '@/models/User';
import { Investment, WithdrawalRequest } from '@/models/Investment';


export async function POST(request: NextRequest) {
    await connectToDatabase();
    // const { username, amount, token, strategyId, type } = await request.json();
    
    try {
        
    } catch (error) {
        return NextResponse.json({ error: `!!Error ${error}` }, { status: 400 });
    }

}