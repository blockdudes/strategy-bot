import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import connectToDatabase from '@/lib/mongodb';
import { User, IUser } from '@/models/User';
import { Investment, WithdrawalRequest } from '@/models/Investment';
import Strategy from '@/models/Strategy';
import { ethers } from 'ethers';
import { abi as MultichainReceiverABI } from '@/abi/MultichainReceiver';
import { abi as Erc20ABI } from '@/abi/Erc20';

enum TransactionType {
    DEPOSIT = 'deposit',
    WITHDRAWAL_REQUEST = 'withdrawalRequest'
}

const provider = new ethers.JsonRpcProvider("https://arb-sepolia.g.alchemy.com/v2/0hnyAnUKEEZR33s1EVRNly0BXZThh_XS");
const contractAddress = "0xfb3c3ab7447e54825abd2aafedc54ba726961f27";
// const contract = new ethers.Contract(contractAddress, MultichainReceiverABI, provider);

export async function POST(request: NextRequest) {
    await connectToDatabase();
    
    try {
        const { username, amount, token, strategyId, type } = await request.json();
        
        if (!username || amount === undefined || !token || !strategyId || !type) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const user: IUser | null = await User.findOne({ username }) ;
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const wallet = new ethers.Wallet(user.privateKey, provider);
        const contract = new ethers.Contract(contractAddress, MultichainReceiverABI, wallet);
        const tokenContract = new ethers.Contract(token, Erc20ABI, wallet);

        
        
        let transaction;
        let receipt;
        if (type === TransactionType.DEPOSIT) {

            const allowance = await tokenContract.allowance(wallet.address, contractAddress);
            console.log(allowance)
            if (allowance < amount) {
                const approveTx = await tokenContract.approve(contractAddress, amount);
                await approveTx.wait();
            }
            console.log(allowance)

            const strategyIdUint32 = strategyId >>> 0;
            let tx = await contract.deposit(token, amount, BigInt(strategyIdUint32));
            receipt = await tx.wait();

            transaction = await Investment.create({
                amount,
                token,
                strategyId,
            });
            await User.updateOne(
                { username },
                { $push: { investments: transaction._id } }
            );

            await Strategy.findOneAndUpdate(
                { strategyId },
                { $inc: { balance: amount, totalInvested: amount } }
            );
        } else if (type === TransactionType.WITHDRAWAL_REQUEST) {

            let tx = await contract.withdraw(strategyId);
            receipt = await tx.wait();

            transaction = await WithdrawalRequest.create({
                amount,
                token,
                strategyId,
            });
            await User.updateOne(
                { username },
                { $push: { withdrawalRequests: transaction._id } }
            );

        } else {
            return NextResponse.json({ error: 'Invalid transaction type' }, { status: 400 });
        }

        const savedTransaction = await transaction.save();

        return NextResponse.json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully` }, { status: 200 });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}