// arquivo: src/components/EmTreino.tsx
import React, { useState } from 'react';
import { useWorkoutStore } from '../stores/useWorkoutStore';

// Dados mockados baseados na modelagem que você definiu
const mockExercise = {
  nome: "Agachamento (Meio Cursor)",
  sub: "Potência de Salto • Athletic 2001",
  meta: "4 séries x 12 reps",
  totalSets: 4,
  descansoPadrao: 60,
  mediaURL: "https://media.giphy.com/media/example/giphy.gif"
};

export const EmTreino: React.FC = () => {
  const store = useWorkoutStore();
  const [carga, setCarga] = useState('');
  const [rpe, setRpe] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 flex flex-col justify-between max-w-md mx-auto">
      {/* Topo: Progresso */}
      <header className="w-full">
        <div className="flex justify-between items-center text-sm text-slate-400 font-semibold mb-2">
          <span>TREINO EM ANDAMENTO</span>
          <span>Etapa 1 de 6</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div className="bg-orange-500 h-full rounded-full transition-all duration-300" style={{ width: '16%' }}></div>
        </div>
      </header>

      {/* Centro: Animação e Identificação */}
      <main className="flex-1 flex flex-col items-center justify-center my-6 space-y-4">
        <div className="w-full aspect-video bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden shadow-xl">
          {/* Substituir pela tag <img> com Lottie/GIF real */}
          <span className="text-slate-500 text-sm">[ Animação Execução Executando ]</span>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-black text-white tracking-tight">{mockExercise.nome}</h2>
          <p className="text-sm text-orange-400 font-medium">{mockExercise.sub}</p>
        </div>

        {/* Bloco Dinâmico: Timer de Descanso vs Status de Série */}
        <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center shadow-lg">
          {store.isResting ? (
            <div className="text-center space-y-3 animate-pulse">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Tempo de Descanso</p>
              <div className="text-5xl font-black text-orange-500 font-mono">{store.timeLeft}s</div>
              <button 
                onClick={store.skipRest}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all active:scale-95">
                Pular Descanso
              </button>
            </div>
          ) : (
            <div className="w-full text-center space-y-4">
              <div className="flex justify-around items-center">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Série Atual</p>
                  <p className="text-3xl font-black text-white">{store.currentSetIndex} <span className="text-lg text-slate-500">/ {mockExercise.totalSets}</span></p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Meta da Série</p>
                  <p className="text-xl font-bold text-slate-200 mt-1">{mockExercise.meta.split('x')[1] || '12 Reps'}</p>
                </div>
              </div>

              {/* Registro Rápido Mão Suada (Inputs Grandes) */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Carga (kg)</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    value={carga}
                    onChange={(e) => setCarga(e.target.value)}
                    className="w-full bg-transparent text-center font-bold text-xl text-white outline-none"
                  />
                </div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Esforço (RPE)</label>
                  <div className="flex justify-between items-center mt-1 px-2">
                    {[6, 8, 10].map((num) => (
                      <button 
                        key={num}
                        onClick={() => setRpe(num)}
                        className={`text-sm font-black w-7 h-7 rounded-md transition-all ${rpe === num ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Rodapé: Controles Globais de Ação Gigantes */}
      <footer className="space-y-3">
        {!store.isResting && (
          <button 
            onClick={() => store.nextSet(mockExercise.descansoPadrao)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 text-xl font-black py-5 px-6 rounded-2xl shadow-lg shadow-orange-500/20 tracking-wide transition-all active:scale-95 flex justify-center items-center space-x-2">
            <span>CONCLUIR SÉRIE</span>
            <span className="text-sm bg-slate-950 text-orange-400 px-2 py-0.5 rounded-md">+{mockExercise.descansoPadrao}s</span>
          </button>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={store.stopWorkout}
            className="bg-slate-900 border border-slate-800 text-slate-400 font-bold py-4 rounded-xl text-sm active:bg-slate-800 transition-all">
            Encerrar Treino
          </button>
          <button 
            className="bg-slate-900 border border-slate-800 text-slate-200 font-bold py-4 rounded-xl text-sm active:bg-slate-800 transition-all">
            Pular Exercício →
          </button>
        </div>
      </footer>
    </div>
  );
};
