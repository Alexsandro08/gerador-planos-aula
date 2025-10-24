import React, { useState } from 'react';
import { gerarPlanoAula } from '../services/supabase';
import type { FormData, FormPlanoAulaProps } from '../@types';

const FormPlanoAula: React.FC<FormPlanoAulaProps> = ({ onPlanoGerado }) => {
  const [formData, setFormData] = useState<FormData>({
    tema: 'Sistema Solar',
    serie: '4º ano',
    materia: 'Ciências',
    duracao: 50,
    alunos: 30,
    objetivos: ''
  });
  const [carregando, setCarregando] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    
    try {
      const resultado = await gerarPlanoAula(formData);
      onPlanoGerado(resultado);
    } catch (error) {
      console.error('Erro:', error);
      onPlanoGerado({ 
        success: false, 
        error: 'Erro ao processar requisição' 
      });
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: name === 'duracao' || name === 'alunos' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form-plano">
      <h2>🎓 Gerar Plano de Aula com IA</h2>
      
      <div className="form-group">
        <label htmlFor="tema">Tema da Aula:*</label>
        <input
          id="tema"
          name="tema"
          value={formData.tema}
          onChange={handleChange}
          placeholder="Ex: Sistema Solar"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="serie">Série/Ano:*</label>
        <input
          id="serie"
          name="serie"
          value={formData.serie}
          onChange={handleChange}
          placeholder="Ex: 4º ano"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="materia">Matéria:*</label>
        <input
          id="materia"
          name="materia"
          value={formData.materia}
          onChange={handleChange}
          placeholder="Ex: Ciências"
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="duracao">Duração (min):*</label>
          <input
            id="duracao"
            name="duracao"
            type="number"
            value={formData.duracao}
            onChange={handleChange}
            placeholder="Ex: 50"
            required
            min="1"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="alunos">Nº de Alunos:</label>
          <input
            id="alunos"
            name="alunos"
            type="number"
            value={formData.alunos}
            onChange={handleChange}
            placeholder="Ex: 30"
            min="1"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="objetivos">Objetivos de Aprendizagem:</label>
        <textarea
          id="objetivos"
          name="objetivos"
          value={formData.objetivos}
          onChange={handleChange}
          placeholder="Descreva os objetivos específicos desta aula..."
          rows={3}
        />
      </div>
      
      <button type="submit" disabled={carregando} className="btn-gerar">
        {carregando ? '⏳ Gerando e Salvando...' : '✨ Gerar Plano'}
      </button>
      
      <p className="form-info">
        * Campos obrigatórios. O plano será salvo automaticamente no banco de dados.
      </p>
    </form>
  );
};

export default FormPlanoAula;