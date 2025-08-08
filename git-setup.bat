@echo off
echo SMV - Setup Git e Primeiro Commit
echo.

REM Verificar se Git esta instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Git nao encontrado. Instale o Git primeiro:
    echo https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git encontrado! Configurando...

REM Configurar Git
git config --global user.name "Murilo Antunes"
git config --global user.email "murilo@example.com"

REM Inicializar repositorio
echo Inicializando repositorio...
git init

REM Adicionar remote
echo Adicionando remote do GitHub...
git remote add origin https://github.com/omuriloaantunes-afk/SMV.git

REM Adicionar arquivos
echo Adicionando arquivos...
git add .

REM Fazer commit
echo Fazendo primeiro commit...
git commit -m "Initial commit: SMV - AI Discipline Mobile - Chat com IA SMV, Audio transcription, Tasks automation, Calendar sync, Push notifications, PWA complete"

REM Enviar para GitHub
echo Enviando para GitHub...
git branch -M main
git push -u origin main

echo.
echo Projeto enviado com sucesso!
echo Acesse: https://github.com/omuriloaantunes-afk/SMV
pause