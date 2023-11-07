import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import moment from "moment";

const EditEventModal = ({
  isOpen,
  onClose,
  event,
  onEventUpdated,
  onEventDeleted,
}) => {
  const [eventType, setEventType] = useState(event ? event.eventType : "");
  const [eventDate, setEventDate] = useState(
    event ? moment(event.eventDate) : new Date()
  );

  useEffect(() => {
    setEventType(event ? event.eventType : "");
    setEventDate(event ? moment(event.eventDate) : new Date());
  }, [event]);

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      _id: event._id,
      eventType,
      eventDate: moment(eventDate).toISOString(),
    };
    onEventUpdated(updatedEvent);
    onClose();
  };

  const onDelete = () => {
    onEventDeleted(event._id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Title"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        <div>
          <label>Edit the date</label>
          <Datetime value={eventDate} onChange={(date) => setEventDate(date)} />
        </div>
        <button>Edit Event</button>
        <button onClick={onDelete}>Delete Event</button>
      </form>
    </Modal>
  );
};

export default EditEventModal;
