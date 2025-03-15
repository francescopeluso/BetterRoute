"use client"

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; 
import interactionPlugin from "@fullcalendar/interaction";

export default function BetterCalendar() {
  return (
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
      events={[
        { title: "Consegna Demo 1", date: "2025-03-15", start: "14:00", end: "16:00" },
        { title: "Consegna Demo 2", date: "2025-03-16", start: "10:00", end: "12:00" },
      ]}
    />
  );
}