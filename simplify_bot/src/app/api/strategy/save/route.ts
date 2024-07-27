import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import connectToDatabase from '@/lib/mongodb';
import { Admin ,IAdmin } from '@/models/User';
import { Investment, WithdrawalRequest } from '@/models/Investment';
import { v4 as uuidv4 } from 'uuid';
import Strategy from '@/models/Strategy';

interface ExecutionStep {
    executionContract: string;
    data: string;
    value: string;
    type:string;
}

function generateNumericUUID() {
    const maxUint32 = 4294967295;
    const timestamp = Date.now() % maxUint32; // Get the current timestamp and ensure it fits within uint32
    const randomPart = Math.floor(Math.random() * maxUint32); // Generate a random number within uint32 range
    return (timestamp + randomPart) % maxUint32; // Combine and ensure it fits within uint32 range
}


export async function POST(request: NextRequest) {
    await connectToDatabase();
    try {
        const { strategyOwner, ExecutionSteps, isPublic = true, strategyName, strategyDescription } : {strategyOwner: string, ExecutionSteps: ExecutionStep[], isPublic?: boolean, strategyName: string, strategyDescription: string} = await request.json();
        
        console.log(strategyOwner, ExecutionSteps.length > 0);
        if (!strategyOwner || ExecutionSteps.length === 0) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        
        const strategyId = generateNumericUUID(); // Static value for testing
        console.log(`Generated strategyId: ${strategyId}`);

        // Validate strategyId
        if (strategyId < 0 || strategyId > 4294967295) {
            throw new Error(`strategyId out of bounds: ${strategyId}`);
        }
        
        const strategy = new Strategy({ strategyOwner, strategyId, ExecutionSteps, isPublic, strategyName, strategyDescription });
        await strategy.save();

        const isAdminExist = await Admin.findOne({ strategyOwner });
        if (!isAdminExist) {
            const admin = new Admin({ strategyOwner, ownedStrategies: [strategyId] });
            await admin.save();
        } else { 
            await Admin.findOneAndUpdate({ strategyOwner }, { $push: { ownedStrategies: strategyId } });
        }

        return NextResponse.json({ message: 'Strategy saved successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Server Error: ${error}` }, { status: 500 });
    }
}