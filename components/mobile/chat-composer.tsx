"use client"

import { useState } from "react"
import { Mic, SendHorizontal, Square, Loader2 } from 'lucide-react'
import { NeoSurface } from "./containers"
import { cn } from "@/lib/utils"
import { RED } from "@/lib/constants"
import { useAudioRecorder } from "@/hooks/use-audio-recorder"

export function ChatComposer({
  onSend,
  placeholder = "Escreva sua mensagem...",
}: {
  onSend?: (text: string) => void
  placeholder?: string
}) {
  const [text, setText] = useState("")
  const canSend = text.trim().length > 0
  
  const {
    isRecording,
    isTranscribing,
    recordingTime,
    audioBlob,
    startRecording,
    stopRecording,
    transcribeAudio,
    resetRecording,
    formatTime
  } = useAudioRecorder()

  const handleMicClick = async () => {
    if (isRecording) {
      stopRecording()
    } else if (audioBlob) {
      // Se tem áudio gravado, transcrever e enviar
      const transcription = await transcribeAudio(audioBlob)
      if (transcription) {
        onSend?.(transcription)
        resetRecording()
      }
    } else {
      // Iniciar nova gravação
      startRecording()
    }
  }

  const handleSendText = () => {
    if (!canSend) return
    onSend?.(text.trim())
    setText("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendText()
    }
  }

  return (
    <div className="px-2">
      {/* Recording indicator */}
      {isRecording && (
        <div className="mb-2 flex items-center justify-center gap-2 text-red-500">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">Gravando: {formatTime(recordingTime)}</span>
        </div>
      )}

      {/* Transcribing indicator */}
      {isTranscribing && (
        <div className="mb-2 flex items-center justify-center gap-2 text-neutral-400">
          <Loader2 className="size-4 animate-spin" />
          <span className="text-sm">Transcrevendo áudio...</span>
        </div>
      )}

      {/* Audio ready indicator */}
      {audioBlob && !isTranscribing && (
        <div className="mb-2 flex items-center justify-center gap-2 text-green-500">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-sm">Áudio pronto! Clique no microfone para enviar</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <NeoSurface className="flex-1 flex items-center gap-2 px-3 py-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isRecording ? "Gravando áudio..." : placeholder}
            disabled={isRecording || isTranscribing}
            className={cn(
              "bg-transparent outline-none text-sm w-full placeholder:text-neutral-400",
              (isRecording || isTranscribing) && "opacity-50"
            )}
          />
        </NeoSurface>
        
        <button
          aria-label="Enviar"
          disabled={!canSend || isRecording || isTranscribing}
          onClick={handleSendText}
          className={cn(
            "size-9 rounded-full flex items-center justify-center",
            "bg-neutral-800 border border-white/10 hover:bg-neutral-700 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <SendHorizontal className="text-white size-4" />
        </button>
        
        <button
          aria-label={
            isRecording 
              ? "Parar gravação" 
              : audioBlob 
                ? "Enviar áudio" 
                : "Gravar áudio"
          }
          onClick={handleMicClick}
          disabled={isTranscribing}
          className={cn(
            "size-10 rounded-full flex items-center justify-center border border-white/20 transition-all duration-300",
            isRecording 
              ? "shadow-[0_0_20px_rgba(255,25,41,0.6)] animate-pulse" 
              : audioBlob
                ? "shadow-[0_8px_24px_rgba(34,197,94,0.35)] bg-green-600"
                : "shadow-[0_8px_24px_rgba(255,25,41,0.25)]",
            isTranscribing && "opacity-50 cursor-not-allowed"
          )}
          style={{ 
            backgroundColor: isRecording 
              ? RED 
              : audioBlob 
                ? undefined 
                : RED 
          }}
        >
          {isTranscribing ? (
            <Loader2 className="text-white size-4 animate-spin" />
          ) : isRecording ? (
            <Square className="text-white size-4" />
          ) : (
            <Mic className="text-white size-4" />
          )}
        </button>
      </div>
    </div>
  )
}
