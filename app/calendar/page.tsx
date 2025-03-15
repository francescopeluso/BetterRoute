import React from "react";
import BetterCalendar from "@/components/calendar";

export default function CalendarPage() {
  return (
    <div className="flex flex-col min-h-screen gap-4">

      <section>
        <div>
          <h1 className="text-4xl font-bold">📆 Calendario</h1>
          <p>
            Questa è la pagina del calendario. Puoi gestire consegne, appuntamenti, e altro, da qui!
          </p>
        </div>
        
      </section>

      <div>
        <BetterCalendar />
      </div>

    </div>
  );
}