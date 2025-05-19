# 🪙 Korean Premium Arbitrage Bot

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Tech](https://img.shields.io/badge/built_with-JavaScript%20%7C%20Python-blue)
![Hosted](https://img.shields.io/badge/hosted_on-Azure-lightblue)

A real-time Bitcoin arbitrage simulator that calculates potential profit and ROI between Korean and European crypto exchanges, based on the infamous **"Kimchi Premium"** — the price difference in BTC between markets.

🔗 **Live App**: [Korean Premium Arbitrage Bot](https://korean-premium-arbitrage-bot-ard3fnductawgmh0.koreasouth-01.azurewebsites.net/)

---

## 💡 Project Overview

The Korean crypto market often shows a higher BTC price than Western markets. This app simulates an arbitrage trade to exploit that price gap and calculate:

- 💰 Estimated profit and ROI, using arbitrage flow and real-world transfer costs for each step of the flow (Conversion fees, trading fees, BTC network fees, market slippage)
- ⛓️ Estimated time delays to gauge realized profit change

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
| HTML, CSS, JavaScript | Python, Flask | Custom simulation engine (JavaScript) | Azure Web Apps |

---

## 📸 Screenshots

![Simulation UI](./screenshots/simulation-ui.png)

---

## 🛠️ Local Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/korean-premium-arbitrage-bot.git
cd korean-premium-arbitrage-bot

# Install dependencies
pip install -r requirements.txt  # For Python backend

# Start the app
flask run

# Open in browser
http://localhost:5000
```

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
