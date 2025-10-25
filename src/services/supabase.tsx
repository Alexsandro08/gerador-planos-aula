import { createClient } from '@supabase/supabase-js';
import type { FormData, PlanoAulaResponse, PlanoSalvo } from '../@types';

// ✅ CORRETO - Usando import.meta.env do Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Função para gerar plano com IA
export const gerarPlanoAula = async (dados: FormData): Promise<PlanoAulaResponse> => {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/gerar-plano-aula`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify(dados)
    });
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const resultado = await response.json() as PlanoAulaResponse;
    
    // ✅ SALVAR AUTOMATICAMENTE NO BANCO
    if (resultado.success && resultado.plano) {
      await salvarPlanoNoBanco(dados, resultado.plano);
    }
    
    return resultado;
    
  } catch (error) {
    console.error('Erro ao gerar plano:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    };
  }
};

// Função para salvar no banco
export const salvarPlanoNoBanco = async (dados: FormData, plano: string): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('lesson_plans')
      .insert([
        {
          theme: dados.tema,
          grade_level: dados.serie,
          subject: dados.materia,
          duration_minutes: dados.duracao,
          student_count: dados.alunos || null,
          learning_objectives: dados.objetivos || null,
          ai_response: { plano_gerado: plano },
          status: 'completed'
        }
      ])
      .select();

    if (error) {
      console.error('Erro ao salvar no banco:', error);
      return;
    }

    console.log('✅ Plano salvo no banco com ID:', data?.[0]?.id);
    
  } catch (error) {
    console.error('Erro ao salvar plano:', error);
  }
};

// Função para buscar planos salvos
export const buscarPlanosSalvos = async (): Promise<PlanoSalvo[]> => {
  try {
    const { data, error } = await supabase
      .from('lesson_plans')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
    
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    return [];
  }
};