import { NextRequest, NextResponse } from 'next/server'

// Simulando eventos do calendário
let calendarEvents: any[] = [
  {
    id: 'event-1',
    title: 'Deep work',
    date: '2025-08-08',
    time: '09:00',
    duration: 120, // minutos
    type: 'work',
    completed: false
  },
  {
    id: 'event-2',
    title: 'Treino de força',
    date: '2025-08-08',
    time: '18:00',
    duration: 60,
    type: 'exercise',
    completed: false
  },
  {
    id: 'event-3',
    title: 'Leitura',
    date: '2025-08-08',
    time: '20:00',
    duration: 30,
    type: 'learning',
    completed: false
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')
  const month = searchParams.get('month')

  if (date) {
    // Retornar eventos de um dia específico
    const dayEvents = calendarEvents.filter(event => event.date === date)
    return NextResponse.json({ events: dayEvents, date })
  }

  if (month) {
    // Retornar eventos do mês (formato YYYY-MM)
    const monthEvents = calendarEvents.filter(event => 
      event.date.startsWith(month)
    )
    return NextResponse.json({ events: monthEvents, month })
  }

  // Retornar todos os eventos
  return NextResponse.json({ events: calendarEvents })
}

export async function POST(request: NextRequest) {
  try {
    const { action, event, taskId } = await request.json()

    switch (action) {
      case 'create':
        // Criar novo evento
        if (event) {
          const newEvent = {
            id: `event-${Date.now()}`,
            title: event.title,
            date: event.date || new Date().toISOString().split('T')[0],
            time: event.time || '09:00',
            duration: event.duration || 60,
            type: event.type || 'task',
            completed: false,
            createdFrom: 'task',
            taskId: taskId
          }

          calendarEvents.push(newEvent)

          return NextResponse.json({
            success: true,
            event: newEvent
          })
        }
        break

      case 'update':
        // Atualizar evento existente
        if (event && event.id) {
          const eventIndex = calendarEvents.findIndex(e => e.id === event.id)
          
          if (eventIndex >= 0) {
            calendarEvents[eventIndex] = { ...calendarEvents[eventIndex], ...event }
            
            return NextResponse.json({
              success: true,
              event: calendarEvents[eventIndex]
            })
          }
        }
        break

      case 'delete':
        // Deletar evento
        if (event && event.id) {
          calendarEvents = calendarEvents.filter(e => e.id !== event.id)
          
          return NextResponse.json({
            success: true,
            deletedId: event.id
          })
        }
        break

      case 'sync-from-tasks':
        // Sincronizar tarefas para o calendário
        try {
          const tasksResponse = await fetch(`${request.nextUrl.origin}/api/tasks`)
          const tasksData = await tasksResponse.json()
          
          if (tasksData.tasks) {
            const today = new Date().toISOString().split('T')[0]
            
            // Criar eventos para tarefas que não têm eventos ainda
            const newEvents = tasksData.tasks
              .filter((task: any) => !task.done) // Apenas tarefas não concluídas
              .filter((task: any) => {
                // Verificar se já existe evento para esta tarefa
                return !calendarEvents.some(event => event.taskId === task.id)
              })
              .map((task: any) => ({
                id: `event-task-${task.id}`,
                title: task.name,
                date: today,
                time: getTimeForTaskType(task.name),
                duration: getDurationForTaskType(task.name),
                type: getTypeForTaskName(task.name),
                completed: false,
                createdFrom: 'task',
                taskId: task.id,
                priority: task.priority
              }))

            calendarEvents.push(...newEvents)

            return NextResponse.json({
              success: true,
              syncedEvents: newEvents.length,
              events: newEvents
            })
          }
        } catch (error) {
          console.error('Erro ao sincronizar tarefas:', error)
        }
        break

      default:
        return NextResponse.json({ error: 'Ação inválida' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })

  } catch (error) {
    console.error('Erro na API do calendário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Funções utilitárias para determinar horário e duração baseado no tipo de tarefa
function getTimeForTaskType(taskName: string): string {
  const name = taskName.toLowerCase()
  
  if (name.includes('treino') || name.includes('academia') || name.includes('exercício')) {
    return '18:00' // Treinos à tarde
  }
  if (name.includes('leitura') || name.includes('ler')) {
    return '20:00' // Leitura à noite
  }
  if (name.includes('trabalho') || name.includes('foco') || name.includes('deep work')) {
    return '09:00' // Trabalho de manhã
  }
  if (name.includes('reunião') || name.includes('call') || name.includes('ligar')) {
    return '14:00' // Reuniões à tarde
  }
  
  return '10:00' // Padrão
}

function getDurationForTaskType(taskName: string): number {
  const name = taskName.toLowerCase()
  
  if (name.includes('treino') || name.includes('academia')) {
    return 60 // 1 hora
  }
  if (name.includes('leitura') || name.includes('ler')) {
    return 30 // 30 minutos
  }
  if (name.includes('foco') || name.includes('deep work')) {
    return 120 // 2 horas
  }
  if (name.includes('reunião') || name.includes('call')) {
    return 45 // 45 minutos
  }
  
  return 60 // Padrão 1 hora
}

function getTypeForTaskName(taskName: string): string {
  const name = taskName.toLowerCase()
  
  if (name.includes('treino') || name.includes('academia') || name.includes('exercício')) {
    return 'exercise'
  }
  if (name.includes('leitura') || name.includes('ler') || name.includes('estudar')) {
    return 'learning'
  }
  if (name.includes('trabalho') || name.includes('foco') || name.includes('deep work')) {
    return 'work'
  }
  if (name.includes('reunião') || name.includes('call') || name.includes('ligar')) {
    return 'meeting'
  }
  
  return 'task'
}