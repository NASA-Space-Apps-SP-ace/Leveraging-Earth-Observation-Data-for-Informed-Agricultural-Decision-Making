import React, { useState } from 'react';

function Map({src}) {
  const [loaded, setLoaded] = useState(false);


  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div>
      {!loaded && (
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
            color: '#333'
          }}
        >
          Loading...
        </div>
      )}
      <div className="embedded-map-container">
        <img src={src} onLoad={handleLoad}/>
      </div>
    </div>
  );
}

export default Map;
