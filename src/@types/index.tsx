export interface FormData {
  tema: string;
  serie: string;
  materia: string;
  duracao: number;
  alunos?: number;
  objetivos?: string;
}

export interface PlanoAulaResponse {
  success: boolean;
  plano?: string;
  error?: string;
  id?: string;
}

export interface PlanoSalvo {
  id: string;
  created_at: string;
  theme: string;
  grade_level: string;
  subject: string;
  duration_minutes: number;
  ai_response: any;
}

export interface FormPlanoAulaProps {
  onPlanoGerado: (resultado: PlanoAulaResponse) => void;
}

export interface ResultadoPlanoProps {
  resultado: PlanoAulaResponse | null;
}