import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { ethers } from 'ethers';
import connectToDatabase from '../../../lib/mongodb';
import { User, IUser } from '../../../models/User';
import { Investment, WithdrawalRequest } from '@/models/Investment';
import { IInvestment, IWithdrawalRequest } from '@/models/Investment';
import Strategy from '@/models/Strategy';
import { v4 as uuidv4 } from 'uuid';


const TELEGRAM_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

if (!TELEGRAM_TOKEN) {
  console.error('Telegram bot token is not set. Please check your environment variables.');
}

const userStates: { [key: number]: string } = {};
const provider = new ethers.JsonRpcProvider("https://arb-sepolia.g.alchemy.com/v2/0hnyAnUKEEZR33s1EVRNly0BXZThh_XS");


async function setBotCommands() {
  try {
    const commands = [
      { command: 'start', description: 'Start interacting with the bot' },
      { command: 'create_wallet', description: 'Create a new wallet' },
      { command: 'receive', description: 'Get your address' },
      { command: 'get_invested_info', description: 'Get invested info' },
      { command: 'get_withdraw_info', description: 'Get withdrawal info' },
      { command: 'get_balance', description: 'Get user balance' },
      { command: 'get_faucet', description: 'Faucet' },
      { command: 'get_strategies', description: 'Get all strategies' },

    ];

    const response = await axios.post(`${TELEGRAM_API}/setMyCommands`, {
      commands,
    });

    console.log('Bot commands set:', response.data);
  } catch (error) {
    console.error('Error setting bot commands:', error);
  }
}

setBotCommands();

export async function POST(request: NextRequest) {
  await connectToDatabase();

  try {
    const body = await request.json();
    console.log('Received webhook update:', JSON.stringify(body, null, 2));

    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
      const username = body.message.from.username || body.message.from.id;
      console.log('Message received:', { chatId, text, username });


      if (userStates[chatId]) {
        const state = JSON.parse(userStates[chatId]);
        if (state.state === 'awaiting_investment_amount') {
          await handleInvest(chatId, username, state.strategyId, text);
          return NextResponse.json({ data: 'Investment processed' });
        }
      }

      switch (text) {
        case '/start':
          const keyboard = {
            inline_keyboard: [
              [{ text: '💼 Create Wallet', callback_data: 'create_wallet' }],
              [{ text: '🔑 Receive', callback_data: 'receive' }],
              [{ text: 'ℹ️ Get Invested Info', callback_data: 'get_invested_info' }],
              [{ text: 'ℹ️ Get Withdrawal Info', callback_data: 'get_withdraw_info' }],
              [{ text: '💰 Get Balance', callback_data: 'get_balance' }],
              [{ text: '💸 Faucet', callback_data: 'get_faucet' }],
            ]
          };
          console.log('Sending welcome message with keyboard to chatId:', chatId, 'Keyboard:', JSON.stringify(keyboard, null, 2));
          await sendMessage(chatId, '*Welcome!* 👋\n\nChoose an option:', keyboard, 'Markdown');
          break;
        case '/create_wallet':
          await handleCreateWallet(chatId, username);
          break;
        case '/receive':
          await handleReceivePublicKey(chatId, username);
          break;
        case '/get_invested_info':
          await handleGetInvestedInfo(chatId, username);
          break;
        case '/get_withdraw_info':
          await handleGetWithdrawStatus(chatId, username);
          break;
        case '/get_balance':
          await handleGetBalance(chatId, username);
          break;
        case '/get_faucet':
          await handleGetTokens(chatId, username);
          break;
        case '/get_strategies':
          await handleGetStrategies(chatId);
          break;
        default:
          await sendMessage(chatId, 'Unknown command. Please try again.', undefined, 'Markdown');
      }
    } else if (body.callback_query) {
      const chatId = body.callback_query.message.chat.id;
      const data = body.callback_query.data;
      const username = body.callback_query.from.username || body.callback_query.from.id;
      console.log('Callback query received:', { chatId, data, username });

      if (userStates[chatId]) {
        await sendMessage(chatId, '⚠️ You already have a pending request. Please wait a moment.', undefined, 'Markdown');
        return NextResponse.json({ data: 'Pending request' });
      }


      if (data.startsWith('strategy_')) {
        const strategyId = data.split('_')[1];
        await handleStrategySelection(chatId, strategyId);
      } else if (data.startsWith('withdraw_')) {
        const strategyId = data.split('_')[1];

        try {

          const user = await User.findOne({ username }).populate('investments');
          const investment = user?.investments.find((inv: { strategyId: string }) => inv.strategyId === strategyId);

          if (!investment) {
            await sendMessage(chatId, '❌ *No investment found for the specified strategy.*', undefined, 'Markdown');
            return NextResponse.json({ data: 'No investment found' });
          }

          const response = await fetch('http://localhost:3000/api/user/transact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              amount: investment.amount * 10**6,
              token: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d', 
              strategyId,
              type: "withdrawalRequest",
            }),
          });

          const result = await response.json();
          console.log('Transaction result:', result);

          if (response.ok) {
            await sendMessage(chatId, `✅ *Withdrawal request for strategy ${strategyId} has been processed successfully.*`, undefined, 'Markdown');
          } else {
            await sendMessage(chatId, `❌ *Failed to process withdrawal request: ${result.error}*`, undefined, 'Markdown');
          }
        } catch (error) {
          console.error('Error processing withdrawal request:', error);
          await sendMessage(chatId, '❌ *Error processing withdrawal request. Please try again.*', undefined, 'Markdown');
        }
      }
      else if (data.startsWith('invest_')) {
        const strategyId = data.split('_')[1];
        await sendMessage(chatId, 'Please enter the amount you want to invest:', undefined, 'Markdown');
        userStates[chatId] = JSON.stringify({ state: 'awaiting_investment_amount', strategyId });
      } else if (data === 'create_wallet') {
        await sendMessage(chatId, 'Creating your wallet, please wait... ⏳', undefined, 'Markdown');
        userStates[chatId] = 'creating_wallet';
        console.log(userStates[chatId])
        // const username = uuidv4();
        await handleCreateWallet(chatId, username);
        userStates[chatId] = '';
      }  else if (data === 'receive') {
        await sendMessage(chatId, 'Retrieving your user address, please wait... ⏳', undefined, 'Markdown');
        userStates[chatId] = 'retrieving_user_address';
        await handleReceivePublicKey(chatId, username);
        userStates[chatId] = '';
      } else if (data === 'get_invested_info') {
        await sendMessage(chatId, 'Retrieving your invested info, please wait... ⏳', undefined, 'Markdown');
        userStates[chatId] = 'retrieving_invested_info';
        await handleGetInvestedInfo(chatId, username);
        userStates[chatId] = '';
      } else if (data === 'get_balance') {
        await sendMessage(chatId, 'Retrieving your balance, please wait... ⏳', undefined, 'Markdown');
        userStates[chatId] = 'retrieving_balance';
        await handleGetBalance(chatId, username);
        userStates[chatId] = '';
      } else if (data === 'get_withdraw_info') {
        await sendMessage(chatId, 'Retrieving your withdraw info, please wait... ⏳', undefined, 'Markdown');
        userStates[chatId] = 'retrieving_withdrawal_info';
        await handleGetWithdrawStatus(chatId, username);
        userStates[chatId] = '';
      } else if (data === 'get_faucet') {
        await sendMessage(chatId, 'Retrieving USDC, please wait... ⏳', undefined, 'Markdown');
        userStates[chatId] = 'retrieving_usdc';
        await handleGetTokens(chatId, username);
        userStates[chatId] = '';
      } else {
        await sendMessage(chatId, '⚠️ Invalid callback query data. Please try again.', undefined, 'Markdown');
      }
    }

    console.log('No relevant data in the webhook update');
    return NextResponse.json({ data: 'No action taken' });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Error processing request' });
  }
}

