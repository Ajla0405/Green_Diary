import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import moment from "moment";
import "./calendar-styles.css"; // Import your CSS file

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState(new Date());

  const onSubmit = (event) => {
    const formattedeventDate = moment(eventDate).toISOString();
    event.preventDefault();
    onEventAdded({
      eventType,
      eventDate: formattedeventDate,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit} className="add-event-form">
        <input
          className="event-title-input"
          placeholder="Title"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        <div>
          <label className="pick-day-label">Pick a day</label>
          <Datetime
            value={eventDate}
            onChange={(date) => setEventDate(date)}
            className="event-date-picker"
          />
        </div>
        <button className="add-event-button">Add Event</button>
      </form>
    </Modal>
  );
};

export default AddEventModal;
