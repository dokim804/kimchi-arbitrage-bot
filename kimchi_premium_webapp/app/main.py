from flask import Flask, render_template, jsonify
import pandas as pd
import os

app = Flask(__name__)

# Azure Blob Storage connection details
AZURE_CONNECTION_STRING = os.environ.get("AZURE_STORAGE_CONNECTION_STRING")
CONTAINER_NAME = "koreanpremium"
BLOB_NAME = "korean_premium_log.csv"

@app.route('/')
def index():
    return render_template('index.html')

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

    # Get the latest values
    latest_data = df.iloc[-1].to_dict()
    return jsonify(latest_data)

if __name__ == '__main__':
    app.run(debug=True)