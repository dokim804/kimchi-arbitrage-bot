from flask import Flask, render_template, jsonify
import pandas as pd
import os
import io
from azure.storage.blob import BlobServiceClient
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Azure Blob Storage connection details
AZURE_CONNECTION_STRING = os.environ.get("AZURE_STORAGE_CONNECTION_STRING")
CONTAINER_NAME = "koreanpremium"
BLOB_NAME = "korean_premium_log.csv"

@app.route('/')
def home():
    return render_template('base.html')

@app.route('/tab/dashboard')
def tab_dashboard():
    return render_template('index_partial.html')

@app.route('/tab/simulation')
def tab_simulation():
    return render_template('simulation_partial.html')

@app.route('/data')
def data():
    # Fetch the CSV file from Azure Blob Storage
    blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)
    blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=BLOB_NAME)

    # Download the blob content
    stream = blob_client.download_blob()
    data = stream.readall().decode('utf-8')

    # Convert CSV data to DataFrame
    df = pd.read_csv(io.StringIO(data))

    # Return all rows as a list of dicts
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/latest-bitvavo-eur-price')
def latest_bitvavo_eur_price():
    # Fetch the CSV file from Azure Blob Storage (reuse logic)
    blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)
    blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=BLOB_NAME)

    # Download the blob content
    stream = blob_client.download_blob()
    data = stream.readall().decode('utf-8')

    # Convert CSV data to DataFrame
    df = pd.read_csv(io.StringIO(data))

    # Get the latest bitvavo_btc_krw price (last row)
    latest_price = float(df['bitvavo_btc_eur'].iloc[-1])

    return jsonify({'latest_bitvavo_price': latest_price})

@app.route('/simulation')
def simulation():
    return render_template('simulation.html')

if __name__ == '__main__':
    app.run(debug=True)