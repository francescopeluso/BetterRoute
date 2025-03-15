"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Report {
  id: number;
  type: 'error' | 'warning' | 'delay';
  title: string;
  location: string;
  date: string;
  description: string;
  deliveryId: string;
}

export default function ReportsPage() {
  const [reports, _setReports] = useState<Report[]>([
    {
      id: 1,
      type: 'error',
      title: 'Multa ZTL - €90',
      location: 'Via Roma, Milano',
      date: '15/03/2024',
      description: 'Accesso non autorizzato in zona ZTL durante consegna #4532',
      deliveryId: '4532'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Consegna Rifiutata',
      location: 'Via Garibaldi 23, Torino',
      date: '15/03/2024',
      description: 'Cliente assente. Pacco tornato al magazzino.',
      deliveryId: '4533'
    },
    {
      id: 3,
      type: 'delay',
      title: 'Ritardo Consegna - 45 min',
      location: 'Corso Italia 45, Roma',
      date: '15/03/2024',
      description: 'Ritardo causato da traffico intenso.',
      deliveryId: '4534'
    },
    {
      id: 4,
      type: 'error',
      title: 'Merce Danneggiata',
      location: 'Via Napoli 12, Firenze',
      date: '16/03/2024',
      description: 'Pacco danneggiato durante il trasporto.',
      deliveryId: '4535'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Indirizzo Errato',
      location: 'Via Venezia 78, Bologna',
      date: '16/03/2024',
      description: 'Indirizzo fornito non esistente.',
      deliveryId: '4536'
    }
  ]);

  return (
    <div className="flex flex-col min-h-screen gap-4">
      <section>
        <div>
          <h1 className="text-4xl font-bold">⚠️ Reports</h1>
          <p>
            Eventuali consegne non effettuate, imprevisti, o altro, segnalate dai corrieri, compariranno qui.
          </p>
        </div>
      </section>

      <div>
        <div className="flex flex-col w-full space-y-4">
          {reports.map((report) => (
            <Card 
              key={report.id}
              className={`w-full ${
                report.type === 'error' ? 'border-red-500 bg-red-50' :
                report.type === 'warning' ? 'border-amber-500 bg-amber-50' :
                'border-yellow-500 bg-yellow-50'
              }`}
            >
              <CardHeader>
                <CardTitle className={
                  report.type === 'error' ? 'text-red-700' :
                  report.type === 'warning' ? 'text-amber-700' :
                  'text-yellow-700'
                }>{report.title}</CardTitle>
                <CardDescription>{report.location} - {report.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{report.description} {report.deliveryId && `ID consegna: #${report.deliveryId}`}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}