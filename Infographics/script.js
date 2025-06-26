// Helper function for chart creation
function createChart(ctx, type, data, options) {
    return new Chart(ctx, {
        type: type,
        data: data,
        options: options
    });
}

// Common chart options for tooltips and titles
const commonOptions = {
    plugins: {
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
                }
            }
        }
    }
};

// Data Variables for Better Organization
const adoptionData = {
    labels: ['2023', '2025 (Projected)'],
    datasets: [{
        label: 'AI Adoption Rate (%)',
        data: [50, 75],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

const advancementsData = {
    labels: ['2023', '2025', '2030'],
    datasets: [{
        label: 'NLP Improvement (%)',
        data: [0, 50, 0], // Placeholder for 2023 and 2025
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false
    }, {
        label: 'Computer Vision Accuracy (%)',
        data: [0, 0, 95], // Placeholder for 2023 and 2025
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false
    }]
};

const impactData = {
    labels: ['Healthcare', 'Manufacturing', 'Customer Service'],
    datasets: [{
        label: 'Impact of AI on Industries (%)',
        data: [40, 20, 40],
        backgroundColor: [
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
    }]
};

const ethicalData = {
    labels: ['Bias in AI', 'Privacy Concerns', 'Regulatory Frameworks'],
    datasets: [{
        label: 'Concerns (%)',
        data: [70, 60, 50],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

const dailyLifeData = {
    labels: ['Smart Homes', 'Personal Assistants', 'Healthcare Wearables'],
    datasets: [{
        label: 'Usage (%)',
        data: [70, 80, 60],
        backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
    }]
};

const challengesData = {
    labels: ['Job Displacement', 'Job Creation', 'Technological Limitations'],
    datasets: [{
        label: 'Concerns (%)',
        data: [85, 97, 60],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
    }]
};

// New Data for Radar Chart: AI Capabilities Comparison (Updated)
const radarData = {
    labels: [
        'Natural Language Processing', 
        'Computer Vision', 
        'Robotics', 
        'Machine Learning', 
        'AI Ethics', 
        'Autonomous Vehicles', 
        'AI in Healthcare',
        'Reinforcement Learning'
    ],
    datasets: [{
        label: 'AI Capabilities',
        data: [90, 85, 75, 95, 60, 80, 70, 65], // More realistic data based on current AI advancements
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
    }]
};

// Polar Area Chart Data: AI Technologies Distribution
const polarData = {
    labels: ['NLP', 'Computer Vision', 'Robotics', 'Autonomous Vehicles', 'AI in Healthcare'],
    datasets: [{
        label: 'Distribution of AI Technologies',
        data: [25, 20, 15, 25, 15], // Sample distribution data
        backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
    }]
};

// Chart Initializations
const adoptionChartCtx = document.getElementById('adoptionChart').getContext('2d');
createChart(adoptionChartCtx, 'bar', adoptionData, {
    scales: {
        y: {
            beginAtZero: true,
            title: { display: true, text: 'Percentage (%)' }
        }
    },
    plugins: {
        ...commonOptions.plugins,
        title: { display: true, text: 'AI Adoption Rate' }
    }
});

const advancementsChartCtx = document.getElementById('advancementsChart').getContext('2d');
createChart(advancementsChartCtx, 'line', advancementsData, {
    scales: {
        y: {
            beginAtZero: true,
            title: { display: true, text: 'Accuracy (%)' }
        }
    },
    plugins: commonOptions.plugins
});

const impactChartCtx = document.getElementById('impactChart').getContext('2d');
createChart(impactChartCtx, 'pie', impactData, {
    responsive: true,
    plugins: {
        ...commonOptions.plugins,
        title: { display: true, text: 'Impact of AI on Different Industries' },
        legend: { position: 'top' }
    }
});

const ethicalChartCtx = document.getElementById('ethicalChart').getContext('2d');
createChart(ethicalChartCtx, 'bar', ethicalData, {
    scales: {
        y: {
            beginAtZero: true,
            title: { display: true, text: 'Percentage (%)' }
        }
    },
    plugins: commonOptions.plugins
});

const dailyLifeChartCtx = document.getElementById('dailyLifeChart').getContext('2d');
createChart(dailyLifeChartCtx, 'doughnut', dailyLifeData, {
    responsive: true,
    plugins: {
        ...commonOptions.plugins,
        title: { display: true, text: 'AI in Daily Life' },
        legend: { position: 'top' }
    }
});

const challengesChartCtx = document.getElementById('challengesChart').getContext('2d');
createChart(challengesChartCtx, 'bar', challengesData, {
    scales: {
        y: {
            beginAtZero: true,
            title: { display: true, text: 'Percentage (%)' }
        }
    },
    plugins: commonOptions.plugins
});

// Radar Chart for AI Capabilities
const radarChartCtx = document.getElementById('radarChart').getContext('2d');
createChart(radarChartCtx, 'radar', radarData, {
    scale: {
        ticks: { beginAtZero: true }
    }
});

// Polar Area Chart for AI Technologies
const polarChartCtx = document.getElementById('polarChart').getContext('2d');
createChart(polarChartCtx, 'polarArea', polarData, {
    responsive: true,
    plugins: {
        ...commonOptions.plugins,
        title: { display: true, text: 'Distribution of AI Technologies' },
        legend: { position: 'top' }
    }
});



