import requests
import csv
import os
from datetime import datetime

def get_coinone_btc_price():
    url = "https://api.coinone.co.kr/ticker?currency=btc"
    response = requests.get(url)
    data = response.json()
    if data["result"] == "success":
        return {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "price_krw": float(data["last"])
        }
    else:
        raise Exception("Failed to fetch Coinone BTC price:", data)

def save_price_to_csv(data, filepath):
    # Make sure the directory exists
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    file_exists = os.path.isfile(filepath)

    with open(filepath, mode="a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["timestamp", "price_krw"])
        if not file_exists:
            writer.writeheader()
        writer.writerow(data)

if __name__ == "__main__":
    price_data = get_coinone_btc_price()
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(script_dir, "..", "data", "coinone_btc_price.csv")
    save_price_to_csv(price_data, data_path)
    print(f"Saved BTC price: ₩{price_data['price_krw']:,.0f} at {price_data['timestamp']}")
