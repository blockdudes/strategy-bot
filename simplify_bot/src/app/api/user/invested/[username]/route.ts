import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import connectToDatabase from '@/lib/mongodb';
import { User, IUser } from '@/models/User';
import { Investment, WithdrawalRequest } from '@/models/Investment';


export async function GET(request: NextRequest, {params}: {params: {username : string  }}) {
    await connectToDatabase();    
    try {
        const userName = params.username;
        const user = await User.findOne({ username: userName });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 403 });
        }
        
        const investedStrategy = user.investments;
        if (investedStrategy.length === 0) {
            return NextResponse.json({ error: 'User havenot invested in any strategy yet ' }, { status: 404 });
        }
        
        
    } catch (error) {
        return NextResponse.json({ error: `!!Error ${error}` }, { status: 500 });
    }

}