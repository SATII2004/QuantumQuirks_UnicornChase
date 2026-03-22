# 🛡️ GatiKavach: Parametric Resilience for the Gig Economy
**Team Quantum Quirks | Guidewire DEVTrails 2026: Seed Phase Submission**

> "Turning environmental disruption into instant financial stability through data-driven oracles."

---

## 📌 Table of Contents
* [The Mission](#-the-mission)
* [The Problem](#-the-problem)
* [Technical Architecture](#-technical-architecture)
* [Key Features](#-key-features)
* [Tech Stack](#-tech-stack)
* [Local Setup](#-local-setup)
* [API Documentation](#-api-documentation)

---

## 🛡️ The Mission
**GatiKavach** (Sanskrit for *"The Shield of Motion"*) is a decentralized-inspired parametric insurance platform. We protect India's 3 million+ delivery partners from **Loss of Income** caused by hyper-local climate events. By removing the manual claims process, we ensure that the moment the weather stops the work, the payout starts the recovery.

## 📉 The Problem
Traditional insurance is broken for the gig economy:
* **Slow Payouts:** Drivers cannot wait 14 days for a claim to be investigated.
* **Proof of Loss:** Proving that rain in a specific 2km radius stopped a delivery is nearly impossible for a driver.
* **High Friction:** Small-ticket payouts (₹500 - ₹1500) are not cost-effective for traditional insurers to process manually.

## 🏗️ Technical Architecture
GatiKavach operates on a **Parametric Oracle Model**:
1.  **Sensors/Data Nodes:** The system monitors Rainfall, Temperature, and AQI thresholds.
2.  **Spring Boot Engine:** Processes raw data against policy logic.
3.  **Reactive UI:** A React 19 dashboard reflects the "Active Shield" status and wallet updates via REST handshakes.

---

## ✨ Key Features
* **Zero-Claim Automation:** No forms. No calls. Payouts are triggered automatically by data.
* **Multi-Peril Protection:**
    * 🌧️ **Precipitation:** Triggered at $> 5mm/hr$ rainfall.
    * 🌡️ **Thermal Stress:** Triggered at $> 45°C$ to protect against heatstroke.
    * 🌬️ **AQI Lockdown:** Support during government-mandated pollution bans ($AQI > 400$).
* **Glassmorphic HUD:** High-contrast UI designed for drivers to see clearly in outdoor, high-glare environments.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 19 (Vite), Tailwind CSS v4, Lucide-React |
| **Backend** | Java 21, Spring Boot 3.2.x, Maven |
| **Architecture** | RESTful Microservices, CORS-enabled |

---

## ⚙️ Local Setup

### 1. Prerequisites
* JDK 21 or higher
* Node.js 18 or higher
* Maven (optional, wrapper included)

### 2. Backend Installation
```bash
cd backend
./mvnw spring-boot:run

The server will start on http://localhost:8080.

3. Frontend Installation

cd frontend
npm install
npm run dev

The dashboard will be available at http://localhost:5173.

📡 API Documentation

Evaluate Trigger
POST /api/v1/insurance/trigger

Request Body:

JSON
{
  "type": "RAIN" 
}
Options: RAIN, HEAT, AQI, RESET

Success Response (200 OK):

JSON
{
  "activePeril": "RAIN",
  "payoutStatus": "PRECIPITATION_TRIGGER_HIT",
  "payoutAmount": 1200.0,
  "walletBalance": 12450.0,
  "metrics": {
    "rain": 8.5,
    "temp": 24.0,
    "aqi": 30.0
  }
}


🔮 Future Roadmap (Scale Phase)

Phase 2: Integration with OpenWeather API and Google Maps for real-time geolocation validation.

Phase 3: AI-driven fraud detection to verify driver "On-Duty" status via device telemetry.

Built with ❤️ by Team Quantum Quirks (Satish, Bhargav, Anirudh)