const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 5000;

const openai = new OpenAI({
  apiKey: 'your-openai-api-key-here' // Replace with your OpenAI API key
});

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: userMessage }]
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error with AI API');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
