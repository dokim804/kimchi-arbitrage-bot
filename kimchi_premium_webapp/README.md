# Kimchi Premium Web Application

## Overview

This project is a web application that displays real-time updates of Bitcoin prices from Coinone and Bitvavo, as well as the Kimchi Premium percentage. The application fetches data from an Azure Blob Storage where the `korean_premium_log.csv` file is updated by an Azure Function.

## Features

- Real-time line graph displaying:
  - Coinone BTC price in KRW
  - Bitvavo BTC price in KRW
  - Kimchi Premium percentage
- Data fetched from Azure Blob Storage
- Responsive and user-friendly interface

## Project Structure

```
kimchi_premium_webapp
├── app
│   ├── main.py          # Entry point of the web application
│   ├── templates
│   │   └── index.html   # HTML structure for the web application
│   └── static
│       └── app.js       # JavaScript for handling real-time updates
├── requirements.txt      # Project dependencies
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd kimchi_premium_webapp
   ```

2. **Install dependencies:**
   Ensure you have Python installed, then run:
   ```
   pip install -r requirements.txt
   ```

3. **Run the application:**
   ```
   python app/main.py
   ```

4. **Access the application:**
   Open your web browser and go to `http://localhost:5000` (or the port specified in your application).

## Usage

- The application will automatically fetch and display the latest Bitcoin prices and Kimchi Premium percentage in real-time.
- The line graph will update as new data is available in the Azure Blob Storage.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.