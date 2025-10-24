import React from 'react';
import type { ResultadoPlanoProps } from '../@types';

const ResultadoPlano: React.FC<ResultadoPlanoProps> = ({ resultado }) => {
  if (!resultado) return null;

  return (
    <div className="resultado-plano">
      {resultado.success ? (
        <div className="sucesso">
          <div className="sucesso-header">
            <h3>✅ Plano Gerado com Sucesso!</h3>
            <span className="salvo-badge">💾 Salvo no banco</span>
          </div>
          <div className="plano-content">
            <pre>{resultado.plano}</pre>
          </div>
          {resultado.id && (
            <p className="plano-id">
              <small>ID do plano: {resultado.id}</small>
            </p>
          )}
        </div>
      ) : (
        <div className="erro">
          <h3>❌ Erro ao Gerar Plano</h3>
          <p>{resultado.error}</p>
        </div>
      )}
    </div>
  );
};

export default ResultadoPlano;