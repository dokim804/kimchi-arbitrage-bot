// filepath: kimchi_premium_webapp/app/static/app.js
async function fetchData() {
    const response = await fetch('/data');
    const data = await response.json();

    const labels = [];
    const coinonePrices = [];
    const bitvavoPrices = [];
    const premiums = [];

    data.forEach(row => {
        labels.push(row.timestamp); // Adjust if your CSV header is different
        coinonePrices.push(parseFloat(row.coinone_btc_krw));
        bitvavoPrices.push(parseFloat(row.bitvavo_btc_krw));
        premiums.push(parseFloat(row.kimchi_premium_percent));
    });

    return { labels, coinonePrices, bitvavoPrices, premiums };
}

const initCharts = async () => {
    const ctxLine = document.getElementById('priceChart').getContext('2d');
    const ctxBar = document.getElementById('premiumChart').getContext('2d');

    const lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: [],
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

    const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Kimchi Premium (%)',
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

    await updateCharts();
    setInterval(updateCharts, 60000); // Update every minute
};

document.addEventListener('DOMContentLoaded', initCharts);