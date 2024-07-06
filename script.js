document.addEventListener('DOMContentLoaded', function () {
    const consignmentsSlider = document.getElementById('consignments-slider');
    const consignmentsInput = document.getElementById('consignments-input');
    const investmentValue = document.getElementById('investment-value');
    const profitValue = document.getElementById('profit-value');
    const roiValue = document.getElementById('roi-value');

    const calculateReturns = (consignments) => {
        const investment = 700000 * consignments;
        const profit = 28500 * consignments;
        const roi = (profit / investment) * 100;
        return { investment, profit, roi };
    };

    const updateValues = (consignments) => {
        const { investment, profit, roi } = calculateReturns(consignments);
        consignmentsSlider.value = consignments;
        consignmentsInput.value = consignments;
        investmentValue.textContent = investment.toLocaleString();
        profitValue.textContent = profit.toLocaleString();
        roiValue.textContent = roi.toFixed(2);
        updateChart(consignments);
    };

<<<<<<< HEAD
    consignmentsSlider.addEventListener('input', () => updateValues(parseInt(consignmentsSlider.value)));
    consignmentsInput.addEventListener('input', () => {
        let value = parseInt(consignmentsInput.value);
        if (value < 1) value = 1;
        if (value > 5) value = 5;
        updateValues(value);
=======
    consignmentsSlider.addEventListener('input', updateValues);

    const sliderNumbers = document.querySelectorAll('.slider-number');
    sliderNumbers.forEach(number => {
        number.addEventListener('click', (e) => {
            consignmentsSlider.value = e.target.getAttribute('data-value');
            updateValues();
        });
    });

    const cycleData = [
        { day: 0, profit: 0 },
        { day: 12, profit: 9500 },
        { day: 24, profit: 19000 },
        { day: 36, profit: 28500 },
    ];

    const comparisonData = [
        { name: '1 Consignment', profit: 28500 },
        { name: '2 Consignments', profit: 57000 },
        { name: '3 Consignments', profit: 85500 },
        { name: '4 Consignments', profit: 114000 },
        { name: '5 Consignments', profit: 142500 },
    ];

    const profitGrowthChart = new Chart(document.getElementById('profit-growth-chart'), {
        type: 'line',
        data: {
            labels: cycleData.map(data => data.day),
            datasets: [{
                label: 'Profit (USD)',
                data: cycleData.map(data => data.profit),
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Profit Growth Over Time'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: { 
                    title: { display: true, text: 'Days' },
                    grid: { display: false }
                },
                y: { 
                    title: { display: true, text: 'Profit (USD)' },
                    beginAtZero: true
                }
            }
        }
>>>>>>> 605607baf21b711d650230d90235cd08cba7b2ad
    });

    const sliderNumbers = document.querySelectorAll('.slider-number');
    sliderNumbers.forEach(number => {
        number.addEventListener('click', (e) => {
            updateValues(parseInt(e.target.getAttribute('data-value')));
        });
    });

    let profitComparisonChart;

    const initializeChart = () => {
        const ctx = document.getElementById('profit-comparison-chart').getContext('2d');
        profitComparisonChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                    label: 'Profit (USD)',
                    data: [28500, 57000, 85500, 114000, 142500],
                    backgroundColor: '#2ecc71'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Profit (USD)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Number of Consignments'
                        }
                    }
                }
            }
        });
    };

    const updateChart = (consignments) => {
        if (profitComparisonChart) {
            profitComparisonChart.data.datasets[0].data = [1, 2, 3, 4, 5].map(i => 28500 * i);
            profitComparisonChart.update();
        }
    };

    initializeChart();
    updateValues(1); // Initialize with default values
});

<<<<<<< HEAD
function showInfo(step) {
    const infoDiv = document.getElementById('cycleInfo');
    let content = '';
    switch(step) {
        case 'purchase':
            content = 'We source high-quality crude oil from trusted global suppliers, leveraging our network to secure the best prices.';
            break;
        case 'refinery':
            content = 'Our state-of-the-art refineries process the crude oil into various petroleum products, maximizing efficiency and output.';
            break;
        case 'shipping':
            content = 'We utilize strategic shipping methods to ensure timely and safe delivery of our products.';
            break;
        case 'payment':
            content = 'Our efficient payment processes ensure quick settlement of transactions, maximizing your returns.';
            break;
    }
    infoDiv.innerHTML = content;
    infoDiv.classList.add('show');
}
