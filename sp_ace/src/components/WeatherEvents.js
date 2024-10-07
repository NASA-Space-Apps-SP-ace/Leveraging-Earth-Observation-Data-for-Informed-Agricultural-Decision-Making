import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './WeatherEvents.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
});

const WeatherEvents = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('all'); 
  const [loading, setLoading] = useState(true);
  const [startMonth, setStartMonth] = useState(new Date()); 

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      const today = new Date();
      const selectedMonth = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1);
      const diffTime = Math.abs(today - selectedMonth);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      let url = `https://eonet.gsfc.nasa.gov/api/v2.1/events?status=open&days=${diffDays}`;

      if (category !== 'all') {
        url = `https://eonet.gsfc.nasa.gov/api/v2.1/categories/${category}?status=open&days=${diffDays}`;
      }

      try {
        const response = await axios.get(url);
        const sortedEvents = response.data.events.sort((a, b) => new Date(b.geometries[0].date) - new Date(a.geometries[0].date)); // Sort by most recent first
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category, startMonth]);

  const filterEventsByMonth = () => {
    const selectedMonth = startMonth.getMonth();
    const selectedYear = startMonth.getFullYear();

    return events.filter(event => {
      const eventDate = new Date(event.geometries[0].date); 
      return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear; 
    });
  };

  const filteredEvents = filterEventsByMonth();

  return (
    <div className="weather-events-page">
      <h2 className="weather-events-page__title">Current Weather Events</h2>

      <div className="weather-events-page__filter-container">
     
        <label htmlFor="category-select" className="weather-events-page__filter-label">Filter by Category: </label>
        <select
          id="category-select"
          className="weather-events-page__filter-select"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="all">All Categories</option>
          <option value="8">Wildfires</option>
          <option value="10">Severe Storms</option>
        </select>

      
        <label htmlFor="month-select" className="weather-events-page__filter-label">Select Month: </label>
        <DatePicker
          id="month-select"
          className="weather-events-page__filter-datepicker"
          selected={startMonth}
          onChange={(date) => setStartMonth(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>

  
      <MapContainer className="weather-events-page__map" center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%', margin: '20px 0' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {!loading &&
          filteredEvents.map(event => (
            event.geometries.map(geo => (
              <Marker key={geo.date} position={[geo.coordinates[1], geo.coordinates[0]]}>
                <Popup>
                  <h3>{event.title}</h3>
                  <p>{event.description || 'No description available'}</p>
                  <p><strong>Date:</strong> {new Date(geo.date).toLocaleDateString()}</p>
                  <a href={event.link} target="_blank" rel="noopener noreferrer" className="weather-events-page__link">More Info</a>
                </Popup>
              </Marker>
            ))
          ))
        }
      </MapContainer>

  
      {loading ? (
        <div className="weather-events-page__loading-screen">Loading Events...</div>
      ) : (
        <ul className="weather-events-page__list">
          {filteredEvents.length > 0 ? filteredEvents.map(event => (
            <li key={event.id} className="weather-events-page__list-item">
              <h3>{event.title}</h3>
              <p>{event.description || 'No description available'}</p>
              <p><strong>Date:</strong> {new Date(event.geometries[0].date).toLocaleDateString()}</p>
              <p>Category: {event.categories.map(c => c.title).join(', ')}</p>
              <a href={event.link} target="_blank" rel="noopener noreferrer" className="weather-events-page__link">More Info</a>
            </li>
          )) : <p>No active events found for the selected month.</p>}
        </ul>
      )}
    </div>
  );
};

export default WeatherEvents;
