// Hardcoded example values
const wiseRate = 0.00068; // 1 KRW = 0.00068 EUR
const wiseFee = 5000; // 5,000 KRW fee
const bitvavoDepositFee = 0; // 0 EUR
const bitvavoBuyFeePercent = 0.25; // 0.25%
const buySlippagePercent = 0.3; // 0.3% slippage
const bitvavoWithdrawFeeBtc = 0.0005; // 0.0005 BTC
const coinoneSellPrice = 147000000; // 1 BTC = 147,000,000 KRW
const coinoneSellFeePercent = 0.1; // 0.1%
const sellSlippagePercent = 0.2; // 0.2% slippage
const effectiveSellPrice = coinoneSellPrice * (1 - sellSlippagePercent / 100);
const btcNetworkFee = 0.0001; // BTC (i.e., 10,000 sats)


async function getLatestBitvavoPrice() {
    const response = await fetch('/api/latest-bitvavo-eur-price');
    const data = await response.json();
    return data.latest_bitvavo_price;
}

async function runSimulation() {
    const krwAmount = parseFloat(document.getElementById('krwAmount').value);

    // Fetch the latest Bitvavo BTC price
    const bitvavoBtcPrice = await getLatestBitvavoPrice();

    // Calculate effective prices inside the function
    const effectiveBuyPrice = bitvavoBtcPrice * (1 + buySlippagePercent / 100);

    // Step 1: Wise conversion
    const krwAfterWiseFee = krwAmount - wiseFee;
    const eurReceived = krwAfterWiseFee * wiseRate;

    // Step 2: Bitvavo deposit (no fee)
    const eurAfterDeposit = eurReceived - bitvavoDepositFee;

    // Step 3: Buy BTC on Bitvavo
    const btcBought = (eurAfterDeposit / effectiveBuyPrice) * (1 - bitvavoBuyFeePercent / 100);

    // Step 4: Withdraw BTC from Bitvavo
    const totalWithdrawFeeBtc = bitvavoWithdrawFeeBtc + btcNetworkFee;
    const btcAfterWithdraw = btcBought - totalWithdrawFeeBtc;

    // Step 5: Sell BTC on CoinOne
    const krwFromSale = btcAfterWithdraw * effectiveSellPrice * (1 - coinoneSellFeePercent / 100);


    // Results
    const profit = krwFromSale - krwAmount;
    const roi = (profit / krwAmount) * 100;

    document.getElementById('profitSummary').innerHTML = `
        <div style="text-align:center;">
            <span style="font-size:2em;"><b>Profit: ${profit.toLocaleString()} KRW</b></span><br>
            <span style="font-size:1.5em;"><b>ROI: ${roi.toFixed(2)}%</b></span>
        </div>
    `;

    document.getElementById('simulationResults').innerHTML = `
        <h2>Simulation Results</h2>
        <p><b>Step 1:</b> Send ${krwAmount.toLocaleString()} KRW via Wise with real-time conversion rate (fee: ${wiseFee.toLocaleString()} KRW) → <b>${eurReceived.toFixed(2)} EUR</b></p>
        <p><b>Step 2:</b> Deposit to Bitvavo (fee: ${bitvavoDepositFee} EUR) → <b>${eurAfterDeposit.toFixed(2)} EUR</b></p>
        <p><b>Step 3:</b> Buy BTC at ${bitvavoBtcPrice.toLocaleString()} EUR/BTC (fee: ${bitvavoBuyFeePercent}%) → <b>${btcBought.toFixed(6)} BTC</b></p>
        <p><b>Step 4:</b> Withdraw BTC to CoinOne (fee: ${bitvavoWithdrawFeeBtc} BTC) → <b>${btcAfterWithdraw.toFixed(6)} BTC</b></p>
        <p><b>Step 5:</b> Sell BTC on CoinOne at ${coinoneSellPrice.toLocaleString()} KRW/BTC (fee: ${coinoneSellFeePercent}%) → <b>${krwFromSale.toLocaleString()} KRW</b></p>
    `;
}