// === Protezione Anti-Attacco (Adattata) ===
window.addEventListener('load', () => {
  detectDevTools();
  detectIframeInjection();
  detectUnusualTiming();
  detectUserAgent();
});

function blockUser(reason) {
  logToFirebase(reason);
  console.warn("ATTACCO BLOCCATO:", reason);
  alert("Attacco bloccato: " + reason);
  document.body.innerHTML = `<div style="color:red; text-align:center; margin-top:100px;">
    <h1>Sito bloccato per attività sospette</h1><p>${reason}</p></div>`;
}

function detectDevTools() {
  let devToolsOpened = false;
  const threshold = 250;
  let detectionTimer;

  setInterval(() => {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;

    if (widthDiff > threshold || heightDiff > threshold) {
      if (!devToolsOpened && !detectionTimer) {
        detectionTimer = setTimeout(() => {
          devToolsOpened = true;
          blockUser("DevTools rilevati (tolleranza applicata)");
        }, 1000);
      }
    } else {
      if (detectionTimer) {
        clearTimeout(detectionTimer);
        detectionTimer = null;
      }
      devToolsOpened = false;
    }
  }, 500);
}

function detectIframeInjection() {
  if (window.top !== window.self) {
    blockUser("Esecuzione in iframe non autorizzato");
  }
}

function detectUnusualTiming() {
  let start = Date.now();
  setTimeout(() => {
    if (Date.now() - start > 2000) {
      blockUser("Debugger o delay artificiale rilevato");
    }
  }, 100);
}

function detectUserAgent() {
  const suspiciousAgents = [/curl/i, /wget/i, /postman/i, /python/i];
  const ua = navigator.userAgent;
  if (suspiciousAgents.some(r => r.test(ua))) {
    blockUser("User-Agent sospetto: " + ua);
  }
}

function logToFirebase(reason) {
  try {
    console.log("Logging to Firebase (simulated):", reason);
  } catch (e) {
    console.warn("Log fallito:", e);
  }
}