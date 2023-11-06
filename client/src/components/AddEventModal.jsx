// import Modal from "react-modal";
// import Datetime from "react-datetime";
// import React, { useState, useEffect } from "react";
// import moment from "moment";

// const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
//   const [eventType, seteventType] = useState("");
//   const [eventDate, seteventDate] = useState(new Date());

//   const onSubmit = (event) => {
//     event.preventDefault();

//     const formattedeventDate = moment(eventDate).toISOString();
//     onEventAdded({
//       eventType,
//       eventDate: formattedeventDate,
//     });
//     onClose();
//   };
//   return (
//     <Modal isOpen={isOpen} onRequestClose={onClose}>
//       <form onSubmit={onSubmit}>
//         <input
//           placeholder="Title"
//           value={eventType}
//           onChange={(e) => seteventType(e.target.value)}
//         />
//         <div>
//           <label>Pick a day</label>
//           <Datetime value={eventDate} onChange={(date) => seteventDate(date)} />
//         </div>
//         <button>Add Event</button>
//       </form>
//     </Modal>
//   );
// };

// export default AddEventModal;
import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import moment from "moment";

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
      <form onSubmit={onSubmit}>
        <input
          placeholder="Title"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        <div>
          <label>Pick a day</label>
          <Datetime value={eventDate} onChange={(date) => setEventDate(date)} />
        </div>
        <button>Add Event</button>
      </form>
    </Modal>
  );
};

export default AddEventModal;
