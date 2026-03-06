const DEFAULT_SITES = ["instagram.com", "tiktok.com", "youtube.com"];
let allSavedSites = [];
let currentlyBlocked = [];

function formatSiteName(domain) {
    let name = domain.split('.')[0]; 
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function renderSites() {
    const listDiv = document.getElementById('site-list');
    listDiv.innerHTML = ''; 
    
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

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const domainToRemove = e.target.getAttribute('data-domain');
            allSavedSites = allSavedSites.filter(s => s !== domainToRemove);
            currentlyBlocked = currentlyBlocked.filter(s => s !== domainToRemove);
            renderSites();
        });
    });
}

chrome.storage.local.get(['allSites', 'blockedSites'], (result) => {
    allSavedSites = result.allSites ? [...result.allSites] : [...DEFAULT_SITES];
    currentlyBlocked = result.blockedSites ? [...result.blockedSites] : [...DEFAULT_SITES];
    renderSites();
});

function showInvalidError() {
    const errorMsg = document.getElementById('error-msg');
    errorMsg.style.display = 'block';
    setTimeout(() => { errorMsg.style.display = 'none'; }, 2000);
}

document.getElementById('add-btn').addEventListener('click', async () => {
    const inputEl = document.getElementById('new-site-input');
    const addBtn = document.getElementById('add-btn');
    let newSite = inputEl.value.trim().toLowerCase();
    
    if (newSite === "") return;

    newSite = newSite.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

    const isValidFormat = /^[a-z0-9\-]+\.[a-z]{2,}$/i.test(newSite);
    if (!isValidFormat) {
        showInvalidError();
        return;
    }

    try {
        addBtn.innerText = "..."; 
        
        await fetch(`https://${newSite}`, { mode: 'no-cors' });
        
        addBtn.innerText = "+";

        if (!allSavedSites.includes(newSite)) {
            allSavedSites.push(newSite);
            currentlyBlocked.push(newSite); 
            inputEl.value = ''; 
            renderSites();
        }

    } catch (err) {
        addBtn.innerText = "+";
        showInvalidError();
    }
});

document.getElementById('save-btn').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const newBlockedSites = [];

    checkboxes.forEach(box => {
        if (box.checked) {
            newBlockedSites.push(box.id);
        }
    });

    chrome.storage.local.set({ 
        allSites: allSavedSites, 
        blockedSites: newBlockedSites 
    }, () => {
        const btn = document.getElementById('save-btn');
        const originalText = btn.innerText;
        btn.innerText = "LOCKED!";
        btn.style.background = "#00cc00"; 
        setTimeout(() => { 
            btn.innerText = originalText; 
            btn.style.background = "#ff0000";
        }, 1500);
    });
});

document.getElementById('analytics-btn').addEventListener('click', () => {
    chrome.tabs.create({ url: 'dashboard.html' });
});