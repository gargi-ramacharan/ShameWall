chrome.storage.local.get(['blockedSites'], (result) => {
    
    const sites = result.blockedSites || ["instagram.com", "tiktok.com", "youtube.com"];
    
    const matchedSite = sites.find(site => window.location.href.includes(site));
    
    if (matchedSite) {
        logInfraction(matchedSite); 
        activateShame();
    }
});

function logInfraction(siteName) {
    chrome.storage.local.get(['shameData'], (result) => {
        const data = result.shameData || [];
        data.push({ site: siteName, timestamp: Date.now() });
        chrome.storage.local.set({ shameData: data });
    });
}

async function activateShame() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        await video.play();

        setTimeout(() => {
            setupRedScreen(); 
            takeMainPicture(video);
            startTheSpiral(video, stream);
        }, 800);
    } catch (err) {
        setupRedScreen();
        startTheSpiral(null, null); 
    }
}

function setupRedScreen() {
    const overlay = document.createElement('div');
    overlay.id = "shame-overlay";
    overlay.innerHTML = `
        <div id="scanlines"></div>
        <div id="vignette"></div>
        <div id="cracks-container"></div>
        <div id="popup-container"></div> 
        <div id="safe-zone">
            <h1 id="main-text">SHAME! LOCK BACK IN!!</h1>
            <div id="main-pic-container"></div>
            <div id="timer-box">
                <p>FORCED REDIRECT IN:</p>
                <div id="countdown-timer">10</div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function captureFrame(video) {
    const canvas = document.createElement('canvas');
    canvas.width = video ? video.videoWidth : 640;
    canvas.height = video ? video.videoHeight : 480;
    if (video) canvas.getContext('2d').drawImage(video, 0, 0);
    return canvas.toDataURL('image/png');
}

function takeMainPicture(video) {
    const myFace = captureFrame(video);
    const container = document.getElementById('main-pic-container');
    if (container) container.innerHTML = `<img src="${myFace}" class="main-face">`;
}

function startTheSpiral(video, stream) {
    let timeLeft = 10;
    const siren = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
    siren.loop = true;
    siren.play().catch(() => {});

    const spawner = setInterval(() => { if(video) spawnNewPicture(video); }, 200);

    const countdown = setInterval(() => {
        timeLeft -= 1;
        const timer = document.getElementById('countdown-timer');
        if (timer) timer.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(spawner);
            clearInterval(countdown);
            if (stream) stream.getTracks().forEach(t => t.stop());
            window.location.href = "https://www.google.com"; 
        }
    }, 1000);
}

function spawnNewPicture(video) {
    const newFace = captureFrame(video);
    const elem = document.createElement('img');
    elem.src = newFace;
    elem.className = "pop-up-face";
    elem.style.left = (Math.random() * 80) + "vw";
    elem.style.top = (Math.random() * 80) + "vh";
    elem.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
    document.getElementById('popup-container').appendChild(elem);
}