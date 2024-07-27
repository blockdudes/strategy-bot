import { ethers } from "ethers";

export const POST = async (request: any) => {
    try {
        // Await the JSON parsing
        const webhookData = await request.json();

        // Log the received data
        console.log('Received webhook data:', {
            webhookId: webhookData.webhookId,
            id: webhookData.id,
            type: webhookData.type,
            blockHash: webhookData.block?.hash,
            blockNumber: webhookData.block?.number,
            logsCount: webhookData.block?.logs?.length
        });

        // Check if the data is empty or logs are empty
        if (!webhookData || !webhookData.block || !webhookData.block.logs || webhookData.block.logs.length === 0) {
            console.log('Received empty or irrelevant webhook data');
            return new Response(JSON.stringify({ message: "No relevant data" }), { status: 200 });
        }

        // Process the logs
        webhookData.block.logs.forEach((log: any) => {
            console.log('Processing log:', log);
            // Add your log processing logic here
        });

        return new Response(JSON.stringify({ message: "correct!" }), { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}