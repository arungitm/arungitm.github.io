document.addEventListener('DOMContentLoaded', function () {
    const consignmentsSlider = document.getElementById('consignments-slider');
    const consignmentsValue = document.getElementById('consignments-value');
    const investmentValue = document.getElementById('investment-value');
    const profitValue = document.getElementById('profit-value');
    const roiValue = document.getElementById('roi-value');

    const calculateReturns = (consignments) => {
        const investment = 700000 * consignments;
        const profit = 28500 * consignments;
        const roi = (profit / investment) * 100;
        return { investment, profit, roi };
    };

    const updateValues = () => {
        const consignments = parseInt(consignmentsSlider.value);
        const { investment, profit, roi } = calculateReturns(consignments);
        consignmentsValue.textContent = consignments;
        investmentValue.textContent = investment.toLocaleString();
        profitValue.textContent = profit.toLocaleString();
        roiValue.textContent = roi.toFixed(2);
        updateCharts(consignments);
    };

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
    });

    const profitComparisonChart = new Chart(document.getElementById('profit-comparison-chart'), {
        type: 'bar',
        data: {
            labels: comparisonData.map(data => data.name),
            datasets: [{
                label: 'Profit (USD)',
                data: comparisonData.map(data => data.profit),
                backgroundColor: '#2ecc71'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Profit Comparison by Consignments'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: { 
                    title: { display: true, text: 'Profit (USD)' },
                    beginAtZero: true
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    const updateCharts = (consignments) => {
        const updatedCycleData = cycleData.map(data => ({
            ...data,
            profit: data.profit * consignments
        }));

        profitGrowthChart.data.datasets[0].data = updatedCycleData.map(data => data.profit);
        profitGrowthChart.update();

        profitComparisonChart.data.datasets[0].data = comparisonData.map((data, index) => 28500 * (index + 1));
        profitComparisonChart.update();
    };

    updateValues(); // Initialize with default values
});

           
