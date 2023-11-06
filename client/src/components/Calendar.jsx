// import React, { useState, useEffect, useRef } from "react";
// import Fullcalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import AddEventModal from "./AddEventModal";

// const Calendar = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const calendarRef = useRef(null);

//   const onEventAdded = (event) => {
//     let calendarApi = calendarRef.current.getApi();
//     calendarApi.addEvent(event);
//   };

//   return (
//     <section>
//       <button onClick={() => setModalOpen(true)}>Add Event Type</button>

//       <div style={{ position: "relative", zIndex: 0 }}>
//         <Fullcalendar
//           ref={calendarRef}
//           plugins={[dayGridPlugin]}
//           initialView="dayGridMonth"
//           events={[
//             {
//               title: "Test Event",
//               start: new Date(),
//             },
//           ]}
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

// import React, { useState, useEffect, useRef } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import AddEventModal from "./AddEventModal";

// const Calendar = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const calendarRef = useRef(null);
//   const [events, setEvents] = useState([]);

//   const onEventAdded = (event) => {
//     setEvents([...events, event]);
//     setModalOpen(false);
//   };

//   return (
//     <section>
//       <button onClick={() => setModalOpen(true)}>Add Event Type</button>

//       <div style={{ position: "relative", zIndex: 0 }}>
//         <FullCalendar
//           ref={calendarRef}
//           plugins={[dayGridPlugin]}
//           initialView="dayGridMonth"
//           events={events}
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
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "./AddEventModal";
import axios from "axios";

const apiBaseUrl = "http://localhost:8000"; // Replace with your backend API base URL

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Replace with your token storage mechanism
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  const onEventAdded = (event) => {
    const { eventType, eventDate } = event;
    api
      .post("http://localhost:8000/events/create-event", {
        eventType,
        eventDate,
      })
      .then((response) => {
        setEvents([...events, response.data]);
      })
      .catch((error) => {
        console.error("Error adding event:", error);
      });
  };

  useEffect(() => {
    api
      .get("http://localhost:8000/events/get-event")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <section>
      <button onClick={() => setModalOpen(true)}>Add Event Type</button>
      <div style={{ position: "relative", zIndex: 0 }}>
        <Fullcalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          // events={events}
          events={events.map((event) => ({
            title: event.eventType,
            start: event.eventDate,
          }))}
        />
      </div>
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
};

export default Calendar;
