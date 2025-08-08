# Script para instalar Git e fazer primeiro commit
Write-Host "🚀 SMV - Setup Git e Primeiro Commit" -ForegroundColor Red

# Verificar se Git está instalado
try {
    git --version
    Write-Host "✅ Git já está instalado!" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não encontrado. Instalando..." -ForegroundColor Yellow
    
    # Tentar instalar via Chocolatey
    try {
        choco install git -y
        Write-Host "✅ Git instalado via Chocolatey!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Chocolatey não encontrado." -ForegroundColor Red
        Write-Host "📥 Baixe o Git manualmente de: https://git-scm.com/download/win" -ForegroundColor Yellow
        Write-Host "⏸️  Execute este script novamente após instalar o Git." -ForegroundColor Yellow
        exit 1
    }
}

# Configurar Git (se necessário)
Write-Host "🔧 Configurando Git..." -ForegroundColor Blue
git config --global user.name "Murilo Antunes"
git config --global user.email "murilo@example.com"

# Inicializar repositório
Write-Host "📁 Inicializando repositório..." -ForegroundColor Blue
git init

# Adicionar remote
Write-Host "🔗 Adicionando remote do GitHub..." -ForegroundColor Blue
git remote add origin https://github.com/omuriloaantunes-afk/SMV.git

# Adicionar arquivos
Write-Host "📋 Adicionando arquivos..." -ForegroundColor Blue
git add .

# Fazer commit
Write-Host "💾 Fazendo primeiro commit..." -ForegroundColor Blue
git commit -m "🚀 Initial commit: SMV - AI Discipline Mobile

✨ Features implementadas:
- 🤖 Chat com IA SMV (GPT-3.5 + personalidade intensa)
- 🎤 Gravação de áudio + transcrição Whisper
- 📋 Sistema de tarefas com criação automática via IA
- 📅 Calendário inteligente com sincronização
- 🔔 Notificações push nativas
- 📱 PWA completo (instalável + offline)
- 🎨 Design system com glass morphism
- 🔐 Sistema de login (demo: 123/123)
- 🎯 Tela splash animada

🛠️ Tech Stack:
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS + Radix UI
- OpenAI API (GPT-3.5 + Whisper)
- Service Worker + Web APIs
- PWA com manifest.json

🎯 Páginas: /splash, /login, /chat, /tarefas, /calendario, /config, /design"

# Enviar para GitHub
Write-Host "🚀 Enviando para GitHub..." -ForegroundColor Blue
git branch -M main
git push -u origin main

Write-Host "✅ Projeto enviado com sucesso para GitHub!" -ForegroundColor Green
Write-Host "🔗 Acesse: https://github.com/omuriloaantunes-afk/SMV" -ForegroundColor Cyan