chrome.storage.local.get(['blockedSites'], (result) => {
    if (result.blockedSites) {
        result.blockedSites.forEach(siteId => {
            const el = document.getElementById(siteId);
            if (el) el.checked = true;
        });
    }
});

document.getElementById('save-btn').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const sitesArray = [];

    checkboxes.forEach(box => {
        if (box.checked) {
            sitesArray.push(box.id);
        }
    });

    chrome.storage.local.set({ blockedSites: sitesArray }, () => {
        const status = document.getElementById('status');
        status.style.display = 'block';
        setTimeout(() => { status.style.display = 'none'; }, 2000);
    });
});