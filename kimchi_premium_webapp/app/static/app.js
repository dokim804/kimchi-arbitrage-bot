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

const initChart = async () => {
    const ctx = document.getElementById('priceChart').getContext('2d');
    const chart = new Chart(ctx, {
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
                },
                {
                    label: 'Kimchi Premium (%)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    data: [],
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    async function updateChart() {
        const { labels, coinonePrices, bitvavoPrices, premiums } = await fetchData();
        chart.data.labels = labels;
        chart.data.datasets[0].data = coinonePrices;
        chart.data.datasets[1].data = bitvavoPrices;
        chart.data.datasets[2].data = premiums;
        chart.update();
    }

    await updateChart();
    setInterval(updateChart, 60000); // Update every minute
};

document.addEventListener('DOMContentLoaded', initChart);