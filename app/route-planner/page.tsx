"use client";

import React from "react";
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";

const RoutePlanner = () => {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: "Verbania Hackathon",
      deliveries: 2,
      distance: 1.1,
      duration: 25,
      stops: ["Teatro Il Maggiore", "McDonald's Corso Europa", "Hotel Sant'Anna"]
    },
    {
      id: 2,
      name: "Quartiere nord",
      deliveries: 8,
      distance: 7.8,
      duration: 55,
      stops: ["Via Verdi 12", "Via Mozart 34", "Piazza Bellini"]
    },
    {
      id: 3,
      name: "Area industriale",
      deliveries: 5,
      distance: 12.3,
      duration: 70,
      stops: ["Via dell'Industria 78", "Via Artigiani 45", "Zona Commerciale 12"]
    }
  ]);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState<number | null>(null);

  const addRoute = () => {
    const newId = routes.length > 0 ? Math.max(...routes.map(route => route.id)) + 1 : 1;
    setRoutes([...routes, {
      id: newId,
      name: "Nuova rotta",
      deliveries: 0,
      distance: 0,
      duration: 0,
      stops: []
    }]);
  };

  const removeRoute = (id: number) => {
    setRouteToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (routeToDelete !== null) {
      setRoutes(routes.filter(route => route.id !== routeToDelete));
      setIsDeleteDialogOpen(false);
      setRouteToDelete(null);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4">
      {routes.map((route) => (
        <div key={route.id} className="bg-white p-4 rounded shadow-md w-full">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Rotta #{route.id}: {route.name}</h3>
            <div className="flex space-x-2">
                <Button
                onClick={() => window.location.href = `/route-planner/${route.id}`}
                variant="outline"
                size="sm"
                >
                <Pencil className="h-4 w-4 mr-1" />
                Visualizza e modifica
                </Button>
              <Button 
              onClick={() => removeRoute(route.id)} 
              variant="destructive" 
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
              >
              <Trash2 className="h-4 w-4 mr-1" />
              Rimuovi
              </Button>
            </div>
          </div>
          <p className="text-gray-600">{route.deliveries} consegne • {route.distance} km • ~{route.duration} minuti</p>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <span>{route.stops.join(" → ")} {route.stops.length ? "→ ..." : ""}</span>
          </div>
        </div>
      ))}
      
      <button 
        onClick={addRoute}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        + Aggiungi nuova rotta
      </button>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conferma eliminazione</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare questa rotta? Questa azione non può essere annullata.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annulla
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Elimina
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function RoutePlannerPage() {
  return (
    <div className="flex flex-col min-h-screen gap-4">
      <section>
        <div>
          <h1 className="text-4xl font-bold">📍 Pianifica rotte</h1>
          <p>
            Questa è la pagina di pianificazione delle rotte. Puoi pianificare la sequenza delle consegne da effettuare!
          </p>
        </div>
      </section>

      <div>
        <RoutePlanner />
      </div>
    </div>
  );
}