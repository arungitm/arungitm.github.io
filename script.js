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

    consignmentsSlider.addEventListener('input', () => updateValues(parseInt(consignmentsSlider.value)));
    consignmentsInput.addEventListener('input', () => {
        let value = parseInt(consignmentsInput.value);
        if (value < 1) value = 1;
        if (value > 5) value = 5;
        updateValues(value);
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

