// Fetches data from the Flask backend '/data' endpoint and processes it for the charts
async function fetchData() {
    const response = await fetch('/data');
    const data = await response.json();
    // Arrays to hold chart data
    const labels = [];
    const coinonePrices = [];
    const bitvavoPrices = [];
    const premiums = [];

    // Extract relevant fields from each row of data
    data.forEach(row => {
        labels.push(row.timestamp || row.date || '');
        coinonePrices.push(row.coinone_btc_krw);
        bitvavoPrices.push(row.bitvavo_btc_krw);
        premiums.push(row.kimchi_premium);
    });

    // Return processed arrays for charting
    return { labels, coinonePrices, bitvavoPrices, premiums };
}

// Initializes both the line chart and bar chart, and sets up periodic updates
const initCharts = async () => {
    // Get the 2D drawing contexts for both canvas elements
    const priceChartElem = document.getElementById('priceChart');
    const premiumChartElem = document.getElementById('premiumChart');
    if (!priceChartElem || !premiumChartElem) return; // Don't run if canvases aren't present

    const ctxLine = priceChartElem.getContext('2d');
    const ctxBar = premiumChartElem.getContext('2d');

    const { labels, coinonePrices, bitvavoPrices, premiums } = await fetchData();

    // Create the line chart for BTC prices
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Coinone BTC (KRW)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    data: coinonePrices,
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Bitvavo BTC (KRW)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    data: bitvavoPrices,
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            },
            scales: {
                y: { beginAtZero: false }
            }
        }
    });

    // Create the bar chart for Kimchi Premium %
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Kimchi Premium (%)',
                    backgroundColor: 'rgba(255, 206, 86, 0.5)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1,
                    data: premiums,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
};

// Run initCharts when the script is loaded (after canvases are present)
initCharts();