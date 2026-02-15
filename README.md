# QuakeAlert

A USGS-inspired real-time earthquake monitoring platform with live maps, event details, and seismic data analytics.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue) 
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)![Express](https://img.shields.io/badge/Express.js-4.18.2-black?logo=express&logoColor=white)![React](https://img.shields.io/badge/React-v18-blue) ![Node.js](https://img.shields.io/badge/Node.js-v20-blue) 


---

## Overview

QuakeAlert is a web app that provides real-time earthquake tracking with interactive maps, live event feeds, and detailed seismic data. Users can view recent earthquakes, get event details, and track seismic activity globally.

## Features

* **Real-time earthquake data feed:** Continuously fetches seismic events from public APIs (like USGS) or internal data sources.
* **Interactive global map:** Displays earthquake locations on an interactive map with zoom, pan, and click-to-view-details functionality.
* **Event details page:** Provides magnitude, depth, location, time, and additional metadata for each earthquake.
* **REST API access:** Backend exposes endpoints to fetch, query, and manage earthquake data programmatically.
* **Alerts for new earthquakes:** Optional notification system for users or systems when significant earthquakes occur.
* **Search and filter:** Users can filter events by magnitude, date, or location.
* **Historical data access:** View past seismic events for analysis and trend monitoring.

## Workflow & App Functionality

1. **Data Ingestion:** Backend (Node.js + Express) fetches earthquake data from external APIs or sensors, normalizes it, and stores it in MongoDB.
2. **API Layer:** Provides endpoints for frontend and external clients to retrieve real-time and historical earthquake information.
3. **Frontend Display:** React + TypeScript app fetches data from the API and displays it on an interactive map using Leaflet.js / Mapbox.
4. **User Interaction:** Users can click map markers to view detailed event information, filter earthquakes by magnitude or date, and subscribe to alerts.
5. **Alerts & Notifications:** System can trigger notifications for significant events, sending alerts to subscribed users or systems.
6. **Data Updates:** The backend regularly polls data sources to keep the dashboard up to date.

## 🚀 Features (v0.1.0)

### 1. Real-Time Earthquake Feed
- Fetches **live earthquake data** from USGS or other seismic APIs.
- Displays **magnitude, epicenter coordinates, depth, and time**.
- Shows earthquakes in a **list or card view**.

### 2. Interactive Map Visualization
- Uses **Leaflet + OpenStreetMap** for mapping.
- Plots earthquake markers using **circle-dot icons**.
- Marker **size and color scale with magnitude**.
- Epicenters are easy to identify visually.

### 3. Floating “Report Earthquake” Button
- **Sticky button** always visible on the page.
- Opens a **modal form** for users to submit:
  - Location
  - Magnitude (optional)
  - Description of what they felt

### 4. User-Submitted Reports
- Stores submissions in **MongoDB**.
- Displays user reports on the map or as a list.
- Allows community-based verification of earthquakes.

### 5. Basic Responsive UI
- Works on **desktop and mobile**.
- Clean and minimal **cards for earthquake details**.
- Floating button remains accessible on all screen sizes.

### 6. Basic Filtering & Sorting
- Sort earthquakes by **magnitude** or **time**.
- Optional filtering by **region** using coordinates.

---

## 🔹 Optional features... ( for v0.2.0)
- Animated **epicenter pulses** for new quakes.
- Magnitude-scaled markers for better visualization.
- Display **distance from user location** if permission is granted.

---

## ❌ Features Reserved for Future Versions
- AI-based aftershock prediction
- Customizable push notifications
- Heatmaps or tectonic plate overlays
- Historical analytics dashboards
- Multi-language support

---
## Tech Stack

* Node.js + Express (backend)
* MongoDB (database)
* React + TypeScript (frontend)
* Leaflet.js / Mapbox (map visualization)

## Installation & Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/QuakeAlert.git
cd QuakeAlert

# Install dependencies
npm install

# Start the server
npm start

# Visit http://localhost:8080
```

## Usage

* View live earthquakes on the interactive map
* Use the REST API to fetch event data
* Subscribe to alerts (if implemented)
* Filter and search earthquakes by magnitude, date, or location

## Contributing

Contributions are welcome! Please fork the repo and create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
