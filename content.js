// //const NAUGHTY_SITES = ["reddit.com", "x.com", "facebook.com", "instagram.com", "tiktok.com", "youtube.com"];

// chrome.storage.local.get(['blockedSites'], (result) => {
//     // If they haven't saved anything yet, use these defaults
//     const sites = result.blockedSites || ["reddit.com", "twitter.com", "facebook.com", "instagram.com", "tiktok.com", "youtube.com"];
    
//     // Check if the current URL matches anything in the list
//     if (sites.some(site => window.location.href.includes(site))) {
//         activateShame();
//     }
// });

// async function activateShame() {
//     const MAKE_URL = "https://hook.us2.make.com/5sucu31yl3lc12bglojq5m8vgxvzrx6v"; 
//     const site = window.location.hostname;

//     try {
//         fetch(`${MAKE_URL}?website=${site}`, { method: 'GET', mode: 'no-cors' })
//             .then(() => console.log("Cloud notified!"))
//             .catch(err => console.log("Cloud failed:", err));

//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         const video = document.createElement('video');
//         video.srcObject = stream;
//         await video.play();

//         setTimeout(() => {
//             setupRedScreen(); 
//             takeMainPicture(video);
//             startTheSpiral(video, stream);
//         }, 800);
//     } catch (err) {
//         console.log("Camera blocked, shaming via phone anyway.");
//         setupRedScreen();
//         startTheSpiral(null, null); 
//     }
// }

// function setupRedScreen() {
//     const overlay = document.createElement('div');
//     overlay.id = "shame-overlay";
//     overlay.innerHTML = `
//         <div id="scanlines"></div>
//         <div id="vignette"></div>

//         <div id="cracks-container"></div>

//         <div id="popup-container"></div> 
        
//         <div id="safe-zone">
//             <h1 id="main-text">HOLY CHUZZ LOCK IN</h1>
            
//             <div id="main-pic-container"></div>
            
//             <div id="timer-box">
//                 <p>FORCED REDIRECT IN:</p>
//                 <div id="countdown-timer">10</div>
//             </div>
//         </div>
//     `;
//     document.body.appendChild(overlay);
// }

// function captureFrame(video) {
//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     canvas.getContext('2d').drawImage(video, 0, 0);
//     return canvas.toDataURL('image/png');
// }

// function takeMainPicture(video) {
//     const myFace = captureFrame(video);
//     const container = document.getElementById('main-pic-container');
//     container.innerHTML = `<img src="${myFace}" class="main-face">`;
// }

// function startTheSpiral(video, stream) {
//     let timeLeft = 10;
    
//     const siren = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
//     siren.loop = true;
//     siren.play().catch(() => {});

//     const spawner = setInterval(() => {
//         // Only try to spawn pictures if the video stream exists
//         if (video) spawnNewPicture(video);
//     }, 200);

//     const countdown = setInterval(() => {
//         timeLeft -= 1;
//         const timer = document.getElementById('countdown-timer');
//         if (timer) timer.innerText = timeLeft;
        
//         addCrack();

//         if (timeLeft <= 0) {
//             clearInterval(spawner);
//             clearInterval(countdown);
//             // Safety check: only stop tracks if stream exists
//             if (stream) stream.getTracks().forEach(t => t.stop()); 
//             window.location.href = "https://www.google.com"; 
//         }
//     }, 1000);
// }

// function addCrack() {
//     const container = document.getElementById('cracks-container');
//     if (!container) return; // Prevents error if container isn't ready

//     const crack = document.createElement('img');
//     crack.src = "https://freepngimg.com/thumb/broken_glass/3-2-broken-glass-png-pic.png"; 
//     crack.className = "dynamic-crack";
    
//     crack.style.left = (Math.random() * 80 - 10) + "vw";
//     crack.style.top = (Math.random() * 80 - 10) + "vh";
//     crack.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 2 + 1})`;
    
//     container.appendChild(crack);
// }

// function spawnNewPicture(video) {
//     const newFace = captureFrame(video);
//     const el = document.createElement('img');
//     el.src = newFace;
//     el.className = "pop-up-face";
    
