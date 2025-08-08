import { NextRequest, NextResponse } from 'next/server'
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

FUNÇÃO PRINCIPAL:
- SEMPRE identifique tarefas, compromissos, atividades mencionadas
- Responda com motivação intensa
- Transforme fraquezas em combustível

FORMATO OBRIGATÓRIO:
1. Resposta motivacional (2-4 frases)
2. SEMPRE termine com: TAREFAS_IDENTIFICADAS: ["tarefa1", "tarefa2", "tarefa3"]

EXEMPLOS DE TAREFAS:
- "treino", "academia", "exercício" 
- "estudar", "ler", "revisar"
- "trabalhar", "reunião", "ligar"
- "planejar", "organizar", "fazer"

EXEMPLOS DE RESPOSTA:
"Fala, guerreiro! Identifiquei suas tarefas. Agora para de enrolar e vai executar cada uma sem desculpa. Disciplina é liberdade, mano!
TAREFAS_IDENTIFICADAS: ["treino 1h", "estudar para prova", "ligar para cliente"]"

IMPORTANTE: SEMPRE inclua TAREFAS_IDENTIFICADAS mesmo que seja uma lista vazia []`

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Mensagem é obrigatória' }, { status: 400 })
    }

    // Preparar histórico da conversa (limitado para economizar tokens)
    const recentHistory = conversationHistory.slice(-4) // Apenas últimas 4 mensagens
    const messages = [
      { role: 'system', content: SMV_PERSONALITY },
      ...recentHistory.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: message }
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Mais rápido e barato que GPT-4
      messages: messages as any,
      max_tokens: 350, // Aumentado para respostas mais completas
      temperature: 0.7, // Menos criativo, mais direto
    })

    const aiResponse = completion.choices[0]?.message?.content || 'Erro na resposta da IA'

    // Extrair tarefas da resposta (múltiplas tentativas)
    let extractedTasks: any[] = []
    
    // Tentativa 1: Formato padrão
    let taskMatch = aiResponse.match(/TAREFAS_IDENTIFICADAS:\s*(\[.*?\])/s)
    
    // Tentativa 2: Formato alternativo
    if (!taskMatch) {
      taskMatch = aiResponse.match(/tarefas:\s*(\[.*?\])/i)
    }
    
    // Tentativa 3: Buscar qualquer array JSON
    if (!taskMatch) {
      taskMatch = aiResponse.match(/(\[.*?\])/s)
    }
    
    if (taskMatch) {
      try {
        const parsed = JSON.parse(taskMatch[1])
        if (Array.isArray(parsed)) {
          extractedTasks = parsed.filter(task => 
            typeof task === 'string' && task.trim().length > 0
          )
        }
      } catch (e) {
        console.error('Erro ao parsear tarefas:', e)
        // Fallback: extrair tarefas manualmente se JSON falhar
        const taskText = taskMatch[1]
        const manualTasks = taskText
          .replace(/[\[\]"]/g, '')
          .split(',')
          .map(t => t.trim())
          .filter(t => t.length > 0)
        extractedTasks = manualTasks
      }
    }
    
    console.log('Tarefas extraídas:', extractedTasks)

    // Limpar a resposta removendo o JSON das tarefas
    const cleanResponse = aiResponse.replace(/TAREFAS_IDENTIFICADAS:\s*\[.*?\]/s, '').trim()

    return NextResponse.json({
      response: cleanResponse,
      tasks: extractedTasks
    })

  } catch (error) {
    console.error('Erro na API do chat:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}