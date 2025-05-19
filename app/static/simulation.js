// Hardcoded example values
const wiseRate = 0.00068; // 1 KRW = 0.00068 EUR
const wiseFee = 5000; // 5,000 KRW fee
const bitvavoDepositFee = 0; // 0 EUR
const bitvavoBtcPrice = 60000; // 1 BTC = 60,000 EUR
const bitvavoBuyFeePercent = 0.25; // 0.25%
const bitvavoWithdrawFeeBtc = 0.0005; // 0.0005 BTC
const coinoneSellPrice = 147000000; // 1 BTC = 147,000,000 KRW
const coinoneSellFeePercent = 0.1; // 0.1%

function runSimulation() {
    const krwAmount = parseFloat(document.getElementById('krwAmount').value);

    // Step 1: Wise conversion
    const krwAfterWiseFee = krwAmount - wiseFee;
    const eurReceived = krwAfterWiseFee * wiseRate;

    // Step 2: Bitvavo deposit (no fee)
    const eurAfterDeposit = eurReceived - bitvavoDepositFee;

    // Step 3: Buy BTC on Bitvavo
    const btcBought = (eurAfterDeposit / bitvavoBtcPrice) * (1 - bitvavoBuyFeePercent / 100);

    // Step 4: Withdraw BTC from Bitvavo
    const btcAfterWithdraw = btcBought - bitvavoWithdrawFeeBtc;

    // Step 5: Sell BTC on CoinOne
    const krwFromSale = btcAfterWithdraw * coinoneSellPrice * (1 - coinoneSellFeePercent / 100);

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