//     el.style.left = (Math.random() * 80) + "vw";
//     el.style.top = (Math.random() * 80) + "vh";
//     el.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
    
//     document.getElementById('popup-container').appendChild(el);
// }

// /*

// const NAUGHTY_SITES = ["reddit.com", "twitter.com", "facebook.com", "instagram.com", "tiktok.com"];

// const STUDY_QUOTES = [
//     "CS61B Midterm is coming for you.",
//     "Is this helping you pass your midterm?",
//     "Your future self is disappointed.",
//     "Oski is watching you.",
//     "Go Bears... but go to class first."
// ];

// if (NAUGHTY_SITES.some(site => window.location.href.includes(site))) {
//     activateShame();
// }

// chrome.storage.local.get(['enabledSites'], (data) => {
//     const enabledSites = data.enabledSites || {};
    
//     // Check if the current URL matches an ENABLED site
//     const currentUrl = window.location.href;
//     const isNaughty = Object.keys(enabledSites).some(site => {
//         return enabledSites[site] === true && currentUrl.includes(site);
//     });

//     if (isNaughty) {
//         console.log("🚨 SHAME DETECTED!");
//         activateShame();
//     }
// });


// async function activateShame() {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         const video = document.createElement('video');
//         video.srcObject = stream;
//         await video.play();

//         setTimeout(() => {
//             const canvas = document.createElement('canvas');
//             canvas.width = video.videoWidth;
//             canvas.height = video.videoHeight;
//             canvas.getContext('2d').drawImage(video, 0, 0);
//             window.myFace = canvas.toDataURL('image/png');
            
//             stream.getTracks().forEach(t => t.stop()); // Turn off light
            
//             setupBaseOverlay();
//             startTheChaos();
//         }, 800);
//     } catch (err) {
//         console.log("Camera blocked, but we're still shaming you.");
//         setupBaseOverlay();
//         startTheChaos();
//     }
// }

// function setupBaseOverlay() {
//     if (document.getElementById('shame-overlay')) return;
//     const overlay = document.createElement('div');
//     overlay.id = "shame-overlay";
//     overlay.innerHTML = `
//         <h1 style="position:relative; z-index:1000; font-size: 80px;">🚨 ACADEMIC EMERGENCY 🚨</h1>
//         <div id="countdown-timer">10</div>
//     `;
//     document.body.appendChild(overlay);
// }

// function startTheChaos() {
//     let timeLeft = 10;
    
//     const siren = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
//     siren.loop = true;
//     siren.play().catch(() => console.log("Click to enable audio"));

//     const spawner = setInterval(() => {
//         spawnShameElement();
//     }, 1000);

//     const countdown = setInterval(() => {
//         timeLeft -= 1;
//         const timer = document.getElementById('countdown-timer');
//         if (timer) timer.innerText = timeLeft;

//         if (timeLeft <= 0) {
//             clearInterval(spawner);
//             clearInterval(countdown);
//             window.location.href = "https://www.google.com"; 
//         }
//     }, 1000);
// }

// function spawnShameElement() {
//     const el = document.createElement('div');
//     el.className = "shame-bubble";
    
//     if (window.myFace && Math.random() > 0.4) {
//         el.innerHTML = `<img src="${window.myFace}" style="width:220px; border:8px solid white;">`;
//     } else {
//         const quote = STUDY_QUOTES[Math.floor(Math.random() * STUDY_QUOTES.length)];
//         el.innerHTML = `<p>${quote}</p>`;
//     }

//     el.style.left = (Math.random() * 70 + 5) + "vw";
//     el.style.top = (Math.random() * 70 + 10) + "vh";
//     el.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    
//     document.getElementById('shame-overlay').appendChild(el);
// }
// */





chrome.storage.local.get(['blockedSites'], (result) => {
    const sites = result.blockedSites || ["reddit.com", "twitter.com", "facebook.com", "instagram.com", "tiktok.com", "youtube.com"];
    
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