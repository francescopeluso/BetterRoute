"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

// Dynamically import React Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then(mod => mod.TileLayer),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then(mod => mod.Polyline),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then(mod => mod.Marker),
  { ssr: false }
);

// Create a wrapper component for markers to ensure they initialize properly
const SafeMarker = ({ position }: { position: [number, number] }) => {
  return (
    <Marker 
      position={position} 
      icon={L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })}
    />
  );
};

export default function RouteDetailsPage() {
  const params = useParams();
  const id_rotta = params.id as string;
  // Add a state to check if we're rendering on the client side
  const [isClient, setIsClient] = useState(false);

  // Updated state structure with type field and demo data
  const [deliveries, setDeliveries] = useState([
    { 
      name: "Teatro Centro Eventi Il Maggiore", 
      address: "Via S. Bernardino, 49, 28922 Pallanza", 
      time: "09:30",
      type: "delivery" 
    },
    { 
      name: "Hotel Sant'Anna", 
      address: "Viale Sant'Anna, 65, 28922 Verbania", 
      time: "11:15",
      type: "delivery" 
    },
    { 
      name: "McDonald's Verbania Corso Europa", 
      address: "Corso Europa, 28922 Pallanza", 
      time: "13:00",
      type: "pickup" 
    }
  ]);
  
  const [selectedVehicle, setSelectedVehicle] = useState("Van");
  const vehicles = ["Truck", "Van", "Bike"]; // Fake data

  // Fix Leaflet default icon issue - moved inside component
  useEffect(() => {
    // This runs only on client-side
    setIsClient(true);
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
    });
  }, []);

  const addDelivery = () => {
    setDeliveries([...deliveries, { name: "", address: "", time: "", type: "delivery" }]);
  };

  const updateDelivery = (index: number, field: string, value: string) => {
    const updated = deliveries.map((d, idx) => idx === index ? { ...d, [field]: value } : d);
    setDeliveries(updated);
  };

  // Toggle between delivery and pickup
  const toggleDeliveryType = (index: number) => {
    const updated = deliveries.map((d, idx) => 
      idx === index ? { ...d, type: d.type === "delivery" ? "pickup" : "delivery" } : d
    );
    setDeliveries(updated);
  };

  // Demo coordinates for Verbania
  const verbaLocations = [
    [45.9307, 8.5719], // Teatro Il Maggiore
    [45.9291, 8.5607], // Hotel Sant'Anna
    [45.9275, 8.5614]  // McDonald's Verbania Corso Europa
  ];

  // Generate fake coordinates for the map route
  const coordinates = deliveries.map((_, index) => [45.0 + 0.01 * index, 9.0 + 0.01 * index]);
  const center = verbaLocations[0]; // Center on Verbania

  return (
    <div className="flex flex-col min-h-screen gap-4">
      <section>
        <div>
          <h1 className="text-4xl font-bold">
            📍 Rotta spedizioni - ID: {id_rotta}
          </h1>
          <p>
            Pianifica qui le consegne da fare, scegliendo l&apos;ordine di consegna, ritiri e il veicolo da usare.
          </p>
        </div>
      </section>

      <div className="flex flex-row gap-4 min-h-full">

        <div className="flex flex-col gap-4 w-3/5 min-h-full">
            <div className="flex gap-4">
            <section className="p-4 border rounded w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Seleziona Veicolo</h2>
              <Select value={selectedVehicle} onValueChange={(val: string) => setSelectedVehicle(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona veicolo" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map(vehicle => (
                <SelectItem key={vehicle} value={vehicle}>
                  {vehicle}
                </SelectItem>
                ))}
              </SelectContent>
              </Select>
            </section>

            <section className="p-4 border rounded w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Seleziona Data</h2>
              <div className="flex items-center gap-2">
              <Input
                type="date"
                defaultValue="2023-09-15"
                className="w-full"
                onChange={(e) => console.log("Data selezionata:", e.target.value)}
              />
              </div>
            </section>
            </div>

          <section className="p-4 border rounded">
            <h2 className="text-2xl font-semibold mb-4">Sequenza di Consegne/Ritiri</h2>
            {deliveries.map((delivery, index) => (
              <div 
              key={index} 
              className={`mb-8 p-4 border rounded-lg ${
                delivery.type === "pickup" ? "bg-amber-50 border-amber-200" : "bg-slate-50"
              }`}
              >
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">
                {delivery.type === "pickup" ? "📥 Ritiro" : "📦 Consegna"} #{index + 1}
                </span>
                <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => toggleDeliveryType(index)}
                >
                  {delivery.type === "pickup" ? "Cambia a consegna" : "Cambia a ritiro"}
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => {
                  const updated = deliveries.filter((_, idx) => idx !== index);
                  setDeliveries(updated);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
                </div>
              </div>
              <Input
                placeholder="Nome Luogo"
                value={delivery.name}
                onChange={(e) => updateDelivery(index, "name", e.target.value)}
                className="mb-3"
              />
              <Input
                placeholder="Indirizzo Luogo"
                value={delivery.address}
                onChange={(e) => updateDelivery(index, "address", e.target.value)}
                className="mb-3"
              />
              <Input
                type="time"
                placeholder="Orario Previsto"
                value={delivery.time}
                onChange={(e) => updateDelivery(index, "time", e.target.value)}
              />
              </div>
            ))}
            <Button onClick={addDelivery}>Aggiungi Consegna/Ritiro</Button>
          </section>
        </div>

        <section className="p-4 border rounded w-2/5">
          <h2 className="text-2xl font-semibold mb-4">Mappa del Percorso</h2>
          {/* Only render the map when we're on the client side */}
          {isClient && (
            <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Verbania markers and route */}
              {verbaLocations.map((position, idx) => (
                <SafeMarker key={idx} position={position as [number, number]} />
              ))}
              <Polyline positions={verbaLocations} color="red" weight={3} />
              
              {/* Original route polyline */}
              <Polyline positions={coordinates} color="blue" />
            </MapContainer>
          )}
          {!isClient && (
            <div style={{ height: "400px", width: "100%", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              Caricamento mappa...
            </div>
          )}

            <div className="mt-4">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  onClick={() => {
                    // Here you would implement the save functionality
                    const routeData = {
                      id: id_rotta,
                      vehicle: selectedVehicle,
                      deliveries: deliveries
                    };
                    console.log("Saving route:", routeData);
                    // dovrei inserire qui la chiamata alle mie API per salvare su DB
                    
                    // Show success toast
                    toast.success("Salvato!", {
                      description: "Il percorso è stato salvato con successo."
                    });
                  }}
                >
                  Salva Percorso
                </Button>
            </div>

        </section>

      </div>
    </div>
  );
}