import React from "react";

export default function StatsPage() {
  return (
    <div className="flex flex-col min-h-screen gap-4">

      <section>
      <div>
        <h1 className="text-4xl font-bold">📊 Statistiche</h1>
        <p>
        Visualizza le statistiche delle tue attività.
        </p>
      </div>
      
      </section>

      <div className="my-4 flex flex-col items-center justify-center text-center gap-4">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {/* Consegne e ritiri */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold">Attività</h3>
          <p className="text-sm text-muted-foreground">Consegne e ritiri</p>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
          <span>Consegne programmate</span>
          <span className="font-semibold">42</span>
          </div>
          <div className="flex justify-between items-center">
          <span>Consegne in corso</span>
          <span className="font-semibold">7</span>
          </div>
          <div className="flex justify-between items-center">
          <span>Ritiri programmati</span>
          <span className="font-semibold">28</span>
          </div>
          <div className="flex justify-between items-center">
          <span>Ritiri in corso</span>
          <span className="font-semibold">5</span>
          </div>
        </div>
        </div>

        {/* Veicoli disponibili */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold">Flotta</h3>
          <p className="text-sm text-muted-foreground">Veicoli disponibili</p>
        </div>
        <div className="mt-4">
          <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span>Diesel</span>
            <span className="font-semibold">12</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full">
            <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '60%' }}></div>
          </div>
          </div>
          <div className="flex flex-col space-y-2 mt-4">
          <div className="flex justify-between">
            <span>Elettrici</span>
            <span className="font-semibold">8</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full">
            <div className="h-2 bg-green-400 rounded-full" style={{ width: '40%' }}></div>
          </div>
          </div>
          <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">Totale: 20 veicoli</p>
          <p className="text-sm text-green-600 mt-2">Disponibili: 15 veicoli</p>
          </div>
        </div>
        </div>

        {/* Consumi */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold">Consumi</h3>
          <p className="text-sm text-muted-foreground">Ultimo mese</p>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
          <span>Carburante</span>
          <span className="font-semibold">2850 L</span>
          </div>
          <div className="flex justify-between items-center">
          <span>Energia elettrica</span>
          <span className="font-semibold">1240 kWh</span>
          </div>
          <div className="flex justify-between items-center">
          <span>Chilometri percorsi</span>
          <span className="font-semibold">32,450 km</span>
          </div>
          <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Efficienza carburante</span>
            <span className="text-sm font-medium">11.4 L/100km</span>
          </div>
          </div>
        </div>
        </div>

        {/* Impatto ambientale */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:col-span-2 lg:col-span-2">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold">Impatto Ambientale</h3>
          <p className="text-sm text-muted-foreground">Emissioni di CO2 negli ultimi 6 mesi</p>
        </div>
        <div className="mt-6 h-[200px]">
          {/* Placeholder per i charts */}
          <div className="relative w-full h-full flex items-end">
          <div className="flex-1 h-[30%] bg-green-200 relative group">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white p-1 rounded text-xs">Gen: 4.2t</div>
            <div className="text-xs text-center">Gen</div>
          </div>
          <div className="flex-1 h-[45%] bg-green-300 relative group">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white p-1 rounded text-xs">Feb: 5.1t</div>
            <div className="text-xs text-center">Feb</div>
          </div>
          <div className="flex-1 h-[35%] bg-green-400 relative group">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white p-1 rounded text-xs">Mar: 4.8t</div>
            <div className="text-xs text-center">Mar</div>
          </div>
          <div className="flex-1 h-[60%] bg-green-500 relative group">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white p-1 rounded text-xs">Apr: 5.7t</div>
            <div className="text-xs text-center">Apr</div>
          </div>
          <div className="flex-1 h-[50%] bg-green-600 relative group">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white p-1 rounded text-xs">Mag: 5.3t</div>
            <div className="text-xs text-center">Mag</div>
          </div>
          <div className="flex-1 h-[40%] bg-green-700 relative group">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white p-1 rounded text-xs">Giu: 4.9t</div>
            <div className="text-xs text-center">Giu</div>
          </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
          <p className="text-sm font-medium">Totale CO2 emessa</p>
          <p className="text-2xl font-bold">30.0 tonnellate</p>
          </div>
          <div>
          <p className="text-sm font-medium">Riduzione rispetto all&apos;anno scorso</p>
          <p className="text-2xl font-bold text-green-600">-12%</p>
          </div>
        </div>
        </div>

        {/* Risparmio CO2 */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold">Risparmio CO2</h3>
          <p className="text-sm text-muted-foreground">Grazie ai veicoli elettrici</p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <div className="relative h-40 w-40">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle 
            className="text-slate-100" 
            strokeWidth="10" 
            stroke="currentColor" 
            fill="transparent" 
            r="40" 
            cx="50" 
            cy="50" 
            />
            <circle 
            className="text-green-500" 
            strokeWidth="10" 
            strokeDasharray="251.2" 
            strokeDashoffset="75.36" 
            strokeLinecap="round" 
            stroke="currentColor" 
            fill="transparent" 
            r="40" 
            cx="50" 
            cy="50" 
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-3xl font-bold">70%</p>
            <p className="text-xs">riduzione</p>
          </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="font-medium">7.5 tonnellate di CO2 risparmiate</p>
          <p className="text-sm text-muted-foreground mt-1">Equivalente a piantare ~350 alberi</p>
        </div>
        </div>
      </div>
      
      {/* Forecast Section */}
      <section className="mt-8 w-full">
        <div className="mb-4">
          <h2 className="text-3xl font-bold">🔮 Previsioni</h2>
          <p className="text-muted-foreground">Proiezioni per i prossimi 3 mesi basate sui dati storici</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {/* Attività previste */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-xl font-semibold">Trend Attività</h3>
          <div className="mt-4 h-[180px]">
          <div className="w-full h-full flex items-end">
            <div className="w-1/3 px-2">
            <div className="h-[60%] bg-blue-200 mb-1"></div>
            <div className="h-[80%] bg-blue-300 mb-1"></div>
            <div className="h-[100%] bg-blue-400 mb-1"></div>
            <p className="text-xs text-center mt-1">Lug</p>
            </div>
            <div className="w-1/3 px-2">
            <div className="h-[70%] bg-blue-200 mb-1"></div>
            <div className="h-[95%] bg-blue-300 mb-1"></div>
            <div className="h-[120%] bg-blue-400 mb-1"></div>
            <p className="text-xs text-center mt-1">Ago</p>
            </div>
            <div className="w-1/3 px-2">
            <div className="h-[85%] bg-blue-200 mb-1"></div>
            <div className="h-[100%] bg-blue-300 mb-1"></div>
            <div className="h-[130%] bg-blue-400 mb-1"></div>
            <p className="text-xs text-center mt-1">Set</p>
            </div>
          </div>
          </div>
          <div className="mt-4 flex justify-around text-sm text-center">
          <div>
            <div className="w-3 h-3 bg-blue-200 mx-auto mb-1"></div>
            <p>Consegne</p>
          </div>
          <div>
            <div className="w-3 h-3 bg-blue-300 mx-auto mb-1"></div>
            <p>Ritiri</p>
          </div>
          <div>
            <div className="w-3 h-3 bg-blue-400 mx-auto mb-1"></div>
            <p>Totale</p>
          </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Previsto aumento del 18% nelle consegne</p>
        </div>
        
        {/* Consumi previsti */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-xl font-semibold">Previsione Consumi</h3>
          <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Carburante</span>
            <span className="text-sm font-medium">2650 L (-7%)</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full">
            <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '93%' }}></div>
          </div>
          
          <div className="flex items-center justify-between mb-2 mt-4">
            <span className="text-sm">Energia elettrica</span>
            <span className="text-sm font-medium">1450 kWh (+17%)</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full">
            <div className="h-2 bg-green-400 rounded-full" style={{ width: '117%' }}></div>
          </div>
          
          <div className="flex items-center justify-between mb-2 mt-4">
            <span className="text-sm">Chilometri totali</span>
            <span className="text-sm font-medium">36,200 km (+12%)</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full">
            <div className="h-2 bg-blue-400 rounded-full" style={{ width: '112%' }}></div>
          </div>
          </div>
          <div className="mt-6 pt-4 border-t">
          <p className="text-sm">Risparmio previsto: <span className="font-semibold text-green-600">€1,250</span></p>
          <p className="text-xs text-muted-foreground mt-1">Grazie alla maggiore efficienza della flotta elettrica</p>
          </div>
        </div>
        
        {/* Impatto ambientale previsto */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-xl font-semibold">Impatto Ambientale</h3>
          <div className="mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Emissioni CO2 previste</span>
            <span className="text-sm font-semibold text-green-600">-15%</span>
          </div>
          
          <div className="mt-6 flex items-center justify-center">
            <div className="relative h-32 w-32">
            <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
              <circle 
              cx="50" cy="50" r="45" 
              stroke="#e2e8f0" 
              strokeWidth="10" 
              fill="none" 
              />
              <circle 
              cx="50" cy="50" r="45" 
              stroke="#10b981" 
              strokeWidth="10" 
              fill="none" 
              strokeDasharray="283" 
              strokeDashoffset="85"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">85%</span>
            </div>
            </div>
          </div>
          <p className="text-sm text-center mt-4">Obiettivo di riduzione <br/>per il prossimo trimestre</p>
          </div>
          <div className="mt-6 text-center">
          <p className="text-sm font-medium">Target CO2: <span className="font-bold text-green-600">25.5 tonnellate</span></p>
          </div>
        </div>
        </div>
      </section>
      </div>
    </div>
  );
}