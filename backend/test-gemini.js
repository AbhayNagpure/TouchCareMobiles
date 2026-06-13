import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
    try {
        const systemInstruction = "You are a test assistant.";
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            systemInstruction: systemInstruction 
        });

        const result = await model.generateContent("hello");
        const response = await result.response;
        console.log("Success:", response.text());
    } catch (error) {
        console.error("Test Error:", error);
    }
}
run();
