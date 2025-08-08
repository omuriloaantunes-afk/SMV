"use client"

import { useState, useEffect, useRef, useCallback } from 'react'

export function useTypingEffect(text: string, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startTyping = useCallback(() => {
    setDisplayedText("")
    setCurrentIndex(0)
    setIsTyping(true)
  }, [])

  const stopTyping = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsTyping(false)
  }, [])

  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      intervalRef.current = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
    } else if (currentIndex >= text.length) {
      setIsTyping(false)
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
      }
    }
  }, [currentIndex, text, speed, isTyping])

  // Reset quando o texto muda
  useEffect(() => {
    startTyping()
  }, [text, startTyping])

  return {
    displayedText,
    isTyping,
    startTyping,
    stopTyping,
    progress: text.length > 0 ? (currentIndex / text.length) * 100 : 0
  }
}