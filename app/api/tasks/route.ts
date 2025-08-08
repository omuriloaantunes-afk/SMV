import { NextRequest, NextResponse } from 'next/server'

// Simulando um banco de dados em memória (em produção, usar um banco real)
let tasks: any[] = [
  { id: "t1", name: "Revisar planejamento semanal", due: "2025-08-08T00:00:00.000Z", priority: "média", done: false },
  { id: "t2", name: "Treino de força 45min", due: "2025-08-08T00:00:00.000Z", priority: "alta", done: false },
  { id: "t3", name: "Ler 20 páginas", due: "2025-08-08T00:00:00.000Z", priority: "baixa", done: false },
]

export async function GET() {
  return NextResponse.json({ tasks })
}

export async function POST(request: NextRequest) {
  try {
    const { tasks: newTasks } = await request.json()

    if (!newTasks || !Array.isArray(newTasks)) {
      return NextResponse.json({ error: 'Tarefas inválidas' }, { status: 400 })
    }

    // Adicionar novas tarefas
    const tasksToAdd = newTasks.map((task: any) => ({
      id: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: task.name || task.title || task,
      due: new Date().toISOString(),
      priority: task.priority || "média",
      done: false,
      createdBy: 'ai'
    }))

    tasks = [...tasks, ...tasksToAdd]

    return NextResponse.json({ 
      success: true, 
      addedTasks: tasksToAdd,
      totalTasks: tasks.length 
    })

  } catch (error) {
    console.error('Erro ao adicionar tarefas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { taskId, updates } = await request.json()

    const taskIndex = tasks.findIndex(t => t.id === taskId)
    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Tarefa não encontrada' }, { status: 404 })
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updates }

    return NextResponse.json({ 
      success: true, 
      task: tasks[taskIndex] 
    })

  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { taskId } = await request.json()

    tasks = tasks.filter(t => t.id !== taskId)

    return NextResponse.json({ 
      success: true,
      remainingTasks: tasks.length 
    })

  } catch (error) {
    console.error('Erro ao deletar tarefa:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}