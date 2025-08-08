import { useState, useEffect, useCallback } from 'react'

export type Task = {
  id: string
  name: string
  due: string
  priority: "alta" | "média" | "baixa"
  done?: boolean
  createdBy?: 'user' | 'ai'
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Carregar tarefas
  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/tasks')
      const data = await response.json()
      setTasks(data.tasks || [])
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Adicionar tarefas (vindas da IA)
  const addTasksFromAI = useCallback(async (newTasks: string[] | any[]) => {
    if (!newTasks || newTasks.length === 0) return

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: newTasks })
      })

      const data = await response.json()
      
      if (data.success) {
        // Recarregar tarefas para sincronizar
        await loadTasks()
        return data.addedTasks
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefas da IA:', error)
    }
  }, [loadTasks])

  // Adicionar tarefa manual
  const addTask = useCallback(async (taskName: string) => {
    const newTask = {
      name: taskName,
      priority: "média" as const
    }

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: [newTask] })
      })

      const data = await response.json()
      
      if (data.success) {
        await loadTasks()
        return data.addedTasks[0]
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error)
    }
  }, [loadTasks])

  // Toggle tarefa
  const toggleTask = useCallback(async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    try {
      const response = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          taskId, 
          updates: { done: !task.done } 
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setTasks(prev => prev.map(t => 
          t.id === taskId ? { ...t, done: !t.done } : t
        ))
      }
    } catch (error) {
      console.error('Erro ao toggle tarefa:', error)
    }
  }, [tasks])

  // Carregar tarefas na inicialização
  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  return {
    tasks,
    isLoading,
    loadTasks,
    addTasksFromAI,
    addTask,
    toggleTask
  }
}