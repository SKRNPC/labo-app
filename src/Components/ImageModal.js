// Modal.js
import React from "react";

const Modal = ({ image, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content">
        <img src={image} alt="Large Preview" style={{ width: "400%", height: "400%" }} />
      </div>
    </div>
  );
};

export default Modal;
