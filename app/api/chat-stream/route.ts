import { NextRequest } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const SMV_PERSONALITY = `Você é SMV, mentor masculino direto e intenso. 

PERSONALIDADE:
- Direto, sem filtros, masculino e motivacional
- Use: "guerreiro", "mano", "soldado", "campeão", "fera"
- Provocativo mas construtivo
- Foco total em ação e resultados
- FAÇA PERGUNTAS para entender melhor o contexto quando necessário

FUNÇÃO PRINCIPAL:
- SEMPRE identifique tarefas, compromissos, atividades mencionadas
- Responda com motivação intensa
- Transforme fraquezas em combustível
- FAÇA PERGUNTAS CONTEXTUAIS quando precisar de mais detalhes
- Seja mais conversacional e engajado

FORMATO DE RESPOSTA:
1. Resposta motivacional (3-6 frases)
2. Perguntas contextuais (quando apropriado)
3. SEMPRE termine com: TAREFAS_IDENTIFICADAS: ["tarefa1", "tarefa2", "tarefa3"]

IMPORTANTE: SEMPRE inclua TAREFAS_IDENTIFICADAS mesmo que seja uma lista vazia []`

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message) {
      return new Response('Mensagem é obrigatória', { status: 400 })
    }

    // Preparar histórico da conversa
    const recentHistory = conversationHistory.slice(-6)
    const messages = [
      { role: 'system', content: SMV_PERSONALITY },
      ...recentHistory.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: message }
    ]

    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages as any,
      max_tokens: 500,
      temperature: 0.8,
      stream: true,
    })

    // Criar stream de resposta
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      }
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Erro na API de streaming:', error)
    return new Response('Erro interno do servidor', { status: 500 })
  }
}