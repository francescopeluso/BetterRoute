"use client"

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; 
import interactionPlugin from "@fullcalendar/interaction";

export default function BetterCalendar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [events, setEvents] = React.useState([
    { id: '1', title: "Consegna Demo 1", start: "2025-03-15T14:00:00", end: "2025-03-15T16:00:00" },
    { id: '2', title: "Consegna Demo 2", start: "2025-03-16T10:00:00", end: "2025-03-16T12:00:00" },
  ]);
  const [newEvent, setNewEvent] = React.useState({
    title: "",
    date: "",
    start: "",
    end: "",
  });

  const handleDateClick = (arg) => {
    setNewEvent({
      ...newEvent,
      date: arg.dateStr,
    });
    setIsOpen(true);
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
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    setNewEvent({
      ...newEvent,
      date: today,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create proper event object with ISO string dates
    const formattedEvent = {
      id: Date.now().toString(), // Add unique ID for each event
      title: newEvent.title,
      start: `${newEvent.date}T${newEvent.start}:00`,
      end: newEvent.end ? `${newEvent.date}T${newEvent.end}:00` : `${newEvent.date}T${newEvent.start}:00`
    };
    setEvents([...events, formattedEvent]);
    setIsOpen(false);
    setNewEvent({ title: "", date: "", start: "", end: "" });
  };

  return (
    <div className="relative">
      <div className="flex justify-end mb-4">
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
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek, timeGridDay'
        }}
        events={events}
        dateClick={handleDateClick}
        editable={true}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
      />
      
      {isOpen && (
        /* Modal content remains the same */
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Aggiungi consegna</h2>
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
                    Salva
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