import React, { useState } from 'react';
import FormPlanoAula from './components/FormPlanoAula';
import ResPlano from './components/ResPlano';
import type { PlanoAulaResponse } from './@types';
import './App.css';

const App: React.FC = () => {
  const [resultado, setResultado] = useState<PlanoAulaResponse | null>(null);

  const handlePlanoGerado = (resultado: PlanoAulaResponse) => {
    setResultado(resultado);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🧠 Gerador de Planos de Aula com IA</h1>
        <p>Crie planos de aula personalizados em segundos usando Inteligência Artificial</p>
      </header>
      
      <main className="app-main">
        <FormPlanoAula onPlanoGerado={handlePlanoGerado} />
        <ResPlano resultado={resultado} />
      </main>
    </div>
  );
};

export default App;