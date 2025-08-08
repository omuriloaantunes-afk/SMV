"use client"

import { useState, useEffect, useCallback } from 'react'

export function useNotifications() {
  const [isSupported, setIsSupported] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)

  useEffect(() => {
    // Verificar se notificações são suportadas
    if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      setPermission(Notification.permission)
      
      // Verificar se já está subscrito
      checkSubscription()
    }
  }, [])

  const checkSubscription = useCallback(async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const existingSubscription = await registration.pushManager.getSubscription()
      
      if (existingSubscription) {
        setSubscription(existingSubscription)
        setIsSubscribed(true)
      }
    } catch (error) {
      console.error('Erro ao verificar subscription:', error)
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false

    try {
      const permission = await Notification.requestPermission()
      setPermission(permission)
      return permission === 'granted'
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error)
      return false
    }
  }, [isSupported])

  const subscribe = useCallback(async () => {
    if (!isSupported || permission !== 'granted') {
      const granted = await requestPermission()
      if (!granted) return false
    }

    try {
      const registration = await navigator.serviceWorker.ready
      
      // VAPID public key (você precisará gerar uma)
      const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI80NM9f4LUjqukYiLdyMYGTJNF73QC_vxHHmZq97BE4LycArBdZlAuAhA'
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      })

      // Salvar subscription no servidor
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'subscribe',
          subscription: subscription.toJSON()
        })
      })

      if (response.ok) {
        setSubscription(subscription)
        setIsSubscribed(true)
        return true
      }

      return false
    } catch (error) {
      console.error('Erro ao se inscrever:', error)
      return false
    }
  }, [isSupported, permission, requestPermission])

  const unsubscribe = useCallback(async () => {
    if (!subscription) return false

    try {
      await subscription.unsubscribe()
      
      // Remover do servidor
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'unsubscribe',
          subscription: subscription.toJSON()
        })
      })

      setSubscription(null)
      setIsSubscribed(false)
      return true
    } catch (error) {
      console.error('Erro ao cancelar inscrição:', error)
      return false
    }
  }, [subscription])

  const sendNotification = useCallback(async (notification: {
    title: string
    body: string
    data?: any
    actions?: Array<{ action: string; title: string }>
  }) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send',
          notification
        })
      })

      const result = await response.json()
      return result.success
    } catch (error) {
      console.error('Erro ao enviar notificação:', error)
      return false
    }
  }, [])

  const showLocalNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.png',
        badge: '/favicon.png',
        ...options
      })
    }
  }, [permission])

  return {
    isSupported,
    permission,
    isSubscribed,
    subscription,
    requestPermission,
    subscribe,
    unsubscribe,
    sendNotification,
    showLocalNotification
  }
}

// Função utilitária para converter VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}