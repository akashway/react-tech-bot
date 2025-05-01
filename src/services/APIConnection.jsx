import { HfInference } from "@huggingface/inference"
const API_KEY = import.meta.env.VITE_API_KEY

async function APIConnection(prompt) {
  const client = new HfInference(API_KEY)

  const content = `You are a helpful and expert React assistant. Answer the following 
  question in detail with examples and code snippets if needed:
  ${prompt}`

  const stream = client.chatCompletionStream({
    model: "meta-llama/Llama-3.2-3B-Instruct",
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
    provider: "together",
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 0.7,
  })

  let out = ""

  for await (const chunk of stream) {
    if (chunk.choices && chunk.choices.length > 0) {
      const newContent = chunk.choices[0].delta.content
      out += newContent
    }
  }
  return out
}

export default APIConnection
