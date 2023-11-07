// import React, { useState, useEffect, useRef } from "react";
// import Fullcalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import AddEventModal from "./AddEventModal";
// import axios from "axios";
// import { useAuth } from "../Context/AuthProvider";

// const apiBaseUrl = "http://localhost:8000";

// const api = axios.create({
//   baseURL: apiBaseUrl,
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// const Calendar = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const calendarRef = useRef(null);
//   const [events, setEvents] = useState([]);

//   const { userData } = useAuth();
//   const userId = userData._id;

//   const onEventAdded = (event) => {
//     const { eventType, eventDate } = event;
//     api
//       .post("http://localhost:8000/events/create-event", {
//         eventType,
//         eventDate,
//         user: userId,
//       })
//       .then((response) => {
//         setEvents([...events, response.data]);
//       })
//       .catch((error) => {
//         console.error("Error adding event:", error);
//       });
//   };

//   useEffect(() => {
//     api
//       .get("http://localhost:8000/events/get-event")
//       .then((response) => {
//         const userEvents = response.data.filter(
//           (event) => event.user === userId
//         );
//         setEvents(userEvents);
//       })
//       .catch((error) => {
//         console.error("Error fetching events:", error);
//       });
//   }, [userId]);

//   return (
//     <section>
//       <button onClick={() => setModalOpen(true)}>Add Event Type</button>
//       <div style={{ position: "relative", zIndex: 0 }}>
//         <Fullcalendar
//           ref={calendarRef}
//           plugins={[dayGridPlugin]}
//           initialView="dayGridMonth"
//           events={events.map((event) => ({
//             title: event.eventType,
//             start: event.eventDate,
//           }))}
//         />
//       </div>
//       <AddEventModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onEventAdded={(event) => onEventAdded(event)}
//       />
//     </section>
//   );
// };

// export default Calendar;
import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal"; // Make sure to import EditEventModal
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";

const apiBaseUrl = "http://localhost:8000";

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); // State to control edit modal
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Selected event for editing

  const { userData } = useAuth();
  const userId = userData._id;

  const onEventAdded = (event) => {
    const { eventType, eventDate } = event;
    api
      .post("http://localhost:8000/events/create-event", {
        eventType,
        eventDate,
        user: userId,
      })
      .then((response) => {
        setEvents([...events, response.data]);
      })
      .catch((error) => {
        console.error("Error adding event:", error);
      });
  };

  const handleEventClick = (clickInfo) => {
    const clickedEvent = events.find(
      (event) => event._id === clickInfo.event.extendedProps._id
    );
    setSelectedEvent(clickedEvent);
    setEditModalOpen(true);
  };

  const handleEventUpdated = (updatedEvent) => {
    api
      .put(
        `http://localhost:8000/events/update-event/${updatedEvent._id}`,
        updatedEvent
      )
      .then((response) => {
        const updatedEvents = events.map((e) =>
          e._id === updatedEvent._id ? updatedEvent : e
        );
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
    setEditModalOpen(false);
  };
  const handleEventDeleted = (eventId) => {
    api
      .delete(`http://localhost:8000/events/delete-event/${eventId}`)
      .then(() => {
        const updatedEvents = events.filter((event) => event._id !== eventId);
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
    setEditModalOpen(false);
  };

  useEffect(() => {
    api
      .get("http://localhost:8000/events/get-event")
      .then((response) => {
        const userEvents = response.data.filter(
          (event) => event.user === userId
        );
        setEvents(userEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [userId]);

  return (
    <section>
      <button onClick={() => setModalOpen(true)}>Add Event Type</button>
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events.map((event) => ({
            title: event.eventType,
            start: event.eventDate,
            extendedProps: { _id: event._id },
          }))}
          eventClick={handleEventClick}
        />
      </div>
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
      <EditEventModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        event={selectedEvent}
        onEventUpdated={handleEventUpdated}
        onEventDeleted={handleEventDeleted}
      />
    </section>
  );
};

export default Calendar;
