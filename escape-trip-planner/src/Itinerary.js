import React, { useState } from "react";
import "./Itinerary.css";

export default function Itinerary({ tripData }) {
  const [shortlist, setShortlist] = useState([]);
  const [filter, setFilter] = useState("All");

  if (!tripData) {
    return (
      <div className="empty-state">
        <p>Enter your destination and budget above to dynamically generate your custom trip details.</p>
      </div>
    );
  }

  const { destination, budget, travelStyle } = tripData;

  // Dynamic generation logic without static datasets
  const activities = [
    { id: 1, name: `Explore Historic Old Town ${destination}`, category: "Culture", cost: Math.round(budget * 0.15), day: "Day 1" },
    { id: 2, name: `${travelStyle} Experience at Scenic Viewpoint`, category: "Adventure", cost: Math.round(budget * 0.3), day: "Day 1" },
    { id: 3, name: `Famous Local Culinary Food Tour`, category: "Foodie", cost: Math.round(budget * 0.2), day: "Day 2" },
    { id: 4, name: `Relaxation & Leisure at City Center Park`, category: "Relaxation", cost: Math.round(budget * 0.1), day: "Day 2" },
    { id: 5, name: `Sunset Waterfront Walking Tour`, category: "Adventure", cost: 0, day: "Day 2" }
  ];

  const filteredActivities = filter === "All" 
    ? activities 
    : activities.filter(item => item.category === filter);

  const toggleShortlist = (item) => {
    if (shortlist.some(s => s.id === item.id)) {
      setShortlist(shortlist.filter(s => s.id !== item.id));
    } else {
      setShortlist([...shortlist, item]);
    }
  };

  return (
    <div className="itinerary-container">
      <div className="trip-header">
        <h2>Trip Blueprint: {destination}</h2>
        <span className="badge">Max Budget: ${budget}</span>
        <span className="badge vibe">Vibe: {travelStyle}</span>
      </div>

      <div className="filter-bar">
        {["All", "Culture", "Adventure", "Foodie", "Relaxation"].map(cat => (
          <button 
            key={cat} 
            className={filter === cat ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="activities-grid">
        {filteredActivities.map((item) => {
          const isSaved = shortlist.some(s => s.id === item.id);
          return (
            <div key={item.id} className="activity-card">
              <span className="day-tag">{item.day}</span>
              <h3>{item.name}</h3>
              <p>Estimated Cost: <strong>${item.cost}</strong></p>
              <button 
                className={isSaved ? "shortlist-btn saved" : "shortlist-btn"}
                onClick={() => toggleShortlist(item)}
              >
                {isSaved ? "★ Saved to Shortlist" : "☆ Add to Shortlist"}
              </button>
            </div>
          );
        })}
      </div>

      {shortlist.length > 0 && (
        <div className="shortlist-summary">
          <h3>Your Saved Shortlist ({shortlist.length} items)</h3>
          <ul>
            {shortlist.map(s => (
              <li key={s.id}>{s.name} — ${s.cost}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}