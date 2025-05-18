// filepath: kimchi_premium_webapp/app/static/app.js
const fetchData = async () => {
    const response = await fetch('https://<your-azure-storage-account>.blob.core.windows.net/koreanpremium/korean_premium_log.csv');
    const data = await response.text();
    return parseCSV(data);
};

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