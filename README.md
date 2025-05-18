# Korean Premmium Arbitrage Bot

## 1. Goal

To build a real-time arbitrage monitor for Bitcoin price differences across the EU and Korean exchanges. The goal is to identify and potentially execute profitable trades that exploit the Kimchi Premium.

## 2. Motivation

This is not just a data science project — it’s a real-world opportunity to validate whether crypto arbitrage is feasible today, considering regulatory, FX, timing, and operational constraints.

## 3. Features

- Real-time Bitcoin price tracking from Coinone (Korean exchange) and Bitvavo (Europpean exchange)
- Live FX rate integration for KRW ↔ EUR
- Automated alerts when arbitrage exceeds X%
- Cost modeling for all stages of arbitrage
- Profitability simulation with ROI calculations
 
## 4. Web Application Features

- Real-time line graph displaying:
  - Coinone BTC price in KRW
  - Bitvavo BTC price in KRW
- Bar chart displaying:
  - Kimchi Premium percentage over time
- Data fetched from Azure Blob Storage
- Responsive and user-friendly interface

## 5. Setup Instructions (Web App)

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-folder>

2. Install dependencies:
   pip install -r requirements.txt
3. Run the application locally:
    python app/main.py

Then open your browser to http://localhost:5000.

## 6. Deployment (Azure App Service)
Deploy the repository root to Azure App Service.
Set the startup command to:
gunicorn app.main:app

## 7. License
This project is licensed under the MIT License. See the LICENSE file for details.
Set your environment variable AZURE_STORAGE_CONNECTION_STRING in the Azure portal.