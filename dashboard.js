chrome.storage.local.get(['shameData'], (result) => {
    const data = result.shameData || [];

    document.getElementById('total-count').innerText = data.length;

    if (data.length === 0) {
        document.getElementById('worst-site').innerText = "Perfect Focus!";
        return;
    }

    const siteCounts = {};
    data.forEach(entry => {
        siteCounts[entry.site] = (siteCounts[entry.site] || 0) + 1;
    });

    let worstSite = "";
    let maxCount = 0;
    for (const [site, count] of Object.entries(siteCounts)) {
        if (count > maxCount) {
            maxCount = count;
            worstSite = site;
        }
    }
    document.getElementById('worst-site').innerText = worstSite.toUpperCase();

    const labels = Object.keys(siteCounts);
    const chartData = Object.values(siteCounts);

    const ctx = document.getElementById('shameChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Times Blocked',
                data: chartData,
                backgroundColor: 'rgba(255, 77, 77, 0.6)',
                borderColor: '#ff0000',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, ticks: { color: 'white', stepSize: 1 } },
                x: { ticks: { color: 'white', font: { size: 14 } } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.shameData) {
        window.location.reload(); 
    }
});