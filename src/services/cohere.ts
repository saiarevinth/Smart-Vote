import { COHERE_CONFIG } from '../config/cohere';
import { ChatMessage } from '../types/chat';

// Rate limiting variables
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

export async function generateResponse(messages: ChatMessage[]): Promise<string> {
  try {
    // Implement rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
    }
    lastRequestTime = Date.now();

    // Format the conversation history
    const conversation = messages.map(msg => 
      `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
    ).join('\n');

    // Prepare the prompt
    const prompt = `${COHERE_CONFIG.systemPrompt}\n\nConversation:\n${conversation}\nAssistant:`;

    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${COHERE_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: COHERE_CONFIG.model,
        prompt: prompt,
        max_tokens: COHERE_CONFIG.maxTokens,
        temperature: COHERE_CONFIG.temperature,
        k: COHERE_CONFIG.k,
        stop_sequences: COHERE_CONFIG.stopSequences
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(COHERE_CONFIG.errorMessages.rate_limit);
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error(COHERE_CONFIG.errorMessages.api_error);
      }
    }

    const data = await response.json();
    
    if (data.generations && data.generations.length > 0) {
      return data.generations[0].text.trim();
    } else {
      throw new Error(COHERE_CONFIG.errorMessages.api_error);
    }
  } catch (error) {
    console.error('Cohere API Error:', error);
    throw error;
  }
} 