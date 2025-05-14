import sys
import os

# Add the 'src' folder to the Python path
src_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src"))
sys.path.append(src_path)

import azure.functions as func
import logging
import os
from datetime import datetime
from kimchi_premium_tracker import get_coinone_btc_price, get_bitvavo_btc_price, get_eur_to_krw_fx_rate, compute_kimchi_premium, save_to_csv

app = func.FunctionApp()

@app.timer_trigger(schedule="0 */10 * * * *", arg_name="myTimer", run_on_startup=False, use_monitor=False)
def PriceTracker(myTimer: func.TimerRequest) -> None:
    if myTimer.past_due:
        logging.info('The timer is past due!')

    logging.info('Price Tracker function started.')

    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        # Fetch data
        krw_price = get_coinone_btc_price()
        eur_price = get_bitvavo_btc_price()
        fx_rate = get_eur_to_krw_fx_rate()

        # Compute Kimchi Premium
        premium_pct, eur_price_converted = compute_kimchi_premium(krw_price, eur_price, fx_rate)

        # Log data
        log = {
            "timestamp": now,
            "coinone_btc_krw": round(krw_price, 0),
            "bitvavo_btc_eur": round(eur_price, 2),
            "eur_krw_rate": round(fx_rate, 2),
            "bitvavo_btc_krw": eur_price_converted,
            "kimchi_premium_percent": premium_pct
        }

        # Save to CSV
        script_dir = os.path.dirname(os.path.abspath(__file__))
        data_path = os.path.join(script_dir, "..", "data", "kimchi_premium_log.csv")
        save_to_csv(log, data_path)

        logging.info(f"Logged Kimchi Premium: {premium_pct}%")
        logging.info(f"Saved to: {os.path.abspath(data_path)}")

    except Exception as e:
        logging.error(f"Error occurred: {e}")