export async function GET() {
  return new Response('Method Not Allowed', { status: 405 });
}

async function handleCreateWallet(chatId: number, username: string) {
  try {
    console.log('Creating wallet for username:', username);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      await sendMessage(chatId, '⚠️ A wallet already exists for this username.', undefined, 'Markdown');
      return;
    }

    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey;

    const user: IUser = new User({
      username,
      privateKey,
    });

    await user.save();

    await sendMessage(chatId, `✅ *Wallet created successfully!*\n\nUse the buttons below to manage your wallet.`, undefined, 'Markdown');
  } catch (error) {
    console.error('Error creating wallet:', error);
    await sendMessage(chatId, '❌ Error creating wallet. Please try again.', undefined, 'Markdown');
  }
}


async function handleInvest(chatId: number, username: string, strategyId: string, amountText: string) {
  try {
    const amount = parseFloat(amountText) * 10**6;
  
    if (isNaN(amount) || amount <= 0) {
      await sendMessage(chatId, '❌ *Invalid amount. Please enter a valid number.*', undefined, 'Markdown');
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      await sendMessage(chatId, '⚠️ No user found. Please create a wallet first.', undefined, 'Markdown');
      return;
    }

    const response = await fetch('http://localhost:3000/api/user/transact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        amount ,
        token: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d', 
        strategyId,
        type: "deposit",
      }),
    });

    const result = await response.json();

    if (response.ok) {
      await sendMessage(chatId, `✅ *Investment of ${amount / 10**6} for strategy ${strategyId} has been processed successfully.*`, undefined, 'Markdown');
    } else {
      console.error('Error processing investment:', result.error);
      await sendMessage(chatId, `❌ *Failed to process investment: ${result.error}*`, undefined, 'Markdown');
    }
  } catch (error) {
    console.error('Error processing investment:', error);
    await sendMessage(chatId, '❌ *Error processing investment. Please try again.*', undefined, 'Markdown');
  } finally {
    userStates[chatId] = '';
  }
}

