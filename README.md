# Gerador de Planos de Aula com IA

## Instruções de Setup

### Pré-requisitos
- Node.js 18+
- Conta no Google AI Studio
- Conta no Supabase

### Instalação
```bash
git clone https://github.com/Alexsandro08/gerador-planos-aula.git
cd gerador-planos-aula
```
```bash
### Instalar dependências
npm install
```
```bash
### Configuração das Variáveis de Ambiente
Crie um arquivo .env na raiz:

env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_KEY=sua_chave_supabase
VITE_GEMINI_API_KEY=sua_chave_gemini
```

### Onde obter:

- Supabase URL/Key: Settings → API Keys no painel do Supabase

- Gemini API Key: Google AI Studio → Get API Key


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

### Alternativas testadas: Alternativas testadas: gemini-1.0-pro (404), gemini-1.5-flash (indisponível)

### Arquitetura
- Frontend → Supabase Edge Function → Gemini API → Supabase Database

- Edge Functions para evitar problemas de CORS

- TypeScript para melhor tipagem 
-----------------------

 ### Estrutura de Dados
- Tabela única lesson_plans com campo JSON para resposta da IA

- Campos obrigatórios: tema, série, matéria

- Campos opcionais: duração, número de alunos, objetivos

-------------------------


### Desafios Encontrados e Soluções
  <h3>Modelo Gemini Indisponível</h3>
  <ul>
      <li>Problema: gemini-1.0-pro retornando 404</li>
      <li>Solução: Listagem de modelos disponíveis e uso do gemini-2.0-flash-001</li>
  </ul>
  <h3>Autenticação na Edge Function</h3>
   <ul>
      <li>Erro 401 "Missing authorization header"</li>
      <li>Solução: Adição do header Authorization: Bearer {SUPABASE_KEY}</li>
  </ul>
  <h3>CORS na Edge Function</h3>
   <ul>
      <li>Problema: Bloqueio de requisições pelo navegador</li>
      <li>Solução: Headers CORS configurados manualmente na function</li>
  </ul>

----------------------
### Acessos
URL da aplicação: https://geradoraulasia.netlify.app/

Supabase: https://prjbkoketsphqasvintb.supabase.co

