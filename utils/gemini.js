const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyCj5k6vgBsYB7_HNJdurqXkyBMjpyFKa8Q');

export async function generateText(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}