async function handleReceivePublicKey(chatId: number, username: string) {
  try {
    console.log('Retrieving user address:', username);

    const user = await User.findOne({ username });
    if (!user) {
      await sendMessage(chatId, '⚠️ No wallet found for this username. Please create a wallet first.', undefined, 'Markdown');
      return;
    }

    const wallet = new ethers.Wallet(user.privateKey);
    const publicKey = wallet.address;

    await sendMessage(chatId, `🔑 *Your address is:*\n\`${publicKey}\``, undefined, 'Markdown');
  } catch (error) {
    console.error('Error retrieving user address:', error);
    await sendMessage(chatId, '❌ Error retrieving user address. Please try again.', undefined, 'Markdown');
  }
}

async function handleGetInvestedInfo(chatId: number, username: string) {
  try {
    const user = await User.findOne({ username }).populate('investments');
    const investments = user?.investments || [];

    if (investments.length > 0) {
      const messages = investments.map((inv: { amount: number, createdAt: Date, strategyId: string }) => {
        const message = `💰 *Invested Amount:* ${inv.amount / 10**6 }\n📅 *Date:* ${inv.createdAt.toISOString()}\n📈 *Strategy ID:* ${inv.strategyId}`;
        const inlineKeyboard = [
          [{ text: '💸 Withdraw', callback_data: `withdraw_${inv.strategyId}` }]
        ];
        return { message, inlineKeyboard };
      });

      for (const { message, inlineKeyboard } of messages) {
        await sendMessage(chatId, `ℹ️ *Your invested info:*\n\n${message}`, { inline_keyboard: inlineKeyboard }, 'Markdown');
      }
    } else {
      await sendMessage(chatId, 'ℹ️ *No investments found for your username.*', undefined, 'Markdown');
    }
  } catch (error) {
    console.error('Error getting investment info:', error);
    await sendMessage(chatId, '❌ *Error getting investment info. Please try again.*', undefined, 'Markdown');
  }
}

async function handleGetWithdrawStatus(chatId: number, username: string) {
  try {
    const user = await User.findOne({ username }).populate('withdrawalRequests');
    const withdrawalRequests = user?.withdrawalRequests || [];

    if (withdrawalRequests.length > 0) {
      const message = withdrawalRequests.map((req: { amount: number, createdAt: Date, strategyId: string, status: string }) =>
        `💰 *Amount:* ${req.amount / 10**6}\n📅 *Date:* ${req.createdAt.toISOString()}\n📈 *Strategy ID:* ${req.strategyId}\n📊 *Status:* ${req.status}`
      ).join('\n\n');
      await sendMessage(chatId, `ℹ️ *Your withdrawal req info:*\n\n${message}`, undefined, 'Markdown');
    } else {
      await sendMessage(chatId, 'ℹ️ *No withdrawal req found for your username.*', undefined, 'Markdown');
    }
  } catch (error) {
    console.error('Error getting withdrawal info:', error);
    await sendMessage(chatId, '❌ *Error getting withdrawal info. Please try again.*', undefined, 'Markdown');
  }
}

async function getBalancesFromBlockchain(publicKey: string, chainId: number) {
  try {

    const connectedNetwork = await provider.getNetwork();
    console.log('Connected to network:', connectedNetwork);

    const ethBalance = await provider.getBalance(publicKey);
    const eth = ethers.formatEther(ethBalance);

    const usdtContract = new ethers.Contract(
      '0x93d67359A0f6F117150a70fDde6BB96782497248',
      ['function balanceOf(address owner) view returns (uint256)'],
      provider
    );
    const usdcContract = new ethers.Contract(
      '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
      ['function balanceOf(address owner) view returns (uint256)'],
      provider
    );

    const usdtBalance = await usdtContract.balanceOf(publicKey);
    const usdcBalance = await usdcContract.balanceOf(publicKey);

    const usdt = ethers.formatUnits(usdtBalance, 6);
    const usdc = ethers.formatUnits(usdcBalance, 6);

    return { eth, usdt, usdc };
  } catch (error) {
    console.error('Error retrieving balances from blockchain:', error);
    throw new Error('Error retrieving balances from blockchain');
  }
}

