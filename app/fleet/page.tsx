"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define vehicle type
type Vehicle = {
  id: string;
  name: string;
  licensePlate: string;
  type: string;
  fuel: string;
  consumption: string;
  capacity: string;
  volume: string;
  available: boolean;
};

export default function FleetPage() {
  // Initial vehicles list
  const initialVehicles: Vehicle[] = [
    {
      id: "1",
      name: "Camion Iveco Daily",
      licensePlate: "AB123CD",
      type: "Furgone grande",
      fuel: "Diesel",
      consumption: "11.5",
      capacity: "1200",
      volume: "16",
      available: true,
    },
    {
      id: "2",
      name: "Fiat Fiorino",
      licensePlate: "EF456GH",
      type: "Furgone piccolo",
      fuel: "Benzina",
      consumption: "7.2",
      capacity: "610",
      volume: "2.8",
      available: true,
    }
  ];

  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    available: true
  });

  const handleAddVehicle = () => {
    if (!newVehicle.name || !newVehicle.licensePlate) return;
    
    const vehicle: Vehicle = {
      id: Date.now().toString(),
      name: newVehicle.name || "",
      licensePlate: newVehicle.licensePlate || "",
      type: newVehicle.type || "",
      fuel: newVehicle.fuel || "",
      consumption: newVehicle.consumption || "",
      capacity: newVehicle.capacity || "",
      volume: newVehicle.volume || "",
      available: true
    };
    
    setVehicles([...vehicles, vehicle]);
    setIsDialogOpen(false);
    setNewVehicle({ available: true });
  };

  return (
    <div className="flex flex-col min-h-screen gap-4">
      <section>
        <div>
          <h1 className="text-4xl font-bold">🚛 Flotta mezzi</h1>
          <p>
            Questa è la pagina di gestione della flotta mezzi. Puoi visualizzare i mezzi disponibili, aggiungerne di nuovi, o rimuoverne.
          </p>
        </div>
      </section>

      <div>
        <div className="mb-4">
          <Button className="flex items-center gap-2" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-5 w-5" />
            Aggiungi Veicolo
          </Button>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Aggiungi Nuovo Veicolo</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome veicolo</Label>
                  <Input 
                    id="name" 
                    value={newVehicle.name || ''} 
                    onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">Targa</Label>
                  <Input 
                    id="licensePlate" 
                    value={newVehicle.licensePlate || ''} 
                    onChange={(e) => setNewVehicle({...newVehicle, licensePlate: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Input 
                    id="type" 
                    value={newVehicle.type || ''} 
                    onChange={(e) => setNewVehicle({...newVehicle, type: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuel">Carburante</Label>
                  <Select onValueChange={(value) => setNewVehicle({...newVehicle, fuel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona carburante" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Benzina">Benzina</SelectItem>
                      <SelectItem value="Elettrico">Elettrico</SelectItem>
                      <SelectItem value="GPL">GPL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="consumption">
                    {newVehicle.fuel === "Elettrico" 
                      ? "Consumo medio (kWh/100km)" 
                      : "Consumo medio (L/100km)"}
                    </Label>
                  <Input 
                    id="consumption" 
                    value={newVehicle.consumption || ''} 
                    onChange={(e) => setNewVehicle({...newVehicle, consumption: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacità di carico (kg)</Label>
                  <Input 
                    id="capacity" 
                    value={newVehicle.capacity || ''} 
                    onChange={(e) => setNewVehicle({...newVehicle, capacity: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="volume">Volume di carico (m³)</Label>
                <Input 
                  id="volume" 
                  value={newVehicle.volume || ''} 
                  onChange={(e) => setNewVehicle({...newVehicle, volume: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annulla</Button>
              <Button onClick={handleAddVehicle}>Salva</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col w-full gap-4">
        {vehicles.map(vehicle => (
          <Card key={vehicle.id} className="w-full">
            <CardHeader className="flex flex-row justify-between items-center">
              <h3 className="text-xl font-bold">{vehicle.name}</h3>
              <Badge variant="outline" className={vehicle.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {vehicle.available ? "Disponibile" : "Non Disponibile"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p><span className="font-medium">Targa:</span> {vehicle.licensePlate}</p>
                  <p><span className="font-medium">Tipo:</span> {vehicle.type}</p>
                  <p><span className="font-medium">Carburante:</span> {vehicle.fuel}</p>
                </div>
                <div>
                    <p><span className="font-medium">Consumo medio:</span> {
                    vehicle.fuel === "Elettrico" 
                      ? `${vehicle.consumption.split(' ')[0]} kWh/100km`
                      : `${vehicle.consumption.split(' ')[0]} L/100km`
                    }</p>
                    <p><span className="font-medium">Capacità di carico:</span> {vehicle.capacity} kg</p>
                    <p><span className="font-medium">Volume di carico:</span> {vehicle.volume} m<sup>3</sup></p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}