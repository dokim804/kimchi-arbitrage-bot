# 🪙 Korean Premium Arbitrage Bot

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Tech](https://img.shields.io/badge/built_with-JavaScript%20%7C%20Python-blue)
![Hosted](https://img.shields.io/badge/hosted_on-Azure-lightblue)

A real-time Bitcoin arbitrage simulator that calculates potential profit and ROI between Korean and European crypto exchanges, based on the infamous **"Kimchi Premium"** — the price difference in BTC between markets.

🔗 **Live App**: [Korean Premium Arbitrage Bot](https://korean-premium-arbitrage-bot-ard3fnductawgmh0.koreasouth-01.azurewebsites.net/)

---

## 💡 Project Overview

The Korean crypto market often shows a higher BTC price than Western markets. This app simulates an arbitrage trade to exploit that price gap and calculate:

- 💰 Estimated profit and ROI
- 🔄 Real-world transfer costs (Conversion fees, trading fees, BTC network fees, market slippage)
- ⛓️ Estimated time delays

This project is part of my data science portfolio and showcases real-time data integration, financial modeling, and full-stack development.

---

## 🚀 Features

- ✅ Real-time BTC prices from Bitvavo (EUR) and CoinOne (KRW)
- ✅ Simulation of arbitrage steps with realistic fee structure
- ✅ Clean, responsive UI with dynamic ROI calculation
- ✅ Fully deployed and accessible via Azure

---

## 📊 Tech Stack

| Frontend | Backend | Logic | Hosting |
|----------|---------|-------|---------|
| HTML, CSS, JavaScript | Flask | Custom simulation engine (JavaScript) | Azure Web Apps |

---

## 📸 Screenshots

![Simulation UI](./screenshots/simulation-ui.png)

---

## 🔁 Arbitrage Flow

```text
1. Convert KRW to EUR via Wise (with 0.4% fee, FX spread already included in Wise conversion rate)
2. Deposit EUR into Bitvavo (no fee)
3. Buy BTC on Bitvavo (0.25% fee + 0.3% slippage)
4. Transfer BTC from Bitvavo to CoinOne (0.0005 BTC + 0.0001 BTC network fee)
5. Sell BTC on CoinOne (0.1% fee + 0.2% slippage)

## 🛠️ Local Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/korean-premium-arbitrage-bot.git
cd korean-premium-arbitrage-bot

# Install dependencies
npm install         # For JavaScript backend
# OR
pip install -r requirements.txt  # For Python backend

# Start the app
npm start
# OR
flask run

# Open in browser
http://localhost:3000

## 📈 Planned Improvements

- [ ] Dynamic fee updates with API integration or user input
- [ ] SMS/email alerts when arbitrage becomes profitable

---

## 🧠 What I Learned

- Real-world financial models must account for friction: FX spreads, network fees, slippage, and transfer delays
- Built experience working with asynchronous APIs and real-time data ingestion
- Learned to deploy and maintain full-stack applications using Azure
- Developed deeper understanding of crypto markets and cross-border finance

---

## 🤝 Contact

**Author:** Your Name  
📫 dokim804@gmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/dayu-kim-327002ba/)

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE)
