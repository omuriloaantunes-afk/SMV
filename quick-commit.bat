@echo off
echo 🚀 SMV - Enviando para GitHub
echo.

REM Configurar Git com suas informações
git config --global user.name "murilo"
git config --global user.email "omuriloaantunes@gmail.com"

REM Inicializar repositório
git init

REM Adicionar remote
git remote add origin https://github.com/omuriloaantunes-afk/SMV.git

REM Adicionar todos os arquivos
git add .

REM Fazer commit
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

REM Definir branch principal
git branch -M main

REM Enviar para GitHub
git push -u origin main

echo.
echo ✅ Projeto enviado com sucesso!
echo 🔗 Acesse: https://github.com/omuriloaantunes-afk/SMV
pause