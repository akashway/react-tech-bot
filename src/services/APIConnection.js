import { HfInference } from "@huggingface/inference"
const API_KEY = import.meta.env.VITE_API_KEY

async function* APIConnection(prompt) {
  const client = new HfInference(API_KEY)

  const stream = client.chatCompletionStream({
    model: "meta-llama/Llama-3.2-3B-Instruct",
    messages: [
      {
        role: "system",
        content: `
              You are a strict React assistant.

              You ONLY answer questions directly related to React or its ecosystem (ReactJS, React Native, Redux, Next.js, JSX, Hooks, Context API, etc.).

              You are also allowed to explain JavaScript concepts ONLY if they are directly relevant to understanding or using React.

              If the user asks about something outside of React or unrelated to React-focused JavaScript (like Python, CSS-only topics, or general backend concepts), respond with:
              "I'm designed to answer React-related questions only. Please ask something related to React or its ecosystem."

              When answering valid React (or React-relevant JS) questions, provide clear explanations, helpful examples, and best practices.
         `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    provider: "together",
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 0.7,
  })

  let response = ""

  yield "loading_start"
  for await (const chunks of stream) {
    const data = chunks.choices[0].delta.content
    yield data
  }
  yield "loading_end"
}

export default APIConnection
