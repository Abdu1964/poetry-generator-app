// Import required packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables from the .env file
dotenv.config();

// Initialize the app
const app = express();

// Middleware to handle CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Initialize Google Generative AI with the API Key from .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use the API Key from .env file
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Use the Gemini model

// Set up a simple route to verify the server is working
app.get('/', (req, res) => {
  res.send('Poetry Generator API is running!');
});

// Route to dynamically generate poetry based on user input
app.post('/generate-poetry', async (req, res) => {
  const { keywords, style } = req.body;

  // Validate input
  if (!keywords || keywords.length === 0) {
    return res.status(400).send({ message: 'Keywords are required for generating the poem.' });
  }

  // Construct the prompt dynamically based on user input
  let prompt = `Write a vivid and emotional poem about ${keywords.join(', ')}.`;

  // Apply Zero-Shot Prompting (general instructions if no specific style is provided)
  if (!style) {
    prompt += `
      The poem should be imaginative, capturing feelings and imagery that make the reader reflect deeply on the themes.
      Use a variety of literary techniques such as metaphors, similes, and personification.
      Keep the tone poetic and elegant.
    `;
  } else {
    // Apply Few-Shot Prompting (incorporate user-specified style into the prompt)
    prompt += `
      Follow the style of ${style}. Use examples of this style to create a poem that feels authentic and true to it.
      Incorporate metaphors, similes, and vivid imagery to make the poem stand out.
    `;
  }

  // Log the generated prompt to check if it's constructed properly
  console.log("Generated prompt:", prompt);

  // LLM Settings for better control of output
  const settings = {
    temperature: 0.7, // Controls creativity
    maxTokens: 120, // Decrease tokens to generate a shorter poem
    topP: 0.9, // Nucleus sampling for diversity
    frequencyPenalty: 0.2, // Avoid repetition of words
    presencePenalty: 0.3 // Avoid repeated ideas
  };

  // Log the settings being used
  console.log("Using LLM settings:", settings);

  try {
    // Generate poetry using Google Generative AI
    const result = await model.generateContent(prompt, settings);

    // Log the result to verify if the model output is correct
    console.log("Generated poem:", result.response.text());

    // Limit the generated output to 10 lines (roughly)
    const poemLines = result.response.text().split('\n');
    const poem = poemLines.slice(0, 10).join('\n'); // Limit to 10 lines

    // Respond with the generated poetry
    res.json({ poem });
  } catch (error) {
    console.error('Error generating poetry:', error);
    res.status(500).send({ message: 'Error generating poetry. Please try again later.' });
  }
});

// Set server to listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
