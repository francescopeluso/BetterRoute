import React from "react";
import Image from "next/image";
import HowardStark from "@/public/howard-stark.jpg";

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen gap-4">

      <section>
        <div>
          <h1 className="text-4xl font-bold">💬 Parla con Guido</h1>
          <p>
            Il tuo assistente AI, pronto a rispondere a qualsiasi dubbio sulle tue attività!
          </p>
        </div>
        
      </section>

      <div className="my-4 flex flex-col items-center justify-center text-center gap-4">
        <Image 
          src={HowardStark}
          alt="Howard Stark image"
          width={600}
          height={400}
          className="rounded-lg"
        />
        <strong>Siamo limitati dalle tecnologie del nostro tempo.</strong> <br/>Questa funzione non è ancora disponibile. ☹️
      </div>

    </div>
  );
}