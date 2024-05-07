// ModalContent.js
import React from 'react';
import './ModalContent.css';

const ModalContent = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Job Description</h2>
        <h3>About Company</h3>
        <div
          className="modal-description"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <h3>About Role:</h3>
        <div
          className="modal-description"
          dangerouslySetInnerHTML={{ __html: content }}
        />
     
      </div>
      
    </div>
  );
};

export default ModalContent;
