export const AINote = `
Para conectar a IA real no compositor, use o AI SDK com OpenAI:
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const { text } = await generateText({
  model: openai("gpt-4o"),
  prompt: "Sua mensagem aqui"
})
` // Consulte a doc do AI SDK [^2]
