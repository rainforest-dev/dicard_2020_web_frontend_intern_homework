import React, { useEffect } from 'react';
import { Box } from 'rebass';

const Modal = ({visible, component, onCancel}) => {
  useEffect(() => {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  })

  return visible && (
    <Box
      sx={{
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflowY: 'scroll'
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          height: '100vh',
          width: '100vw',
          backgroundColor: 'rgba(22, 22, 22, 0.9)',
          zIndex: -1
        }}
        onClick={onCancel}
      />
      {component}
    </Box>
  );
}

export default Modal;