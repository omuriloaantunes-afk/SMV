# SMV - AI Discipline Mobile

🔥 **Superior Masculine Version** - Aplicativo de produtividade com IA disciplinadora

## 🎯 Sobre o Projeto

SMV é um aplicativo PWA (Progressive Web App) que combina inteligência artificial com disciplina extrema para transformar usuários em versões superiores de si mesmos. Inspirado na mentalidade de Thomas Shelby, Pablo Marçal e Psico do Seu João.

## ⚡ Funcionalidades

### 🤖 **IA SMV (Chat)**
- Mentor de alta performance com personalidade intensa
- Respostas diretas, sem filtros, focadas em ação
- Integração com OpenAI GPT-3.5 Turbo
- Extração automática de tarefas das conversas

### 🎤 **Gravação de Áudio**
- Gravação de mensagens de voz
- Transcrição automática com Whisper (OpenAI)
- Interface intuitiva com estados visuais

### 📋 **Sistema de Tarefas**
- Criação automática via IA
- Gerenciamento completo (CRUD)
- Sincronização entre abas
- Indicadores visuais de origem (IA/Manual)

### 📅 **Calendário Inteligente**
- Sincronização automática com tarefas
- Horários inteligentes baseados no tipo de atividade
- Visualização mensal com status
- Eventos categorizados por tipo

### 🔔 **Notificações Push**
- Notificações nativas do navegador
- Service Worker para funcionamento offline
- Configuração personalizada

### 📱 **PWA Completo**
- Instalável na tela inicial
- Funcionamento offline
- Design responsivo mobile-first
- Tela de splash animada
- Sistema de login

## 🎨 Design System

- **Cor Principal**: #FF1929 (Vermelho SMV)
- **Tema**: Dark mode com glass morphism
- **Tipografia**: Space Grotesk + Geist Sans
- **Componentes**: Glass Cards, Neo Surface, Story Pills
- **Animações**: Smooth transitions e micro-interactions

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **IA**: OpenAI GPT-3.5 Turbo + Whisper
- **PWA**: Service Worker, Web Push API
- **Audio**: MediaRecorder API, Web Audio API
- **Deploy**: Vercel (recomendado)

## 🚀 Como Executar

1. **Clone o repositório**
```bash
git clone https://github.com/omuriloaantunes-afk/SMV.git
cd SMV
```

2. **Instale as dependências**
```bash
pnpm install
# ou
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie o arquivo .env.local
OPENAI_API_KEY=sua_chave_openai_aqui
```

4. **Execute o projeto**
```bash
pnpm dev
# ou
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:3000
```

## 📱 Páginas

- `/splash` - Tela de inicialização animada
- `/login` - Autenticação (demo: 123/123)
- `/chat` - Chat principal com IA SMV
- `/tarefas` - Gerenciamento de tarefas
- `/calendario` - Calendário com sincronização
- `/config` - Configurações do app
- `/design` - Design system completo

## 🔧 APIs

- `POST /api/chat` - Comunicação com IA
- `GET/POST /api/tasks` - CRUD de tarefas
- `POST /api/transcribe` - Transcrição de áudio
- `GET/POST /api/calendar` - Eventos do calendário
- `POST /api/notifications` - Notificações push

## 🎯 Roadmap

- [ ] Integração com Google Calendar
- [ ] Análise de produtividade com gráficos
- [ ] Gamificação com pontuação
- [ ] Lembretes automáticos
- [ ] Modo offline completo
- [ ] Sincronização multi-dispositivo

## 👨‍💻 Desenvolvedor

**Murilo Antunes**
- GitHub: [@omuriloaantunes-afk](https://github.com/omuriloaantunes-afk)

## 📄 Licença

MIT License - Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**"Disciplina é liberdade, guerreiro! 🔥"** - SMV