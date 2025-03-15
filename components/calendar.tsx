"use client"

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; 
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from '@fullcalendar/core/locales-all';

// Define status color mapping
const statusColors = {
  "in corso": "#4ade80", // green
  "problemi": "#facc15", // yellow
  "in ritardo": "#fb923c", // orange
  "programmata": "#9ca3af", // gray
};

// Status legend component
const StatusLegend = () => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="text-sm font-medium mr-2">Legenda:</div>
      {Object.entries(statusColors).map(([status, color]) => (
        <div key={status} className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-1" 
            style={{ backgroundColor: color }}
          ></div>
          <span className="text-sm capitalize">{status}</span>
        </div>
      ))}
    </div>
  );
};

export default function BetterCalendar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [events, setEvents] = React.useState([
    { id: '0', title: "🕒 Rotta 'Napoli Centro' del veicolo 'Van 04'", start: "2025-03-10T09:00:00", end: "2025-03-10T15:00:00", status: "programmata" },
    { id: '1', title: "🕒 Rotta 'Milano Centro' del veicolo 'Furgone 01'", start: "2025-03-11T08:00:00", end: "2025-03-11T12:00:00", status: "programmata" },
    { id: '2', title: "🚚 Rotta 'Torino Sud' del veicolo 'Van 02'", start: "2025-03-11T09:00:00", end: "2025-03-11T14:00:00", status: "in corso" },
    { id: '3', title: "⚠️ Rotta 'Roma Nord' del veicolo 'Furgone 03'", start: "2025-03-12T08:00:00", end: "2025-03-12T15:00:00", status: "problemi" },
    { id: '4', title: "🕒 Rotta 'Firenze Centro' del veicolo 'Van 01'", start: "2025-03-12T09:00:00", end: "2025-03-12T16:00:00", status: "programmata" },
    { id: '5', title: "🚚 Rotta 'Bologna Est' del veicolo 'Furgone 02'", start: "2025-03-13T08:00:00", end: "2025-03-13T13:00:00", status: "in corso" },
    { id: '6', title: "⏰ Rotta 'Venezia Ovest' del veicolo 'Van 03'", start: "2025-03-13T14:00:00", end: "2025-03-13T19:00:00", status: "in ritardo" },
    { id: '7', title: "🕒 Rotta 'Genova Porto' del veicolo 'Furgone 01'", start: "2025-03-14T08:00:00", end: "2025-03-14T14:00:00", status: "programmata" },
    { id: '8', title: "🚚 Rotta 'Padova Centro' del veicolo 'Van 02'", start: "2025-03-14T15:00:00", end: "2025-03-14T19:00:00", status: "in corso" },
    { id: '9', title: "⚠️ Rotta 'Verona Sud' del veicolo 'Furgone 03'", start: "2025-03-15T08:00:00", end: "2025-03-15T13:00:00", status: "problemi" },
    { id: '10', title: "⏰ Rotta 'Bergamo Est' del veicolo 'Van 01'", start: "2025-03-15T14:00:00", end: "2025-03-15T19:00:00", status: "in ritardo" },
    { id: '11', title: "🕒 Rotta 'Brescia Ovest' del veicolo 'Furgone 02'", start: "2025-03-16T08:00:00", end: "2025-03-16T15:00:00", status: "programmata" },
    { id: '12', title: "🚚 Rotta 'Parma Centro' del veicolo 'Van 03'", start: "2025-03-16T16:00:00", end: "2025-03-16T19:00:00", status: "in corso" }
  ]);
  const [newEvent, setNewEvent] = React.useState({
    id: "",
    title: "",
    date: "",
    start: "",
    end: "",
    status: "programmata", // default status
  });

  const handleDateClick = (arg) => {
    setIsEdit(false);
    setNewEvent({
      id: "",
      title: "",
      date: arg.dateStr,
      start: "",
      end: "",
      status: "programmata",
    });
    setIsOpen(true);
  };

  const handleEventClick = (info) => {
    const event = events.find(e => e.id === info.event.id);
    if (event) {
      const startDate = new Date(event.start);
      const formattedDate = startDate.toISOString().split('T')[0];
      const formattedStartTime = startDate.toISOString().split('T')[1].substring(0, 5);
      
      let formattedEndTime = "";
      if (event.end) {
        const endDate = new Date(event.end);
        formattedEndTime = endDate.toISOString().split('T')[1].substring(0, 5);
      }

      setNewEvent({
        id: event.id,
        title: event.title,
        date: formattedDate,
        start: formattedStartTime,
        end: formattedEndTime,
        status: event.status || "programmata",
      });
      
      setIsEdit(true);
      setIsOpen(true);
    }
  };

  const handleEventDrop = (info) => {
    const updatedEvents = events.map(event => 
      event.id === info.event.id 
        ? { 
            ...event, 
            start: info.event.start.toISOString(), 
            end: info.event.end ? info.event.end.toISOString() : null 
          }
        : event
    );
    setEvents(updatedEvents);
  };
  
  const handleEventResize = (info) => {
    const updatedEvents = events.map(event => 
      event.id === info.event.id 
        ? { 
            ...event, 
            start: info.event.start.toISOString(), 
            end: info.event.end ? info.event.end.toISOString() : null 
          }
        : event
    );
    setEvents(updatedEvents);
  };

  const openEventForm = () => {
    setIsEdit(false);
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    setNewEvent({
      id: "",
      title: "",
      date: today,
      start: "",
      end: "",
      status: "programmata",
    });
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedEvent = {
      id: isEdit ? newEvent.id : Date.now().toString(),
      title: newEvent.title,
      start: `${newEvent.date}T${newEvent.start}:00`,
      end: newEvent.end ? `${newEvent.date}T${newEvent.end}:00` : `${newEvent.date}T${newEvent.start}:00`,
      status: newEvent.status,
      backgroundColor: statusColors[newEvent.status],
      borderColor: statusColors[newEvent.status],
    };

    if (isEdit) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === newEvent.id ? formattedEvent : event
      ));
    } else {
      // Add new event
      setEvents([...events, formattedEvent]);
    }
    
    setIsOpen(false);
    setNewEvent({ id: "", title: "", date: "", start: "", end: "", status: "programmata" });
    setIsEdit(false);
  };

  // Process events to add color properties
  const coloredEvents = events.map(event => ({
    ...event,
    backgroundColor: statusColors[event.status] || statusColors["programmata"],
    borderColor: statusColors[event.status] || statusColors["programmata"]
  }));

  return (
    <div className="relative">
      <div className="flex justify-between mb-4 items-center">
        <StatusLegend />
        <button
          onClick={openEventForm}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Aggiungi consegna
        </button>
      </div>
      
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        weekends={true}
        firstDay={1}
        locales={allLocales}
        locale={'it'}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        }}
        events={coloredEvents}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
      />
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Modifica consegna" : "Aggiungi consegna"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">Nome o ragione sociale destinatario</label>
                  <input
                    id="title"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="datetime" className="text-sm font-medium">Data e ora stimata consegna</label>
                  <input
                  id="datetime"
                  type="datetime-local"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  value={`${newEvent.date}T${newEvent.start}`}
                  onChange={(e) => {
                    const dateTime = e.target.value;
                    const [date, time] = dateTime.split('T');
                    setNewEvent({
                    ...newEvent, 
                    date: date,
                    start: time
                    });
                  }}
                  required
                  />
                </div>
                {isEdit && (
                  <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-medium">Stato consegna</label>
                  <div className="flex h-10 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-gray-700">
                    {newEvent.status === "programmata" && "Programmata"}
                    {newEvent.status === "in corso" && "In corso"}
                    {newEvent.status === "problemi" && "Problemi"}
                    {newEvent.status === "in ritardo" && "In ritardo"}
                  </div>
                  </div>
                )}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    {isEdit ? "Aggiorna" : "Salva"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}