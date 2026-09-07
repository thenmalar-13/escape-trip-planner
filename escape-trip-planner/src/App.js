import React, { useState } from "react";

export default function App() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [travelStyle, setTravelStyle] = useState("Adventure");
  const [tripData, setTripData] = useState(null);
  const [shortlist, setShortlist] = useState([]);
  const [filter, setFilter] = useState("All");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination || !budget) return;
    setTripData({ destination, budget: Number(budget), travelStyle });
    setShortlist([]);
  };

  const activities = tripData ? [
    { id: 1, name: `Explore Historic Old Town ${tripData.destination}`, category: "Culture", cost: Math.round(tripData.budget * 0.15), day: "Day 1" },
    { id: 2, name: `${tripData.travelStyle} Experience at Scenic Viewpoint`, category: "Adventure", cost: Math.round(tripData.budget * 0.3), day: "Day 1" },
    { id: 3, name: `Famous Local Culinary Food Tour`, category: "Foodie", cost: Math.round(tripData.budget * 0.2), day: "Day 2" },
    { id: 4, name: `Relaxation & Leisure at City Center Park`, category: "Relaxation", cost: Math.round(tripData.budget * 0.1), day: "Day 2" },
    { id: 5, name: `Sunset Waterfront Walking Tour`, category: "Adventure", cost: 0, day: "Day 2" }
  ] : [];

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
    <div style={styles.appContainer}>
      <div style={styles.heroOverlay}>
        <h1 style={styles.mainTitle}>ESCAPE — Weekend Trip Planner</h1>
        <p style={styles.subtitle}>Design your custom getaway with dynamic budget distribution & instant discovery.</p>

        {/* Search Card */}
        <div style={styles.searchCard}>
          <form onSubmit={handleSubmit} style={styles.searchForm}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Destination</label>
              <input
                type="text"
                placeholder="e.g., Kyoto, Goa, Paris..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Max Budget ($)</label>
              <input
                type="number"
                placeholder="e.g., 600"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Travel Vibe</label>
              <select 
                value={travelStyle} 
                onChange={(e) => setTravelStyle(e.target.value)}
                style={styles.input}
              >
                <option value="Adventure">Adventure & Outdoors</option>
                <option value="Relaxation">Relaxation & Spa</option>
                <option value="Culture">Culture & History</option>
                <option value="Foodie">Food & Nightlife</option>
              </select>
            </div>
            <button type="submit" style={styles.planBtn}>Generate Trip Blueprint</button>
          </form>
        </div>

        {/* Dynamic Itinerary Section */}
        {tripData && (
          <div style={styles.itinerarySection}>
            <div style={styles.tripHeader}>
              <h2 style={{ margin: 0, color: "#0f172a" }}>Itinerary for {tripData.destination}</h2>
              <div style={styles.badgeRow}>
                <span style={styles.badge}>Budget: ${tripData.budget}</span>
                <span style={{ ...styles.badge, background: "#fae8ff", color: "#86198f" }}>Vibe: {tripData.travelStyle}</span>
              </div>
            </div>

            <div style={styles.filterBar}>
              {["All", "Culture", "Adventure", "Foodie", "Relaxation"].map(cat => (
                <button
                  key={cat}
                  style={filter === cat ? { ...styles.filterBtn, ...styles.filterBtnActive } : styles.filterBtn}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={styles.activitiesGrid}>
              {filteredActivities.map((item) => {
                const isSaved = shortlist.some(s => s.id === item.id);
                return (
                  <div key={item.id} style={styles.activityCard}>
                    <span style={styles.dayTag}>{item.day} • {item.category}</span>
                    <h3 style={styles.activityTitle}>{item.name}</h3>
                    <p style={styles.activityCost}>Est. Cost: <strong>${item.cost}</strong></p>
                    <button
                      style={isSaved ? { ...styles.shortlistBtn, ...styles.shortlistSaved } : styles.shortlistBtn}
                      onClick={() => toggleShortlist(item)}
                    >
                      {isSaved ? "★ Saved in Shortlist" : "☆ Add to Shortlist"}
                    </button>
                  </div>
                );
              })}
            </div>

            {shortlist.length > 0 && (
              <div style={styles.shortlistSummary}>
                <h3 style={{ marginTop: 0, color: "#1e293b" }}>Your Saved Shortlist ({shortlist.length} items)</h3>
                <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "#475569" }}>
                  {shortlist.map(s => (
                    <li key={s.id} style={{ marginBottom: "0.4rem" }}>{s.name} — <strong>${s.cost}</strong></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Inline Professional Styles
const styles = {
  appContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: "2rem 1rem",
    color: "#334155"
  },
  heroOverlay: { maxWidth: "900px", margin: "0 auto", textAlign: "center" },
  mainTitle: { fontSize: "2.5rem", color: "#0f172a", marginBottom: "0.5rem", fontWeight: "800", letterSpacing: "-0.025em" },
  subtitle: { fontSize: "1.05rem", color: "#64748b", marginBottom: "2rem" },
  searchCard: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(12px)",
    padding: "2.5rem",
    borderRadius: "20px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
    textAlign: "left",
    border: "1px solid rgba(255, 255, 255, 0.8)"
  },
  searchForm: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.2rem", alignItems: "end" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  label: { fontSize: "0.85rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" },
  input: { padding: "0.85rem 1rem", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "1rem", background: "#fff", outline: "none" },
  planBtn: {
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    color: "white",
    padding: "0.9rem 1.5rem",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
    transition: "transform 0.1s"
  },
  itinerarySection: { marginTop: "3rem", textAlign: "left" },
  tripHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" },
  badgeRow: { display: "flex", gap: "0.5rem" },
  badge: { background: "#e0e7ff", color: "#3730a3", padding: "0.4rem 0.9rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700" },
  filterBar: { display: "flex", gap: "0.5rem", marginBottom: "1.5rem", overflowX: "auto", paddingBottom: "0.5rem" },
  filterBtn: { padding: "0.5rem 1.2rem", border: "1px solid #cbd5e1", background: "#fff", borderRadius: "20px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500", color: "#475569" },
  filterBtnActive: { background: "#4f46e5", color: "#fff", borderColor: "#4f46e5" },
  activitiesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" },
  activityCard: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderTop: "4px solid #4f46e5",
    border: "1px solid #e2e8f0"
  },
  dayTag: { fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#64748b", marginBottom: "0.5rem" },
  activityTitle: { fontSize: "1.1rem", color: "#1e293b", margin: "0 0 0.75rem 0" },
  activityCost: { fontSize: "0.9rem", color: "#475569", marginBottom: "1.2rem" },
  shortlistBtn: { background: "#f8fafc", border: "1px solid #cbd5e1", padding: "0.6rem", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#334155", textAlign: "center" },
  shortlistSaved: { background: "#fef9c3", borderColor: "#facc15", color: "#854d0e" },
  shortlistSummary: { marginTop: "2rem", background: "#fff", padding: "1.5rem", borderRadius: "16px", border: "1px solid #cbd5e1", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }
};