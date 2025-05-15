import requests
import csv
import os
from datetime import datetime
from azure.storage.blob import BlobServiceClient

def get_coinone_btc_price():
    url = "https://api.coinone.co.kr/ticker?currency=btc"
    response = requests.get(url)
    data = response.json()
    return float(data["last"]) if data["result"] == "success" else None

def get_bitvavo_btc_price():
    url = "https://api.bitvavo.com/v2/ticker/price?market=BTC-EUR"
    response = requests.get(url)
    data = response.json()
    return float(data["price"])

def get_eur_to_krw_fx_rate():
    url = "https://api.frankfurter.app/latest?from=EUR&to=KRW"
    response = requests.get(url)
    data = response.json()
    return float(data["rates"]["KRW"])

def compute_kimchi_premium(krw_price, eur_price, fx_rate):
    eur_in_krw = eur_price * fx_rate
    premium_pct = ((krw_price - eur_in_krw) / eur_in_krw) * 100
    return round(premium_pct, 2), round(eur_in_krw, 0)

def save_to_blob_csv(data, connection_string, container_name, blob_name):
    # Convert dict to CSV row
    import io
    import csv

    # Download existing blob content (if any)
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)
    container_client = blob_service_client.get_container_client(container_name)
    blob_client = container_client.get_blob_client(blob_name)

    # Ensure container exists
    try:
        container_client.create_container()
    except Exception:
        pass  # Container probably already exists

    # Download existing CSV or create header
    try:
        existing = blob_client.download_blob().readall().decode("utf-8")
        output = io.StringIO(existing)
        reader = list(csv.reader(output))
        header = reader[0]
        rows = reader[1:]
    except Exception:
        header = list(data.keys())
        rows = []

    # Append new row
    rows.append([str(data[k]) for k in header])

    # Write all rows back to blob
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(header)
    writer.writerows(rows)
    output.seek(0)
    blob_client.upload_blob(output.read(), overwrite=True)

def save_to_csv(data, filepath):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    file_exists = os.path.isfile(filepath)

    with open(filepath, mode="a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=data.keys())
        if not file_exists:
            writer.writeheader()
        writer.writerow(data)

if __name__ == "__main__":
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    try:
        krw_price = get_coinone_btc_price()
        eur_price = get_bitvavo_btc_price()
        fx_rate = get_eur_to_krw_fx_rate()

        premium_pct, eur_price_converted = compute_kimchi_premium(krw_price, eur_price, fx_rate)

        log = {
            "timestamp": now,
            "coinone_btc_krw": round(krw_price, 0),
            "bitvavo_btc_eur": round(eur_price, 2),
            "eur_krw_rate": round(fx_rate, 2),
            "bitvavo_btc_krw": eur_price_converted,
            "kimchi_premium_percent": premium_pct
        }

        script_dir = os.path.dirname(os.path.abspath(__file__))
        data_path = os.path.join(script_dir, "..", "data", "kimchi_premium_log.csv")
        save_to_csv(log, data_path)

        print("Logged Kimchi Premium:", premium_pct, "%")
        print("Saved to:", os.path.abspath(data_path))

    except requests.exceptions.RequestException as req_err:
        print("Network error occurred:", req_err)
    except KeyError as key_err:
        print("Missing key in API response:", key_err)
    except ValueError as val_err:
        print("Value error:", val_err)
    except Exception as e:
        print("Unexpected error occurred:", e)
