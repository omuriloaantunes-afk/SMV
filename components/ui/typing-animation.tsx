"use client"

import { useTypingEffect } from '@/hooks/use-typing-effect'
import { useEffect } from 'react'

interface TypingAnimationProps {
  text: string
  speed?: number
  onComplete?: () => void
  className?: string
}

export function TypingAnimation({ 
  text, 
  speed = 30, 
  onComplete, 
  className = "" 
}: TypingAnimationProps) {
  const { displayedText, isTyping } = useTypingEffect(text, speed)

  useEffect(() => {
    if (!isTyping && displayedText === text) {
      onComplete?.()
    }
  }, [isTyping, displayedText, text, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {isTyping && (
        <span className="inline-block w-0.5 h-4 bg-white animate-pulse ml-0.5 opacity-70">|</span>
      )}
    </span>
  )
}