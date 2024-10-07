import React from 'react';
import './WorksCited.css'; 

function WorkCited() {
  const sources = [
    {
      title: 'NASA Earth Data',
      description: 'Earth Observation Data and Agriculture',
      link: 'https://earthdata.nasa.gov',
    },
    {
      title: 'National Drought Mitigation Center',
      description: 'U.S. Drought Monitor Data',
      link: 'https://droughtmonitor.unl.edu',
    },
    {
      title: 'NASA',
      description: 'Moderate Resolution Imaging Spectroradiometer (MODIS)',
      link: 'https://modis.gsfc.nasa.gov',
    },
    {
      title: 'USDA',
      description: 'Drought Monitoring and Water Resources',
      link: 'https://www.usda.gov',
    },
    {
      title: 'NASA Acres Consortium',
      description: 'Applying satellite EO information to agriculture',
      link: 'https://www.nasa.gov/nasa-acres',
    },
    {
      title: 'OpenET',
      description: 'OpenET Study on Water Management',
      link: 'https://openetdata.org',
    }
  ];

  return (
    <div className="contact-page">
      <h1 className="page-header">Resources</h1>
      <div className="source-cards">
        {sources.map((source, index) => (
          <div key={index} className="source-card">
            <h3>{source.title}</h3>
            <p>{source.description}</p>
            <a href={source.link} target="_blank" rel="noopener noreferrer">
              View Source
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkCited;
