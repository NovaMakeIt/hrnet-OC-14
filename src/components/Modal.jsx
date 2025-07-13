import React from 'react';
import ReactModal from 'react-modal';

// Pour l’accessibilité, on définit l’élément racine
if (typeof document !== 'undefined') {
  ReactModal.setAppElement('#root');
}

/**
 * Modal React basée sur react-modal
 * Props : isOpen (bool), onRequestClose (fn), children (node)
 */
export default function Modal({ isOpen, onRequestClose, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation"
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          maxWidth: 400,
          width: 'auto',
          height: 'auto',
          display: 'block',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          margin: 0,
          padding: '2rem',
          borderRadius: 8,
          textAlign: 'center',
          position: 'absolute',
        },
      }}
      shouldCloseOnOverlayClick
      ariaHideApp={true}
    >
      {children}
      <button onClick={onRequestClose} style={{marginTop:'1.5rem'}}>Close</button>
    </ReactModal>
  );
}
