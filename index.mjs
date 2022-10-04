//Imports
import dotenv from 'dotenv';
import readline from 'readline';
import { Configuration, OpenAIApi } from "openai";
//

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestionInTerminal(query) {
    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
}

let message = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. \n\nHuman: Hello, who are you? \nAI: I am an AI created by OpenAI. How can I help you today? \nHuman:What can you help me with?";
console.log(message);

while (true) {
    let response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: message,
        temperature: 0,
        max_tokens: 500
    });
    message = response.data.choices[0].text;
    console.log(response.data.choices[0].text);
    const ans = await askQuestionInTerminal("\nResponse:");
    message += "\nHuman:" + ans + "\nAI:";
}