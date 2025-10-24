# Gerador de Planos de Aula com IA

## Instruções de Setup

### Pré-requisitos
- Node.js 18+
- Conta no Google AI Studio
- Conta no Supabase

### 1. Instalação
```bash
npm install

### Configuração das Variáveis de Ambiente
Crie um arquivo .env na raiz:

env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_KEY=sua_chave_supabase
VITE_GEMINI_API_KEY=sua_chave_gemini
```
------------------
# Execução
```bash
npm run dev
```
### Scripts SQL
```bash
Tabela lesson_plans
sql
CREATE TABLE lesson_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  theme TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  subject TEXT NOT NULL,
  duration_minutes INTEGER,
  student_count INTEGER,
  learning_objectives TEXT,
  ai_response JSONB NOT NULL,
  ai_model TEXT DEFAULT 'gemini-2.0-flash-001',
  status TEXT DEFAULT 'completed'
);
``` 
<h1>Decisões Técnicas</h1>

* Escolha do Modelo de IA 
Modelo: gemini-2.0-flash-001

* Motivo: Rápido, suporte a JSON, gratuito na cota inicial

### Alternativas testadas: gemini-1.0-pro, gemini-1.5-flash

### Arquitetura
[ X ] Frontend → Supabase Edge Function → Gemini API → Supabase Database

[ X ] Edge Functions para evitar problemas de CORS

[ X ]TypeScript para melhor manutenibilidade
-----------------------

<h1> Desafios e Soluções </h1>

[ X ] CORS na Edge Function: Configuração manual de headers

[ X ] Rate Limiting Gemini: Tratamento de erro e fallback

[ X ] Tipagem TypeScript: Definição de interfaces para dados


### Acessos
URL da aplicação: https://geradoraulasia.netlify.app/

Supabase: https://prjbkoketsphqasvintb.supabase.co

