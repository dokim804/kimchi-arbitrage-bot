let lineChartInstance = null;
let barChartInstance = null;

async function fetchData() {
    const response = await fetch('/data');
    const data = await response.json();
    const labels = [];
    const coinonePrices = [];
    const bitvavoPrices = [];
    const premiums = [];
    data.forEach(row => {
        labels.push(row.timestamp || row.date || '');
        coinonePrices.push(row.coinone_btc_krw);
        bitvavoPrices.push(row.bitvavo_btc_krw);
        premiums.push(row.kimchi_premium_percent);
    });
    return { labels, coinonePrices, bitvavoPrices, premiums };
}

const initCharts = async () => {
    const priceChartElem = document.getElementById('priceChart');
    const premiumChartElem = document.getElementById('premiumChart');
    if (!priceChartElem || !premiumChartElem) return;

    const ctxLine = priceChartElem.getContext('2d');
    const ctxBar = premiumChartElem.getContext('2d');
    const { labels, coinonePrices, bitvavoPrices, premiums } = await fetchData();

    // Destroy previous charts if they exist
    if (lineChartInstance) {
        lineChartInstance.destroy();
    }
    if (barChartInstance) {
        barChartInstance.destroy();
    }

    lineChartInstance = new Chart(ctxLine, {
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

    barChartInstance = new Chart(ctxBar, {
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

initCharts();