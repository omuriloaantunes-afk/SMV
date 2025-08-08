import { NextRequest, NextResponse } from 'next/server'

// Simulando um banco de dados de subscriptions
let subscriptions: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { action, subscription, notification } = await request.json()

    switch (action) {
      case 'subscribe':
        // Adicionar nova subscription
        if (subscription) {
          const existingIndex = subscriptions.findIndex(
            sub => sub.endpoint === subscription.endpoint
          )
          
          if (existingIndex >= 0) {
            subscriptions[existingIndex] = subscription
          } else {
            subscriptions.push(subscription)
          }
          
          return NextResponse.json({ 
            success: true, 
            message: 'Subscription salva com sucesso' 
          })
        }
        break

      case 'unsubscribe':
        // Remover subscription
        if (subscription) {
          subscriptions = subscriptions.filter(
            sub => sub.endpoint !== subscription.endpoint
          )
          
          return NextResponse.json({ 
            success: true, 
            message: 'Subscription removida com sucesso' 
          })
        }
        break

      case 'send':
        // Enviar notificação para todos os subscribers
        if (notification) {
          const results = await Promise.allSettled(
            subscriptions.map(async (sub) => {
              try {
                const response = await fetch(sub.endpoint, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'TTL': '86400', // 24 horas
                  },
                  body: JSON.stringify({
                    title: notification.title,
                    body: notification.body,
                    icon: '/favicon.png',
                    badge: '/favicon.png',
                    data: notification.data || {},
                    actions: notification.actions || []
                  })
                })
                
                if (!response.ok) {
                  throw new Error(`HTTP ${response.status}`)
                }
                
                return { success: true, endpoint: sub.endpoint }
              } catch (error) {
                console.error('Erro ao enviar notificação:', error)
                return { success: false, endpoint: sub.endpoint, error }
              }
            })
          )

          const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length
          const failed = results.length - successful

          return NextResponse.json({
            success: true,
            sent: successful,
            failed: failed,
            total: subscriptions.length
          })
        }
        break

      default:
        return NextResponse.json({ error: 'Ação inválida' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })

  } catch (error) {
    console.error('Erro na API de notificações:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    subscriptions: subscriptions.length,
    vapidPublicKey: process.env.VAPID_PUBLIC_KEY || 'not-configured'
  })
}