# 🚀 Comandos Manuais - SMV GitHub

**Quando o Git terminar de instalar, execute estes comandos:**

## 1️⃣ Feche e abra novamente o PowerShell/CMD

## 2️⃣ Execute o script automático:
```bash
.\quick-commit.bat
```

## 3️⃣ OU execute os comandos manualmente:

```bash
# Configurar Git
git config --global user.name "murilo"
git config --global user.email "omuriloaantunes@gmail.com"

# Inicializar repositório
git init

# Adicionar remote
git remote add origin https://github.com/omuriloaantunes-afk/SMV.git

# Adicionar arquivos
git add .

# Commit
git commit -m "🚀 Initial commit: SMV - AI Discipline Mobile - Chat IA + Audio + Tasks + Calendar + PWA"

# Enviar
git branch -M main
git push -u origin main
```

## 4️⃣ Verificar no GitHub:
https://github.com/omuriloaantunes-afk/SMV

---

## 🔧 Se der erro de autenticação:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Marque: repo, workflow
4. Use o token como senha quando pedir

---

**Tudo pronto para enviar! 🔥**