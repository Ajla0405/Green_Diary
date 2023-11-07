import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import "./calendar-styles.css";

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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { userData, isLoggedIn } = useAuth();
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

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        { withCredentials: true }
      );
      logout();
    } catch (error) {
      alert("Error logging out");
    }
  };

  useEffect(() => {
    api
      .get("http://localhost:8000/events/get-event")
      .then((response) => {
        console.log("Response from server:", response.data);
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
      {isLoggedIn ? (
        <button className="add-event-button" onClick={() => setModalOpen(true)}>
          Add Event Type
        </button>
      ) : (
        <Link to="/login">
          <button className="login-button-calendar">
            Please login to Add Event
          </button>
        </Link>
      )}
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          className="my-calendar-class"
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events.map((event) => ({
            title: event.eventType,
            start: event.eventDate,
            extendedProps: { _id: event._id },
          }))}
          eventColor="#61a03acc"
          eventTextColor="#fff"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          eventClick={handleEventClick}
          height="680px"
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
