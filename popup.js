// A baseline list so it's not completely empty on the very first install
const DEFAULT_SITES = ["reddit.com", "youtube.com", "tiktok.com"];
let allSavedSites = [];
let currentlyBlocked = [];

// Helper: Turns "netflix.com" or "www.netflix.co.uk" into "Netflix"
function formatSiteName(domain) {
    let name = domain.split('.')[0]; 
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Renders the checkboxes onto the screen
function renderSites() {
    const listDiv = document.getElementById('site-list');
    listDiv.innerHTML = ''; // Clear the list before redrawing
    
    allSavedSites.forEach(domain => {
        const isChecked = currentlyBlocked.includes(domain) ? 'checked' : '';
        const displayName = formatSiteName(domain);
        
        const siteEl = document.createElement('div');
        siteEl.className = 'site-option';
        siteEl.innerHTML = `
            <div class="site-left">
                <input type="checkbox" id="${domain}" ${isChecked}>
                <label for="${domain}">${displayName}</label>
            </div>
            <button class="delete-btn" data-domain="${domain}">X</button>
        `;
        listDiv.appendChild(siteEl);
    });

    // Attach listeners to the new 'X' buttons so users can delete sites
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const domainToRemove = e.target.getAttribute('data-domain');
            allSavedSites = allSavedSites.filter(s => s !== domainToRemove);
            currentlyBlocked = currentlyBlocked.filter(s => s !== domainToRemove);
            renderSites();
        });
    });
}

// 1. On Load: Pull the saved lists from Chrome's memory
chrome.storage.local.get(['allSites', 'blockedSites'], (result) => {
    allSavedSites = result.allSites || DEFAULT_SITES;
    currentlyBlocked = result.blockedSites || DEFAULT_SITES;
    renderSites();
});

// 2. The Add Button Logic
document.getElementById('add-btn').addEventListener('click', () => {
    const inputEl = document.getElementById('new-site-input');
    let newSite = inputEl.value.trim().toLowerCase();
    
    // Clean up the URL (Removes https://, www., and slashes)
    newSite = newSite.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

    // If it's a valid site and not already in the list, add it
    if (newSite && !allSavedSites.includes(newSite)) {
        allSavedSites.push(newSite);
        currentlyBlocked.push(newSite); // Automatically check the box for them
        inputEl.value = ''; // Clear the input box
        renderSites();      // Redraw the list
    }
});

// 3. The Save Button Logic
document.getElementById('save-btn').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const newBlockedSites = [];

    // Figure out which ones are currently checked
    checkboxes.forEach(box => {
        if (box.checked) {
            newBlockedSites.push(box.id);
        }
    });

    // Save BOTH lists to memory
    chrome.storage.local.set({ 
        allSites: allSavedSites, 
        blockedSites: newBlockedSites 
    }, () => {
        const status = document.getElementById('status');
        status.style.display = 'block';
        setTimeout(() => { status.style.display = 'none'; }, 2000);
    });
});