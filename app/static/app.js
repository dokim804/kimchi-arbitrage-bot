// Fetches data from the Flask backend '/data' endpoint and processes it for the charts
async function fetchData() {
    const response = await fetch('/data'); // Request data from Flask backend
    const data = await response.json(); // Parse the JSON response

    // Arrays to hold chart data
    const labels = [];
    const coinonePrices = [];
    const bitvavoPrices = [];
    const premiums = [];

    // Extract relevant fields from each row of data
    data.forEach(row => {
        labels.push(row.timestamp); // X-axis: time
        coinonePrices.push(parseFloat(row.coinone_btc_krw)); // Coinone BTC price
        bitvavoPrices.push(parseFloat(row.bitvavo_btc_krw)); // Bitvavo BTC price
        premiums.push(parseFloat(row.kimchi_premium_percent)); // Kimchi Premium %
    });

    // Return processed arrays for charting
    return { labels, coinonePrices, bitvavoPrices, premiums };
}

// Initializes both the line chart and bar chart, and sets up periodic updates
const initCharts = async () => {
    // Get the 2D drawing contexts for both canvas elements
    const ctxLine = document.getElementById('priceChart').getContext('2d');
    const ctxBar = document.getElementById('premiumChart').getContext('2d');

    // Create the line chart for BTC prices
    const lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: [], // Timestamps
            datasets: [
                {
                    label: 'Coinone BTC (KRW)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    data: [],
                },
                {
                    label: 'Bitvavo BTC (KRW)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    data: [],
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: false }
            }
        }
    });

    // Create the bar chart for Korean Premium %
    const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Korean Premium (%)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    data: [],
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Fetches new data and updates both charts
    async function updateCharts() {
        const { labels, coinonePrices, bitvavoPrices, premiums } = await fetchData();
        // Update line chart
        lineChart.data.labels = labels;
        lineChart.data.datasets[0].data = coinonePrices;
        lineChart.data.datasets[1].data = bitvavoPrices;
        lineChart.update();

        // Update bar chart
        barChart.data.labels = labels;
        barChart.data.datasets[0].data = premiums;
        barChart.update();
    }

    await updateCharts(); // Initial chart update on page load
    setInterval(updateCharts, 60000); // Update every minute
};

// Run initCharts when the page finishes loading
document.addEventListener('DOMContentLoaded', initCharts);