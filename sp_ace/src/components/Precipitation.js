import React, { useState } from 'react';

function Precip() {
  const [iframeLoaded, setIframeLoaded] = useState(false);


  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', marginTop: '60px' }}>
     
      {!iframeLoaded && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColors: 'white',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '24px',
            color: '#333',
          }}
        >
          Loading...
        </div>
      )}

     
      <iframe
        src="/precipitation.html"
        onLoad={handleIframeLoad}
        className="embedded-map"
        title="Drought Map"
      />
    </div>
  );
}

export default Precip;
