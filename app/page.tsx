import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col text-center items-center justify-between min-h-[96vh] gap-4">

      <div className="flex-grow flex items-center justify-center">
        <div>
          <h1 className="text-6xl font-bold">🚚 BetterRoute</h1>
          <p>
          Massimizza l&apos;efficienza delle tue consegne, col minor impatto ambientale. 🚀
          </p>

          <div className="mt-8 p-4 bg-yellow-100 text-yellow-800 rounded-md">
            <p className="font-medium">⚠️ Nota: Questo è un prototipo</p>
            <p className="text-sm">Non tutte le funzionalità sono state sviluppate o completate. 
               Questa è una dimostrazione concettuale del progetto.</p>
          </div>
        </div>
      </div>

      <div>
      Realizzato dal Tavolo 1 - BetterRoute, per l&apos;<a className="font-bold underline" href="https://www.svst.it/hackathon/">SVST Hackahton 2025 di Verbania</a> 🌍
      </div>

    </div>
  );
}
