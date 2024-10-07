import React, { useState } from 'react';

function DroughtPage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <div className="embedded-map-container" style={{marginBottom: '70px'}}>
    
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
            backgroundColor: 'white',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '24px',
            color: '#333',
          }}
        >
          Loading...
        </div>
      )}

     
      <iframe
        src="/matplot-approach.html"
        onLoad={handleIframeLoad}
        className="embedded-map"
        title="Drought Map"
      />
    </div>
  );
}

export default DroughtPage;
