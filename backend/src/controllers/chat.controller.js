import { GoogleGenerativeAI } from '@google/generative-ai';

export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ success: false, message: "Message is required" });
        }

        const systemInstruction = `You are the MobileCareTech (MCT) Expert Assistant. You work at a mobile repair shop in Hatta, Balaghat.
Here is your official shop information that you must use when answering customer questions:
- Owner Name: Kamlesh Dashhare
- Shop Address: High School Chowk, Hatta, Balaghat (MP)
- Contact Number: 7477090100
- Working Hours: 10:00 AM to 8:00 PM (Open Daily)

Your job is to answer customer questions politely about mobile repairs, new phones, quotes, and shop services.

CRITICAL LANGUAGE RULE: 90% of the customers do not understand English. If the user types or speaks in Hindi or Hinglish, you MUST reply entirely in Hindi (using Devanagari script or easy-to-read Hinglish). Only reply in English if the user speaks exclusively in fluent English.

Always be helpful, keep answers concise (2-3 sentences), and encourage them to visit the shop or contact Kamlesh on the provided number. 
Do not provide exact binding quotes, but rough estimates are fine (e.g., iPhone screens are typically ₹4000-₹8000 depending on quality).`;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            systemInstruction: systemInstruction 
        });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({
            success: true,
            reply: text,
        });

    } catch (error) {
        console.error("Chat Error:", error);
        return res.status(500).json({ success: false, message: "Failed to communicate with AI", error: error.message });
    }
};