async function handleGetBalance(chatId: number, username: string, chainId: number = 421614) {
  try {
    console.log('Retrieving balance for username:', username, 'on chainId:', chainId);

    const user = await User.findOne({ username });
    if (!user) {
      await sendMessage(chatId, '⚠️ No wallet found for this username. Please create a wallet first.', undefined, 'Markdown');
      return;
    }

    const wallet = new ethers.Wallet(user.privateKey);
    const publicKey = wallet.address;

    const balances = await getBalancesFromBlockchain(publicKey, chainId);

    const message = `🔑 *Your balances:*\n\n` +
      `ETH: ${balances.eth}\n` +
      `USDT: ${balances.usdt}\n` +
      `USDC: ${balances.usdc}`;

    await sendMessage(chatId, message, undefined, 'Markdown');
  } catch (error) {
    console.error('Error retrieving balance:', error);
    await sendMessage(chatId, '❌ Error retrieving balance. Please try again.', undefined, 'Markdown');
  }
}

async function handleGetTokens(chatId: number, username: string) {
  try {
    console.log('Retrieving USDC for username:', username);

    const user = await User.findOne({ username });
    if (!user) {
      await sendMessage(chatId, '⚠️ No wallet found for this username. Please create a wallet first.', undefined, 'Markdown');
      return;
    }

    const wallet = new ethers.Wallet(user.privateKey);
    const recipientAddress = wallet.address;

    const senderPrivateKey = process.env.NEXT_PUBLIC_DEMO_PRIVATE_KEY;
    const senderWallet = senderPrivateKey && new ethers.Wallet(senderPrivateKey, new ethers.JsonRpcProvider("https://arb-sepolia.g.alchemy.com/v2/0hnyAnUKEEZR33s1EVRNly0BXZThh_XS"));

    if (!senderWallet) {
      await sendMessage(chatId, '⚠️ Faucet not working. Please try again.', undefined, 'Markdown');
      return;
    }

    const amountToSendETH = ethers.parseUnits('0.1', 'ether');
    const ethBalance = await provider.getBalance(senderWallet.address);
    if (ethBalance < amountToSendETH) {
      await sendMessage(chatId, '⚠️ Insufficient ETH balance in the sender wallet.', undefined, 'Markdown');
      return;
    }

    const ethTx = await senderWallet.sendTransaction({
      to: recipientAddress,
      value: amountToSendETH
    });
    await ethTx.wait();


    const usdcContract = new ethers.Contract(
      '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
      [
        'function transfer(address to, uint256 amount) public returns (bool)',
        'function balanceOf(address owner) view returns (uint256)'
      ],
      senderWallet
    );

    const amountToSend = ethers.parseUnits('1', 6);

    const balance = await usdcContract.balanceOf(senderWallet.address);
    if (balance < amountToSend) {
      await sendMessage(chatId, '⚠️ Insufficient USDC balance in the sender wallet.', undefined, 'Markdown');
      return;
    }

    const tx = await usdcContract.transfer(recipientAddress, amountToSend);
    await tx.wait();

    await sendMessage(chatId, `✅ Successfully sent 1 USDC & 0.1 ETH to ${recipientAddress}`, undefined, 'Markdown');
  } catch (error) {
    console.error('Error retrieving USDT:', error);
    await sendMessage(chatId, '❌ Error retrieving Tokens. Please try again.', undefined, 'Markdown');
  }
}

async function handleGetStrategies(chatId: number) {
  try {
    const response = await axios.get('http://localhost:3000/api/strategy/get');
    console.log('strategies', response.data);
    const strategies: [any] = response.data;

    if (strategies.length > 0) {
      const inlineKeyboard = strategies.map(strategy => [
        {
          text: `${strategy.strategyName}`,
          callback_data: `strategy_${strategy.strategyId}`
        },

      ]);

      await sendMessage(chatId, '*Available Strategies:*', { inline_keyboard: inlineKeyboard }, 'Markdown');
    } else {
      await sendMessage(chatId, 'No strategies found.', undefined, 'Markdown');
    }
  } catch (error) {
    console.error('Error retrieving strategies:', error);
    await sendMessage(chatId, '❌ Error retrieving strategies. Please try again.', undefined, 'Markdown');
  }
}

async function handleStrategySelection(chatId: number, strategyId: string) {
  try {
    const response = await axios.get(`http://localhost:3000/api/strategy/get/${strategyId}`);
    const strategy = response.data;

    const message = `*${strategy.strategyName}*\n\n${strategy.strategyDescription}`;
    const inlineKeyboard = [
      [{ text: '💰 Invest', callback_data: `invest_${strategyId}` }]
    ];

    await sendMessage(chatId, message, { inline_keyboard: inlineKeyboard }, 'Markdown');
  } catch (error) {
    console.error('Error retrieving strategy details:', error);
    await sendMessage(chatId, '❌ Error retrieving strategy details. Please try again.', undefined, 'Markdown');
  }
}


async function sendMessage(chatId: number, text: string, reply_markup?: object, parse_mode?: string) {
  try {
    const response = await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: text,
      reply_markup: reply_markup,
      parse_mode: parse_mode
    });
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}