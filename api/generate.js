// api/generate.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 مفتاح Gemini مباشرة
const genAI = new GoogleGenerativeAI("AIzaSyCjeq7XI1uM2q9fkH1lVemkjhfAjfTVp1k");

// اختيار الموديل
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "⚠️ لازم تبعث prompt" });
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ text });
  } catch (err) {
    console.error("❌ API Error:", err);
    res.status(500).json({ error: "حدث خطأ أثناء التوليد" });
  }
}
