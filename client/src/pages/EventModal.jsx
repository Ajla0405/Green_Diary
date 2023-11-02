import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function EventModal({ isOpen, onClose, onSave, title = "", eventId }) {
  const [eventTitle, setEventTitle] = useState(title);

  useEffect(() => {
    setEventTitle(title); // Update the event title when the title prop changes
  }, [title]);

  const handleSave = () => {
    onSave(eventTitle, eventId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Event Modal">
      <h2>Add or Edit Event</h2>
      <input
        type="text"
        placeholder="Event Title"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}

export default EventModal;
