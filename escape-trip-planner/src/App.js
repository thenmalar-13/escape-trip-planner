import React, { useState } from "react";

// Expanded database of 35 famous global destinations with rich imagery and curated activities
const DESTINATION_DATABASE = {
  "london": {
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
  "goa": {
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
  "paris": {
    name: "Paris, France",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    description: "The City of Light captivates with art, fashion, gastronomy, and iconic streetscapes.",
    activities: [
      { id: 301, name: "Eiffel Tower Summit Access & Cruise", category: "Adventure", cost: 65, day: "Day 1", image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=600&q=80" },
      { id: 302, name: "Louvre Museum Masterpieces Tour", category: "Culture", cost: 25, day: "Day 1", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80" },
      { id: 303, name: "Montmartre Artisan Pastry & Coffee Walk", category: "Foodie", cost: 35, day: "Day 2", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "kyoto": {
    name: "Kyoto, Japan",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    description: "Ancient temples, traditional wooden machiya houses, and serene bamboo forests.",
    activities: [
      { id: 401, name: "Arashiyama Bamboo Grove & Monkey Park", category: "Adventure", cost: 15, day: "Day 1", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80" },
      { id: 402, name: "Traditional Kaiseki Multi-Course Dinner", category: "Foodie", cost: 90, day: "Day 1", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80" },
      { id: 403, name: "Fushimi Inari Shrine Thousand Torii Gates", category: "Culture", cost: 0, day: "Day 2", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "new york city": {
    name: "New York City, USA",
    heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
    description: "The city that never sleeps offers soaring skyscrapers, Broadway shows, and diverse cuisine.",
    activities: [
      { id: 501, name: "Central Park Pedicab & Bethesda Fountain Tour", category: "Relaxation", cost: 40, day: "Day 1", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=600&q=80" },
      { id: 502, name: "Classic NYC Pizza & Street Food Crawl", category: "Foodie", cost: 35, day: "Day 1", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80" },
      { id: 503, name: "Empire State Building & Times Square Night Walk", category: "Adventure", cost: 50, day: "Day 2", image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "rome": {
    name: "Rome, Italy",
    heroImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    description: "A living museum filled with ancient ruins, Renaissance art, and romantic trattorias.",
    activities: [
      { id: 601, name: "Colosseum & Roman Forum Guided Tour", category: "Culture", cost: 45, day: "Day 1", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80" },
      { id: 602, name: "Authentic Pasta & Gelato Making Masterclass", category: "Foodie", cost: 65, day: "Day 1", image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=600&q=80" },
      { id: 603, name: "Vatican Museums & Sistine Chapel Visit", category: "Culture", cost: 40, day: "Day 2", image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "bali": {
    name: "Bali, Indonesia",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    description: "Tropical paradise known for forested volcanic mountains, iconic rice paddies, and beaches.",
    activities: [
      { id: 701, name: "Ubud Monkey Forest & Rice Terrace Trek", category: "Adventure", cost: 20, day: "Day 1", image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80" },
      { id: 702, name: "Traditional Balinese Seaside Seafood Dinner", category: "Foodie", cost: 30, day: "Day 1", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80" },
      { id: 703, name: "Luxury Spa & Flower Bath Relaxation", category: "Relaxation", cost: 50, day: "Day 2", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "tokyo": {
    name: "Tokyo, Japan",
    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    description: "A bustling metropolis blending ultra-modern neon skyscrapers with historic temples.",
    activities: [
      { id: 801, name: "Shibuya Crossing & Akihabara Tech Tour", category: "Adventure", cost: 25, day: "Day 1", image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80" },
      { id: 802, name: "Authentic Tsukiji Outer Market Sushi Tour", category: "Foodie", cost: 60, day: "Day 1", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80" },
      { id: 803, name: "Senso-ji Temple & Asakusa Historic Walk", category: "Culture", cost: 0, day: "Day 2", image: "https://images.unsplash.com/photo-1590559899731-a3c898b2cd01?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "dubai": {
    name: "Dubai, UAE",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    description: "Luxury shopping, ultramodern architecture, and lively nightlife centered around desert dunes.",
    activities: [
      { id: 901, name: "Burj Khalifa At The Top & Fountain Show", category: "Adventure", cost: 50, day: "Day 1", image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=600&q=80" },
      { id: 902, name: "Desert Safari, Quad Biking & BBQ Dinner", category: "Adventure", cost: 75, day: "Day 1", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" },
      { id: 903, name: "Dubai Spice & Gold Souk Heritage Walk", category: "Culture", cost: 10, day: "Day 2", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "barcelona": {
    name: "Barcelona, Spain",
    heroImage: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80",
    description: "Mediterranean beach city renowned for Antoni Gaudí’s surreal architectural masterpieces.",
    activities: [
      { id: 1001, name: "Sagrada Família & Park Güell Tour", category: "Culture", cost: 40, day: "Day 1", image: "https://images.unsplash.com/photo-1583532450593-470fc4fbfbc9?auto=format&fit=crop&w=600&q=80" },
      { id: 1002, name: "Tapas Tasting & Gothic Quarter Walk", category: "Foodie", cost: 45, day: "Day 1", image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80" },
      { id: 1003, name: "Barceloneta Beach Sunset Relaxation", category: "Relaxation", cost: 0, day: "Day 2", image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "sydney": {
    name: "Sydney, Australia",
    heroImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    description: "Famous for its waterfront Sydney Opera House, grand harbour bridge, and golden surf beaches.",
    activities: [
      { id: 1101, name: "Sydney Opera House Guided Tour & Harbour Cruise", category: "Culture", cost: 55, day: "Day 1", image: "https://images.unsplash.com/photo-1523428096881-5f893f926a02?auto=format&fit=crop&w=600&q=80" },
      { id: 1102, name: "Bondi to Coogee Coastal Walk & Lunch", category: "Adventure", cost: 25, day: "Day 1", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80" },
      { id: 1103, name: "Taronga Zoo Wildlife & Harbor Views", category: "Relaxation", cost: 45, day: "Day 2", image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "amsterdam": {
    name: "Amsterdam, Netherlands",
    heroImage: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80",
    description: "Artistic heritage, elaborate canal systems, and narrow canal houses with gabled facades.",
    activities: [
      { id: 1201, name: "Historic Canal Ring Evening Cruise", category: "Relaxation", cost: 25, day: "Day 1", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=600&q=80" },
      { id: 1202, name: "Van Gogh Museum & Rijksmuseum Tour", category: "Culture", cost: 35, day: "Day 1", image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=600&q=80" },
      { id: 1203, name: "Dutch Cheese & Stroopwafel Tasting Walk", category: "Foodie", cost: 20, day: "Day 2", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "singapore": {
    name: "Singapore",
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    description: "Vibrant global financial hub featuring futuristic architecture and incredible hawker food.",
    activities: [
      { id: 1301, name: "Gardens by the Bay & Supertree Light Show", category: "Adventure", cost: 30, day: "Day 1", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80" },
      { id: 1302, name: "Maxwell Hawker Centre Street Food Feast", category: "Foodie", cost: 15, day: "Day 1", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" },
      { id: 1303, name: "Sentosa Island Cable Car & Beach Day", category: "Relaxation", cost: 40, day: "Day 2", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "bangkok": {
    name: "Bangkok, Thailand",
    heroImage: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
    description: "Ornate shrines, vibrant street life, and ornate Buddhist temples alongside mega-malls.",
    activities: [
      { id: 1401, name: "Grand Palace & Wat Arun Temple Tour", category: "Culture", cost: 25, day: "Day 1", image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=600&q=80" },
      { id: 1402, name: "Chao Phraya River Dinner Cruise", category: "Foodie", cost: 45, day: "Day 1", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" },
      { id: 1403, name: "Authentic Thai Massage & Wellness Session", category: "Relaxation", cost: 20, day: "Day 2", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "venice": {
    name: "Venice, Italy",
    heroImage: "https://images.unsplash.com/photo-1514896856005-9728445d5da1?auto=format&fit=crop&w=1200&q=80",
    description: "Built on more than 100 small islands in a lagoon in the Adriatic Sea with no roads, just canals.",
    activities: [
      { id: 1501, name: "Classic Grand Canal Gondola Ride", category: "Adventure", cost: 80, day: "Day 1", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=80" },
      { id: 1502, name: "St. Mark's Basilica & Doge's Palace Tour", category: "Culture", cost: 35, day: "Day 1", image: "https://images.unsplash.com/photo-1514896856005-9728445d5da1?auto=format&fit=crop&w=600&q=80" },
      { id: 1503, name: "Venetian Cicchetti & Wine Bar Crawl", category: "Foodie", cost: 30, day: "Day 2", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "prague": {
    name: "Prague, Czech Republic",
    heroImage: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
    description: "Nicknamed 'the City of a Hundred Spires', famous for its Old Town Square and Gothic churches.",
    activities: [
      { id: 1601, name: "Prague Castle & Charles Bridge Walking Tour", category: "Culture", cost: 20, day: "Day 1", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80" },
      { id: 1602, name: "Traditional Czech Feast & Local Beer Tasting", category: "Foodie", cost: 25, day: "Day 1", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "vienna": {
    name: "Vienna, Austria",
    heroImage: "https://images.unsplash.com/photo-1516550893823-d0ac0f74e636?auto=format&fit=crop&w=1200&q=80",
    description: "Austria's capital famed for its intellectual and artistic legacy shaped by Mozart and Beethoven.",
    activities: [
      { id: 1701, name: "Schönbrunn Palace & Imperial Gardens Tour", category: "Culture", cost: 30, day: "Day 1", image: "https://images.unsplash.com/photo-1516550893823-d0ac0f74e636?auto=format&fit=crop&w=600&q=80" },
      { id: 1702, name: "Viennese Coffee House & Sacher-Torte Experience", category: "Foodie", cost: 20, day: "Day 2", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "budapest": {
    name: "Budapest, Hungary",
    heroImage: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80",
    description: "Splits by the River Danube, famous for 19th-century Chain Bridge and thermal spa culture.",
    activities: [
      { id: 1801, name: "Széchenyi Thermal Baths Relaxation Day", category: "Relaxation", cost: 30, day: "Day 1", image: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=600&q=80" },
      { id: 1802, name: "Hungarian Parliament & Danube Evening Cruise", category: "Culture", cost: 25, day: "Day 2", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "cairo": {
    name: "Cairo, Egypt",
    heroImage: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=80",
    description: "Set on the Nile River, sprawling city featuring the Giza Pyramids and ancient artifacts.",
    activities: [
      { id: 1901, name: "Giza Pyramids & Sphinx Camel Adventure", category: "Adventure", cost: 45, day: "Day 1", image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=600&q=80" },
      { id: 1902, name: "Khan el-Khalili Bazaar & Egyptian Food Tour", category: "Foodie", cost: 20, day: "Day 2", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "cape town": {
    name: "Cape Town, South Africa",
    heroImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80",
    description: "A port city on South Africa’s southwest coast, overseen by the flat-topped Table Mountain.",
    activities: [
      { id: 2001, name: "Table Mountain Cableway & Hike", category: "Adventure", cost: 35, day: "Day 1", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80" },
      { id: 2002, name: "V&A Waterfront Seafood & Wine Tasting", category: "Foodie", cost: 40, day: "Day 2", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "istanbul": {
    name: "Istanbul, Turkey",
    heroImage: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80",
    description: "Straddles Europe and Asia across the Bosphorus Strait, featuring magnificent Byzantine structures.",
    activities: [
      { id: 2101, name: "Hagia Sophia & Blue Mosque Guided Tour", category: "Culture", cost: 25, day: "Day 1", image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80" },
      { id: 2102, name: "Grand Bazaar & Traditional Turkish Kebab Feast", category: "Foodie", cost: 30, day: "Day 2", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "athens": {
    name: "Athens, Greece",
    heroImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    description: "The historical capital of Europe, dominated by 5th-century BC landmarks like the Acropolis.",
    activities: [
      { id: 2201, name: "Acropolis & Parthenon Archaeological Tour", category: "Culture", cost: 35, day: "Day 1", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80" },
      { id: 2202, name: "Plaka Neighborhood Greek Taverna Dinner", category: "Foodie", cost: 25, day: "Day 2", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "reykjavik": {
    name: "Reykjavik, Iceland",
    heroImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80",
    description: "Capital of Iceland, known for stunning nearby glaciers, geysers, and the Blue Lagoon.",
    activities: [
      { id: 2301, name: "Golden Circle & Waterfall Adventure Tour", category: "Adventure", cost: 70, day: "Day 1", image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=600&q=80" },
      { id: 2302, name: "Blue Lagoon Geothermal Spa Relaxation", category: "Relaxation", cost: 85, day: "Day 2", image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "zurich": {
    name: "Zurich, Switzerland",
    heroImage: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1200&q=80",
    description: "Global center for banking and finance, featuring picturesque lanes of the Altstadt (Old Town).",
    activities: [
      { id: 2401, name: "Lake Zurich Scenic Boat Cruise", category: "Relaxation", cost: 30, day: "Day 1", image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=600&q=80" },
      { id: 2402, name: "Swiss Chocolate Factory & Tasting Tour", category: "Foodie", cost: 45, day: "Day 2", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "edinburgh": {
    name: "Edinburgh, Scotland",
    heroImage: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80",
    description: "Scotland's compact, hilly capital featuring a medieval Old Town and elegant Georgian New Town.",
    activities: [
      { id: 2501, name: "Edinburgh Castle & Royal Mile Exploration", category: "Culture", cost: 35, day: "Day 1", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80" },
      { id: 2502, name: "Scottish Whisky Tasting & Pub Dinner", category: "Foodie", cost: 40, day: "Day 2", image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "lisbon": {
    name: "Lisbon, Portugal",
    heroImage: "https://images.unsplash.com/photo-1513603131710-826b5275573d?auto=format&fit=crop&w=1200&q=80",
    description: "Coastal, hilly capital city of Portugal known for pastel-colored buildings and historic trams.",
    activities: [
      { id: 2601, name: "Historic Tram 28 & Alfama District Walk", category: "Culture", cost: 15, day: "Day 1", image: "https://images.unsplash.com/photo-1513603131710-826b5275573d?auto=format&fit=crop&w=600&q=80" },
      { id: 2602, name: "Pastéis de Belém Tasting & Seafood Lunch", category: "Foodie", cost: 20, day: "Day 2", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "florence": {
    name: "Florence, Italy",
    heroImage: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1200&q=80",
    description: "Birthplace of the Renaissance, packed with masterpieces of art and architecture like the Duomo.",
    activities: [
      { id: 2701, name: "Uffizi Gallery & Duomo Rooftop Climb", category: "Culture", cost: 40, day: "Day 1", image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=600&q=80" },
      { id: 2702, name: "Tuscan Steak & Chianti Wine Experience", category: "Foodie", cost: 55, day: "Day 2", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "marrakech": {
    name: "Marrakech, Morocco",
    heroImage: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80",
    description: "Major economic center and home to mosques, palaces, gardens, and bustling souks.",
    activities: [
      { id: 2801, name: "Jemaa el-Fnaa Square & Souk Food Tour", category: "Foodie", cost: 25, day: "Day 1", image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80" },
      { id: 2802, name: "Majorelle Garden & Bahia Palace Visit", category: "Culture", cost: 20, day: "Day 2", image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "buenos aires": {
    name: "Buenos Aires, Argentina",
    heroImage: "https://images.unsplash.com/photo-1612294037637-ec32373d533e?auto=format&fit=crop&w=1200&q=80",
    description: "Argentina’s cosmopolitan capital known for passionate tango dancing and colorful La Boca streets.",
    activities: [
      { id: 2901, name: "La Boca & San Telmo Historic Tango Walk", category: "Culture", cost: 20, day: "Day 1", image: "https://images.unsplash.com/photo-1612294037637-ec32373d533e?auto=format&fit=crop&w=600&q=80" },
      { id: 2902, name: "Traditional Argentine Asado Steakhouse Dinner", category: "Foodie", cost: 45, day: "Day 2", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "rio de janeiro": {
    name: "Rio de Janeiro, Brazil",
    heroImage: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
    description: "Huge seaside city in Brazil, famed for its Copacabana and Ipanema beaches and Christ the Redeemer.",
    activities: [
      { id: 3001, name: "Christ the Redeemer & Sugarloaf Mountain Tour", category: "Adventure", cost: 40, day: "Day 1", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80" },
      { id: 3002, name: "Copacabana Beach & Brazilian BBQ Feast", category: "Foodie", cost: 35, day: "Day 2", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "vancouver": {
    name: "Vancouver, Canada",
    heroImage: "https://images.unsplash.com/photo-1559511260-66a1da46fb9e?auto=format&fit=crop&w=1200&q=80",
    description: "Bustling seaport in western Canada, surrounded by mountains, popular as a filming location.",
    activities: [
      { id: 3101, name: "Stanley Park Seawall & Suspension Bridge", category: "Adventure", cost: 35, day: "Day 1", image: "https://images.unsplash.com/photo-1559511260-66a1da46fb9e?auto=format&fit=crop&w=600&q=80" },
      { id: 3102, name: "Granville Island Public Market Food Tour", category: "Foodie", cost: 30, day: "Day 2", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "honolulu": {
    name: "Honolulu, Hawaii",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description: "Hawaii's capital, gateway to the US island chain, featuring iconic Waikiki Beach.",
    activities: [
      { id: 3201, name: "Waikiki Beach Surf Lesson & Snorkeling", category: "Adventure", cost: 60, day: "Day 1", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" },
      { id: 3202, name: "Diamond Head Crater Hike & Poke Bowls", category: "Foodie", cost: 25, day: "Day 2", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "seoul": {
    name: "Seoul, South Korea",
    heroImage: "https://images.unsplash.com/photo-1538485399081-06af2b732315?auto=format&fit=crop&w=1200&q=80",
    description: "Sprawling South Korean metropolis where hyper-modern skyscrapers meet Buddhist temples.",
    activities: [
      { id: 3301, name: "Gyeongbokgung Palace & Hanok Village Tour", category: "Culture", cost: 20, day: "Day 1", image: "https://images.unsplash.com/photo-1538485399081-06af2b732315?auto=format&fit=crop&w=600&q=80" },
      { id: 3302, name: "Myeongdong Street Food & Night Market Tour", category: "Foodie", cost: 25, day: "Day 1", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "mumbai": {
    name: "Mumbai, India",
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    description: "Financial powerhouse of India featuring colonial heritage architecture and Bollywood culture.",
    activities: [
      { id: 3401, name: "Gateway of India & Elephanta Caves Boat Tour", category: "Culture", cost: 20, day: "Day 1", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80" },
      { id: 3402, name: "Chowpatty Beach Street Food & Chaat Crawl", category: "Foodie", cost: 15, day: "Day 2", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  "jaipur": {
    name: "Jaipur, India",
    heroImage: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
    description: "Rajasthan’s iconic 'Pink City' featuring majestic forts, royal palaces, and bustling bazaars.",
    activities: [
      { id: 3501, name: "Amber Fort & Hawa Mahal Heritage Tour", category: "Culture", cost: 25, day: "Day 1", image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=600&q=80" },
      { id: 3502, name: "Royal Rajasthani Thali Dinner Experience", category: "Foodie", cost: 20, day: "Day 1", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80" }
    ]
  }
};

export default function App() {
  const [selectedKey, setSelectedKey] = useState("london");
  const [budget, setBudget] = useState(1500);
  const [travelStyle, setTravelStyle] = useState("All");
  const [tripData, setTripData] = useState(DESTINATION_DATABASE["london"]);
  const [shortlist, setShortlist] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (DESTINATION_DATABASE[selectedKey]) {
      setTripData(DESTINATION_DATABASE[selectedKey]);
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
          <p style={styles.subtitle}>Select from 35 world-famous destinations with guaranteed high-resolution images & custom budgets.</p>
          
          {/* Destination Dropdown Form */}
          <form onSubmit={handleSearch} style={styles.searchCard}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Select Destination</label>
              <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                style={styles.input}
              >
                {Object.keys(DESTINATION_DATABASE).map((key) => (
                  <option key={key} value={key}>
                    {DESTINATION_DATABASE[key].name}
                  </option>
                ))}
              </select>
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
  input: { padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "1rem", outline: "none", background: "#fff" },
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