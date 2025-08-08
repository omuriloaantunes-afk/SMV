# 🚀 Setup Manual - SMV GitHub

Como o Git não está instalado, siga estes passos:

## 1️⃣ Instalar Git

### Opção A: Download Direto
1. Acesse: https://git-scm.com/download/win
2. Baixe e instale o Git for Windows
3. Durante a instalação, aceite as configurações padrão

### Opção B: Via Chocolatey (se tiver)
```powershell
choco install git -y
```

### Opção C: Via Winget
```powershell
winget install Git.Git
```

## 2️⃣ Reiniciar Terminal
Após instalar, **feche e abra novamente** o PowerShell/CMD

## 3️⃣ Verificar Instalação
```bash
git --version
```

## 4️⃣ Configurar Git (primeira vez)
```bash
git config --global user.name "Murilo Antunes"
git config --global user.email "seu.email@exemplo.com"
```

## 5️⃣ Comandos para Commit

**Execute estes comandos na pasta do projeto:**

```bash
# Inicializar repositório
git init

# Adicionar remote
git remote add origin https://github.com/omuriloaantunes-afk/SMV.git

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "🚀 Initial commit: SMV - AI Discipline Mobile

✨ Features:
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
- PWA com manifest.json"

# Definir branch principal
git branch -M main

# Enviar para GitHub
git push -u origin main
```

## 6️⃣ Verificar no GitHub
Acesse: https://github.com/omuriloaantunes-afk/SMV

---

## 🔧 Troubleshooting

### Erro de Autenticação
Se der erro de autenticação, configure um token:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Selecione: repo, workflow, write:packages
4. Use o token como senha

### Erro de Remote Exists
Se der erro que o remote já existe:
```bash
git remote remove origin
git remote add origin https://github.com/omuriloaantunes-afk/SMV.git
```

### Forçar Push (se necessário)
```bash
git push -u origin main --force
```

---

**Após seguir estes passos, o SMV estará no GitHub! 🔥**