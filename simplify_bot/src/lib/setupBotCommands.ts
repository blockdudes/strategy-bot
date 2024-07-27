import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}`;

interface BotCommand {
  command: string;
  description: string;
}

const botCommands: BotCommand[] = [
  {
    command: 'start',
    description: 'Start interacting with the bot',
  },
  {
    command: 'create_wallet',
    description: 'Create a new wallet',
  },
  {
    command: 'receive',
    description: 'Get your public key',
  },
  {
    command: 'get_invested_info',
    description: 'Get your invested info',
  }
];

export const setBotCommands = async (): Promise<void> => {
  try {
    const response = await axios.post(`${TELEGRAM_API}/setMyCommands`, {
      commands: botCommands
    });
    console.log('Bot commands set:', response.data);
  } catch (error) {
    console.error('Error setting bot commands:', error);
  }
};

// Optionally, call the function if this script is run directly
if (require.main === module) {
  setBotCommands();
}
