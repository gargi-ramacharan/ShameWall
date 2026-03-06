chrome.storage.local.get(['blockedSites'], (result) => {
    const sites = result.blockedSites || ["reddit.com", "twitter.com", "facebook.com", "instagram.com", "tiktok.com", "youtube.com", "chatgpt.com", "gemini.google.com"];
    
    if (sites.some(site => window.location.href.includes(site))) {
        activateShame();
    }
});

async function activateShame() {
    const MAKE_URL = "https://hook.us2.make.com/5sucu31yl3lc12bglojq5m8vgxvzrx6v"; 
    const site = window.location.hostname;

    try {
        fetch(`${MAKE_URL}?website=${site}`, { method: 'GET', mode: 'no-cors' });

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
            <h1 id="main-text">HOLY CHUZZ - LOCK IN!!</h1>
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
        addCrack();
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
    const el = document.createElement('img');
    el.src = newFace;
    el.className = "pop-up-face";
    el.style.left = (Math.random() * 80) + "vw";
    el.style.top = (Math.random() * 80) + "vh";
    el.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
    document.getElementById('popup-container').appendChild(el);
}

function addCrack() {
    const container = document.getElementById('cracks-container');
    if (!container) return;
    const crack = document.createElement('img');
    crack.src = "https://freepngimg.com/thumb/broken_glass/3-2-broken-glass-png-pic.png"; 
    crack.className = "dynamic-crack";
    crack.style.left = (Math.random() * 100 - 20) + "vw";
    crack.style.top = (Math.random() * 100 - 20) + "vh";
    crack.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 2 + 1})`;
    container.appendChild(crack);
}