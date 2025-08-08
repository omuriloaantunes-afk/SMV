# 🚀 Instruções para Primeiro Commit

Como o Git não está instalado no sistema, siga estas instruções para fazer o primeiro commit:

## 1. Instalar Git (se necessário)
```bash
# Windows (usando Chocolatey)
choco install git

# Ou baixe diretamente de: https://git-scm.com/download/win
```

## 2. Configurar Git (primeira vez)
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

## 3. Inicializar repositório e fazer primeiro commit
```bash
# Inicializar repositório
git init

# Adicionar remote do GitHub
git remote add origin https://github.com/omuriloaantunes-afk/SMV.git

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
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
git branch -M main
git push -u origin main
```

## 4. Verificar no GitHub
Acesse: https://github.com/omuriloaantunes-afk/SMV

## 🎯 Próximos Commits
Para commits futuros, use o padrão:
```bash
git add .
git commit -m "✨ feat: descrição da funcionalidade"
git push
```

## 📝 Convenção de Commits
- `✨ feat:` - Nova funcionalidade
- `🐛 fix:` - Correção de bug
- `📚 docs:` - Documentação
- `💄 style:` - Estilo/UI
- `♻️ refactor:` - Refatoração
- `⚡ perf:` - Performance
- `🔧 config:` - Configuração