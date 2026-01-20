import prompt from "prompt-sync";
const input = prompt();
import dotenv from "dotenv";
dotenv.config();

const apiAccount = process.env.API_CLOUD_FARE_ACCOUNT;
const apiToken = process.env.API_CLOUD_FARE_TOKEN;
const apiModel = process.env.API_CLOUD_FARE_MODEL;

let info = "";

let message = [
    {
        role: "system",
        content: `You are an expert in the field of Codex Academy agent. Answer the questions based on this expertise.`,
    },
];
while (info !== "exit") {

    info = input("Enter your question (type 'exit' to quit): ")
    
    const msg = {
        role: "user",
        content: info
    };
    message.push(msg);

    const data = await run(apiModel, message);

    console.log("AI Response:", data.result.response);

}
async function run(model, messages) {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${apiAccount}/ai/run/${model}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiToken}`
        },
        body: JSON.stringify({
            messages: messages
        })
    });
    const result = await response.json();
    return result;

}
