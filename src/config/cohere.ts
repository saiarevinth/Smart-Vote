export const COHERE_CONFIG = {
  apiKey: import.meta.env.VITE_COHERE_API_KEY,
  model: 'command',
  maxTokens: 100,
  temperature: 0.7,
  k: 0,
  stopSequences: ['Human:', '\n\n'],
  systemPrompt: `You are a helpful political advisor AI assistant. Your role is to provide information about:
  - Voting procedures and requirements
  - Political party information and policies
  - Electoral process and systems
  - Voter rights and responsibilities
  - Democratic principles and governance
  
  Always maintain neutrality and provide factual information. If you're unsure about specific details, say so.
  Do not make political endorsements or recommendations. Keep responses concise and focused.`,
  
  errorMessages: {
    api_error: 'There was an issue with the AI service. Please try again later.',
    rate_limit: 'Too many requests. Please wait a moment before trying again.',
    default: 'An error occurred. Please try again later.'
  }
}; 