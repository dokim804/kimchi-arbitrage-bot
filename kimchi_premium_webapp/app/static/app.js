// filepath: kimchi_premium_webapp/app/static/app.js
async function fetchData() {
    const response = await fetch('/data');
    const data = await response.json();

    const labels = [];
    const coinonePrices = [];
    const bitvavoPrices = [];
    const premiums = [];

    data.forEach(row => {
        labels.push(row.timestamp);
        coinonePrices.push(parseFloat(row.coinone_btc_krw));
        bitvavoPrices.push(parseFloat(row.bitvavo_btc_krw));
        premiums.push(parseFloat(row.kimchi_premium_percent));
    });

    priceChart.data.labels = labels;
    priceChart.data.datasets[0].data = coinonePrices;
    priceChart.data.datasets[1].data = bitvavoPrices;
    priceChart.data.datasets[2].data = premiums;
    priceChart.update();
}

// Fetch data from the server and update the chart
const parseCSV = (data) => {
    const rows = data.split('\n').slice(1);
    const coinoneBtcKrw = [];
    const bitvavoBtcKrw = [];
    const kimchiPremiumPercent = [];
    const timestamps = [];

    rows.forEach(row => {
        const columns = row.split(',');
        if (columns.length === 6) {
            timestamps.push(columns[0]);
            coinoneBtcKrw.push(parseFloat(columns[1]));
            bitvavoBtcKrw.push(parseFloat(columns[4]));
            kimchiPremiumPercent.push(parseFloat(columns[5]));
        }
    });

    return { timestamps, coinoneBtcKrw, bitvavoBtcKrw, kimchiPremiumPercent };
};

const updateChart = async (chart) => {
    const { timestamps, coinoneBtcKrw, bitvavoBtcKrw, kimchiPremiumPercent } = await fetchData();
    chart.data.labels = timestamps;
    chart.data.datasets[0].data = coinoneBtcKrw;
    chart.data.datasets[1].data = bitvavoBtcKrw;
    chart.data.datasets[2].data = kimchiPremiumPercent;
    chart.update();
};

const initChart = () => {
    const ctx = document.getElementById('myChart').getContext('2d');
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

    setInterval(() => updateChart(chart), 60000); // Update every minute
};

document.addEventListener('DOMContentLoaded', initChart);