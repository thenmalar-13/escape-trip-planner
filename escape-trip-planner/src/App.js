import React, { useState } from "react";

// Predefined rich dataset with destination-specific images and activities
const DESTINATION_DATABASE = {
  london: {
    name: "London, UK",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    description: "Experience royal heritage, world-class museums, and iconic landmarks along the Thames.",
    activities: [
      { id: 101, name: "Tower of London & Crown Jewels Tour", category: "Culture", cost: 45, day: "Day 1", image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=600&q=80" },
      { id: 102, name: "Traditional Afternoon Tea at Harrods", category: "Foodie", cost: 75, day: "Day 1", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80" },
      { id: 103, name: "London Eye & South Bank Sunset Walk", category: "Adventure", cost: 40, day: "Day 2", image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=600&q=80" },
      { id: 104, name: "British Museum Exploration", category: "Culture", cost: 0, day: "Day 2", image: "https://images.unsplash.com/photo-1565061828954-47d3d75249c5?auto=format&fit=crop&w=600&q=80" },
      { id: 105, name: "Borough Market Gourmet Food Tasting", category: "Foodie", cost: 30, day: "Day 3", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  goa: {
    name: "Goa, India",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    description: "Sun-kissed golden beaches, Portuguese colonial architecture, and vibrant beach shacks.",
    activities: [
      { id: 201, name: "Scuba Diving at Grande Island", category: "Adventure", cost: 80, day: "Day 1", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80" },
      { id: 202, name: "Authentic Goan Seafood Thali Feast", category: "Foodie", cost: 20, day: "Day 1", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80" },
      { id: 203, name: "Historic Fontainhas Latin Quarter Walk", category: "Culture", cost: 0, day: "Day 2", image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80" },
      { id: 204, name: "Sunset Chill at Palolem Beach", category: "Relaxation", cost: 15, day: "Day 2", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  paris: {
    name: "Paris, France",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    description: "The City of Light captivates with art, fashion, gastronomy, and iconic streetscapes.",
    activities: [
      { id: 301, name: "Eiffel Tower Summit Access & Cruise", category: "Adventure", cost: 65, day: "Day 1", image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=600&q=80" },
      { id: 302, name: "Louvre Museum Masterpieces Tour", category: "Culture", cost: 25, day: "Day 1", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80" },
      { id: 303, name: "Montmartre Artisan Pastry & Coffee Walk", category: "Foodie", cost: 35, day: "Day 2", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" }
    ]
  }
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState("london");
  const [budget, setBudget] = useState(1500);
  const [travelStyle, setTravelStyle] = useState("All");
  const [tripData, setTripData] = useState(DESTINATION_DATABASE["london"]);
  const [shortlist, setShortlist] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const key = searchTerm.toLowerCase().trim();
    if (DESTINATION_DATABASE[key]) {
      setTripData(DESTINATION_DATABASE[key]);
    } else {
      // Dynamic fallback for custom unlisted places so it never fails
      setTripData({
        name: searchTerm.toUpperCase(),
        heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
        description: `Custom curated adventure itinerary for ${searchTerm} tailored to your budget.`,
        activities: [
          { id: 991, name: `City Center Landmark & Museum Tour`, category: "Culture", cost: Math.round(budget * 0.15), day: "Day 1", image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80" },
          { id: 992, name: `Signature Local Food & Nightlife Experience`, category: "Foodie", cost: Math.round(budget * 0.2), day: "Day 1", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" },
          { id: 993, name: `Outdoor Scenic Trail & Sightseeing`, category: "Adventure", cost: Math.round(budget * 0.25), day: "Day 2", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80" }
        ]
      });
    }
    setShortlist([]);
  };

  const filteredActivities = travelStyle === "All"
    ? tripData.activities
    : tripData.activities.filter(item => item.category === travelStyle);

  const toggleShortlist = (item) => {
    if (shortlist.some(s => s.id === item.id)) {
      setShortlist(shortlist.filter(s => s.id !== item.id));
    } else {
      setShortlist([...shortlist, item]);
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Hero Header */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.mainTitle}>ESCAPE ✈️ Weekend Trip Planner</h1>
          <p style={styles.subtitle}>Discover immersive destinations, gorgeous visuals, and custom budgets instantly.</p>
          
          {/* Search Box */}
          <form onSubmit={handleSearch} style={styles.searchCard}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Destination (Try: London, Goa, Paris)</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.input}
                placeholder="e.g. London"
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Max Budget ($)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <button type="submit" style={styles.planBtn}>Explore Destination</button>
          </form>
        </div>
      </div>

      {/* Destination Showcase Banner */}
      <div style={styles.container}>
        <div style={styles.destinationBanner}>
          <img src={tripData.heroImage} alt={tripData.name} style={styles.bannerImg} />
          <div style={styles.bannerOverlay}>
            <h2 style={styles.bannerTitle}>{tripData.name}</h2>
            <p style={styles.bannerDesc}>{tripData.description}</p>
            <div style={styles.badgeRow}>
              <span style={styles.badge}>Max Budget: ${budget}</span>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div style={styles.filterBar}>
          {["All", "Culture", "Adventure", "Foodie", "Relaxation"].map(cat => (
            <button
              key={cat}
              style={travelStyle === cat ? { ...styles.filterBtn, ...styles.filterBtnActive } : styles.filterBtn}
              onClick={() => setTravelStyle(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Activity Cards Grid */}
        <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>Curated Attractions & Dining</h3>
        <div style={styles.grid}>
          {filteredActivities.map((item) => {
            const isSaved = shortlist.some(s => s.id === item.id);
            return (
              <div key={item.id} style={styles.card}>
                <div style={styles.cardImgContainer}>
                  <img src={item.image} alt={item.name} style={styles.cardImg} />
                  <span style={styles.tag}>{item.category}</span>
                </div>
                <div style={styles.cardBody}>
                  <span style={styles.dayLabel}>{item.day}</span>
                  <h4 style={styles.cardTitle}>{item.name}</h4>
                  <p style={styles.cardPrice}>Estimated Cost: <strong>${item.cost}</strong></p>
                  <button
                    style={isSaved ? { ...styles.actionBtn, ...styles.savedBtn } : styles.actionBtn}
                    onClick={() => toggleShortlist(item)}
                  >
                    {isSaved ? "★ Saved in Shortlist" : "☆ Add to Shortlist"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shortlist Summary Tray */}
        {shortlist.length > 0 && (
          <div style={styles.shortlistContainer}>
            <h3 style={{ marginTop: 0, color: "#0f172a" }}>🌟 Your Travel Shortlist ({shortlist.length})</h3>
            <div style={styles.shortlistGrid}>
              {shortlist.map(s => (
                <div key={s.id} style={styles.shortlistItem}>
                  <span>{s.name}</span>
                  <strong>${s.cost}</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Professional Styling Constants
const styles = {
  appContainer: { minHeight: "100vh", background: "#f1f5f9", fontFamily: "Inter, system-ui, sans-serif", paddingBottom: "4rem" },
  heroSection: { background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", color: "#fff", padding: "3rem 1rem 4rem 1rem", textAlign: "center" },
  heroContent: { maxWidth: "800px", margin: "0 auto" },
  mainTitle: { fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.5rem", letterSpacing: "-0.025em" },
  subtitle: { fontSize: "1.1rem", color: "#c7d2fe", marginBottom: "2rem" },
  searchCard: { background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", padding: "1.5rem", borderRadius: "16px", display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "1rem", alignItems: "end", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)" },
  inputGroup: { display: "flex", flexDirection: "column", textAlign: "left", gap: "0.3rem" },
  label: { fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase" },
  input: { padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "1rem", outline: "none" },
  planBtn: { background: "#4f46e5", color: "#fff", padding: "0.8rem 1.5rem", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", height: "45px" },
  container: { maxWidth: "1000px", margin: "-2rem auto 0 auto", padding: "0 1rem" },
  destinationBanner: { position: "relative", borderRadius: "20px", overflow: "hidden", height: "320px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", marginBottom: "2rem" },
  bannerImg: { width: "100%", height: "100%", objectFit: "cover" },
  bannerOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", padding: "2rem", color: "#fff", textAlign: "left" },
  bannerTitle: { fontSize: "2.2rem", fontWeight: "700", margin: "0 0 0.4rem 0" },
  bannerDesc: { fontSize: "1rem", color: "#e2e8f0", maxWidth: "600px", margin: "0 0 1rem 0" },
  badgeRow: { display: "flex", gap: "0.5rem" },
  badge: { background: "rgba(255,255,255,0.2)", backdropFilter: "blur(5px)", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "600" },
  filterBar: { display: "flex", gap: "0.5rem", marginBottom: "2rem", overflowX: "auto", paddingBottom: "0.5rem" },
  filterBtn: { padding: "0.5rem 1.2rem", border: "1px solid #cbd5e1", background: "#fff", borderRadius: "20px", cursor: "pointer", fontWeight: "500", color: "#475569" },
  filterBtnActive: { background: "#4f46e5", color: "#fff", borderColor: "#4f46e5" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" },
  card: { background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  cardImgContainer: { position: "relative", height: "180px" },
  cardImg: { width: "100%", height: "100%", objectFit: "cover" },
  tag: { position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "600" },
  cardBody: { padding: "1.2rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", textAlign: "left" },
  dayLabel: { fontSize: "0.75rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase" },
  cardTitle: { fontSize: "1.1rem", color: "#1e293b", margin: "0.4rem 0 0.8rem 0" },
  cardPrice: { fontSize: "0.9rem", color: "#475569", marginBottom: "1rem" },
  actionBtn: { background: "#f8fafc", border: "1px solid #cbd5e1", padding: "0.6rem", borderRadius: "8px", fontWeight: "600", cursor: "pointer", color: "#334155", textAlign: "center" },
  savedBtn: { background: "#fef9c3", borderColor: "#facc15", color: "#854d0e" },
  shortlistContainer: { marginTop: "3rem", background: "#fff", padding: "1.5rem", borderRadius: "16px", border: "1px solid #cbd5e1", textAlign: "left" },
  shortlistGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1rem" },
  shortlistItem: { background: "#f8fafc", padding: "0.8rem 1rem", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }
};