// import React from "react";
// import Fullcalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// function CalendarPage() {
//   return (
//     <div>
//       <Fullcalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView={"dayGridMonth"}
//         headerToolbar={{
//           start: "today prev,next",
//           center: "title",
//           end: "dayGridMonth,timeGridWeek,timeGridDay",
//         }}
//         height={"90vh"}
//       />
//     </div>
//   );
// }

// export default CalendarPage;
// import React, { useState, useEffect } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import EventModal from "./EventModal";

// const API_BASE_URL = "http://localhost:8000";
// const CREATE_EVENT_API = `${API_BASE_URL}/events/create`;
// const UPDATE_EVENT_API = `${API_BASE_URL}/events/update`;
// const DELETE_EVENT_API = `${API_BASE_URL}/events/delete`;

// function CalendarPage({ plantId }) {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [isNewEvent, setIsNewEvent] = useState(false);

//   useEffect(() => {

//     fetch(`${API_BASE_URL}/events/${plantId}`)
//       .then((response) => response.json())
//       .then((data) => setEvents(data))
//       .catch((error) => console.error(error));
//   }, [plantId]);

//   const handleEventClick = (info) => {
//     setSelectedEvent(info.event);

//     setIsNewEvent(false);
//   };

//   const handleDateClick = (info) => {
//     setSelectedEvent(info.date);

//     setIsNewEvent(true);
//   };

//   const saveEvent = (eventData) => {
//     const apiEndpoint = isNewEvent ? CREATE_EVENT_API : UPDATE_EVENT_API;
//     const method = isNewEvent ? "POST" : "PUT";

//     fetch(apiEndpoint, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         plantId,
//         eventType: eventData.title,
//         eventDate: eventData.start,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {

//         const updatedEvents = [...events];
//         if (isNewEvent) {
//           updatedEvents.push(data);
//         } else {
//           const eventIndex = updatedEvents.findIndex(
//             (event) => event._id === data._id
//           );
//           updatedEvents[eventIndex] = data;
//         }
//         setEvents(updatedEvents);
//         setSelectedEvent(null);
//       })
//       .catch((error) => console.error(error));
//   };

//   const deleteEvent = () => {
//     if (selectedEvent) {
//       const eventId = selectedEvent._id;
//       fetch(`${DELETE_EVENT_API}/${eventId}`, {
//         method: "DELETE",
//       })
//         .then(() => {
//           const updatedEvents = events.filter((event) => event._id !== eventId);
//           setEvents(updatedEvents);
//           setSelectedEvent(null);
//         })
//         .catch((error) => console.error(error));
//     }
//   };

//   return (
//     <div>
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         headerToolbar={{
//           start: "today prev,next",
//           center: "title",
//           end: "dayGridMonth,dayGridWeek,dayGridDay",
//         }}
//         events={events}
//         eventClick={handleEventClick}
//         dateClick={handleDateClick}
//       />

//       {selectedEvent && (
//         <EventModal
//           event={selectedEvent}
//           isNewEvent={isNewEvent}
//           onSave={saveEvent}
//           onDelete={deleteEvent}
//           onClose={() => setSelectedEvent(null)}
//         />
//       )}
//     </div>
//   );
// }

// export default CalendarPage;

// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

// function CalendarPage() {
//   const [events, setEvents] = useState([]);

//   const handleDateClick = (info) => {
//     // Handle date clicks to add new events
//     const title = prompt("Event Title:");
//     if (title) {
//       const newEvent = {
//         title,
//         start: info.date,
//       };
//       setEvents([...events, newEvent]);
//     }
//   };

//   const handleEventClick = (info) => {
//     // Handle event clicks (edit or delete)
//     const title = prompt("Edit Event Title:", info.event.title);
//     if (title) {
//       const updatedEvent = { ...info.event.toPlainObject(), title };
//       const updatedEvents = events.map((event) =>
//         event === info.event ? updatedEvent : event
//       );
//       setEvents(updatedEvents);
//     }
//   };

//   return (
//     <div>
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         headerToolbar={{
//           start: "today prev,next",
//           center: "title",
//           end: "dayGridMonth,dayGridWeek,dayGridDay",
//         }}
//         events={events}
//         dateClick={handleDateClick}
//         eventClick={handleEventClick}
//       />
//     </div>
//   );
// }

// export default CalendarPage;
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleDateClick = (info) => {
    // Handle date clicks to add new events
    setSelectedDate(info.date);
    setEventTitle("");
    setIsEditing(true);
  };

  const handleEventClick = (info) => {
    // Handle event clicks (edit or delete)
    setSelectedDate(info.event.start);
    setEventTitle(info.event.title);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (eventTitle) {
      const newEvent = {
        title: eventTitle,
        start: selectedDate,
      };

      const updatedEvents = [...events];

      // Find an existing event with the same date (if any)
      const existingEventIndex = updatedEvents.findIndex((event) =>
        event.start.isSame(selectedDate, "day")
      );

      if (existingEventIndex !== -1) {
        // Update the existing event
        updatedEvents[existingEventIndex] = newEvent;
      } else {
        // Add the new event
        updatedEvents.push(newEvent);
      }

      setEvents(updatedEvents);

      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    const updatedEvents = events.filter(
      (event) => !event.start.isSame(selectedDate, "day")
    );
    setEvents(updatedEvents);

    setIsEditing(false);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />

      {isEditing && (
        <div>
          <form>
            <label>
              Event Title:
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </label>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
