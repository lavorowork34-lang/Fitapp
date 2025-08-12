// Effetto 3D per tutte le cards del sito
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleziona tutte le cards principali
    const cardSelectors = [
        '.card-uno',        // Card allenamento
        '.card-two',        // Card documenti
        '.cuno',            // Card passi
        '.cdue',            // Card peso
        '.ctre',            // Card piano alimentare
        '.Progressi'        // Card orologio/fitness
    ];
    
    // Applica l'effetto 3D a ogni tipo di card
    cardSelectors.forEach(selector => {
        const cards = document.querySelectorAll(selector);
        
        cards.forEach(card => {
            // Aggiungi stili CSS necessari per l'effetto 3D
            card.style.transformStyle = 'preserve-3d';
            card.style.transition = 'transform 0.3s ease-out';
            card.style.cursor = 'pointer';
            
            // Trova l'immagine nella card (se presente)
            const img = card.querySelector('img');
            if (img) {
                img.style.transition = 'transform 0.3s ease-out';
                img.style.transformStyle = 'preserve-3d';
            }
            
            // Event listener per il movimento del mouse
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calcola la rotazione basata sulla posizione del mouse
                const rotateX = ((y - centerY) / centerY) * 12; // Intensità rotazione X
                const rotateY = ((x - centerX) / centerX) * 12; // Intensità rotazione Y
                
                // Applica la trasformazione 3D alla card
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${-rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(20px)
                `;
                
                // Effetto parallax sull'immagine (se presente)
                if (img) {
                    const parallaxX = ((x - centerX) / centerX) * 8;
                    const parallaxY = ((y - centerY) / centerY) * 8;
                    
                    img.style.transform = `
                        translateX(${parallaxX}px) 
                        translateY(${parallaxY}px) 
                        scale(1.05)
                    `;
                }
                
                // Effetto glow al hover
                card.style.boxShadow = `
                    ${rotateY * 2}px ${-rotateX * 2}px 30px rgba(0, 123, 255, 0.15),
                    0 0 20px rgba(255, 255, 255, 0.1)
                `;
            });
            
            // Event listener quando il mouse esce dalla card
            card.addEventListener('mouseleave', function() {
                // Resetta le trasformazioni
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                card.style.boxShadow = 'none';
                
                // Resetta l'immagine
                if (img) {
                    img.style.transform = 'translateX(0px) translateY(0px) scale(1)';
                }
            });
            
            // Effetto di "pressing" al click
            card.addEventListener('mousedown', function() {
                card.style.transform = 'perspective(1000px) scale(0.98) translateZ(-10px)';
                card.style.transition = 'transform 0.1s ease-in';
            });
            
            card.addEventListener('mouseup', function() {
                card.style.transition = 'transform 0.3s ease-out';
            });
        });
    });
    
    // Funzione per cards speciali con effetti personalizzati
    function applySpecialEffects() {
        // Effetto speciale per la card dei passi (cerchi concentrici)
        const passiCard = document.querySelector('.cuno');
        if (passiCard) {
            const cerchi = passiCard.querySelectorAll('.cerchio-1, .cerchio-2');
            
            passiCard.addEventListener('mousemove', function(e) {
                const rect = passiCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                cerchi.forEach((cerchio, index) => {
                    const intensity = (index + 1) * 5;
                    const rotateX = ((y - centerY) / centerY) * intensity;
                    const rotateY = ((x - centerX) / centerX) * intensity;
                    
                    cerchio.style.transform = `
                        rotateX(${-rotateX}deg) 
                        rotateY(${rotateY}deg) 
                        translateZ(${intensity * 2}px)
                    `;
                    cerchio.style.transition = 'transform 0.2s ease-out';
                });
            });
            
            passiCard.addEventListener('mouseleave', function() {
                cerchi.forEach(cerchio => {
                    cerchio.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
                });
            });
        }
        
        // Effetto speciale per la card del peso
        const pesoCard = document.querySelector('.cdue');
        if (pesoCard) {
            const containerValutazione = pesoCard.querySelector('.container-valutazione');
            
            pesoCard.addEventListener('mousemove', function(e) {
                if (containerValutazione) {
                    const rect = pesoCard.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const moveX = ((x - centerX) / centerX) * 5;
                    const moveY = ((y - centerY) / centerY) * 5;
                    
                    containerValutazione.style.transform = `
                        translateX(${moveX}px) 
                        translateY(${moveY}px) 
                        translateZ(15px)
                    `;
                    containerValutazione.style.transition = 'transform 0.2s ease-out';
                }
            });
            
            pesoCard.addEventListener('mouseleave', function() {
                if (containerValutazione) {
                    containerValutazione.style.transform = 'translateX(0px) translateY(0px) translateZ(0px)';
                }
            });
        }
    }
    
    // Applica gli effetti speciali
    applySpecialEffects();
    
    console.log('Effetti 3D applicati a tutte le cards!');
});

// Funzione per ottimizzare le performance (Nota: questa funzione non ha un effetto visibile nel tuo codice attuale
// perché 'updateTransforms' è vuoto. È solo uno scheletro per future ottimizzazioni.)
function optimizePerformance() {
    let ticking = false;
    
    function updateTransforms(e) {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Le trasformazioni vengono applicate qui
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Applica l'ottimizzazione solo se necessario per performance
    const cards = document.querySelectorAll('.card-uno, .card-two, .cuno, .cdue, .ctre, .Progressi');
    cards.forEach(card => {
        card.addEventListener('mousemove', updateTransforms);
    });
}

// Variabili globali per orologio e timer
let tempoInizio = Date.now();
let intervalloOrologio;
let intervalloTimer;
let fusoOrario = null;
let posizioneRilevata = false;

// Mappa delle coordinate ai fusi orari (semplificata)
function ottienieFusoOrario(lat, lng) {
    // Europa
    if (lat >= 35 && lat <= 71 && lng >= -10 && lng <= 40) {
        if (lng >= -10 && lng <= 5) return 'Europe/London';
        if (lng >= 5 && lng <= 15) return 'Europe/Rome';
        if (lng >= 15 && lng <= 25) return 'Europe/Berlin';
        if (lng >= 25 && lng <= 40) return 'Europe/Athens';
    }
    // Nord America
    if (lat >= 25 && lat <= 70 && lng >= -170 && lng <= -50) {
        if (lng >= -125) return 'America/New_York';
        if (lng >= -140) return 'America/Denver';
        return 'America/Los_Angeles';
    }
    // Asia
    if (lat >= 10 && lat <= 70 && lng >= 70 && lng <= 150) {
        if (lng <= 90) return 'Asia/Kolkata';
        if (lng <= 120) return 'Asia/Shanghai';
        return 'Asia/Tokyo';
    }
    // Default: UTC
    return 'UTC';
}

// Funzione per richiedere la geolocalizzazione
function richiediPosizione() {
    const elementoOra = document.getElementById('oraCorrente');
    
    if (!navigator.geolocation) {
        if (elementoOra) {
            elementoOra.textContent = 'Geolocalizzazione non supportata';
        }
        return;
    }

    if (elementoOra) {
        elementoOra.textContent = 'Richiesta accesso alla posizione...';
    }

    navigator.geolocation.getCurrentPosition(
        // Successo
        function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            fusoOrario = ottienieFusoOrario(lat, lng);
            posizioneRilevata = true;
            
            console.log(`Posizione: ${lat.toFixed(2)}, ${lng.toFixed(2)}`);
            console.log(`Fuso orario rilevato: ${fusoOrario}`);
            
            // Aggiorna immediatamente l'ora
            aggiornaOraCorrente();
        },
        // Errore
        function(error) {
            let messaggio = '';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    messaggio = 'Accesso alla posizione negato';
                    break;
                case error.POSITION_UNAVAILABLE:
                    messaggio = 'Posizione non disponibile';
                    break;
                case error.TIMEOUT:
                    messaggio = 'Timeout richiesta posizione';
                    break;
                default:
                    messaggio = 'Errore sconosciuto';
                    break;
            }
            
            if (elementoOra) {
                elementoOra.textContent = messaggio + ' - Uso ora locale';
            }
            
            // Usa l'ora locale se la geolocalizzazione fallisce
            fusoOrario = Intl.DateTimeFormat().resolvedOptions().timeZone;
            posizioneRilevata = false;
            aggiornaOraCorrente();
        },
        // Opzioni
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minuti
        }
    );
}

// Funzione per aggiornare l'ora corrente basata sulla posizione
function aggiornaOraCorrente() {
    const ora = new Date();
    
    if (fusoOrario) {
        const oraLocalizzata = ora.toLocaleTimeString('it-IT', {
            timeZone: fusoOrario,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const elementoOra = document.getElementById('oraCorrente');
        if (elementoOra) {
            const tipoOra = posizioneRilevata ? 'Ora locale (GPS)' : 'Ora locale';
            elementoOra.textContent = `${tipoOra}: ${oraLocalizzata} (${fusoOrario})`;
        }
    }
}

// Funzione per aggiornare il timer
function aggiornaTimer() {
    const tempoAttuale = Date.now();
    const tempoTrascorso = Math.floor((tempoAttuale - tempoInizio) / 1000);
    
    const ore = Math.floor(tempoTrascorso / 3600);
    const minuti = Math.floor((tempoTrascorso % 3600) / 60);
    const secondi = tempoTrascorso % 60;
    
    let testoTimer = '';
    if (ore > 0) {
        testoTimer = `${ore}h ${minuti}m ${secondi}s`;
    } else if (minuti > 0) {
        testoTimer = `${minuti}m ${secondi}s`;
    } else {
        testoTimer = `${secondi}s`;
    }
    
    const elementoTimer = document.getElementById('timer');
    if (elementoTimer) {
        elementoTimer.textContent = `Tempo trascorso: ${testoTimer}`;
    }
}

// Funzione per inizializzare tutto
function inizializza() {
    // Richiedi immediatamente la posizione
    richiediPosizione();
    
    // Aggiorna il timer
    aggiornaTimer();
    
    // Avvia gli intervalli
    intervalloOrologio = setInterval(aggiornaOraCorrente, 1000);
    intervalloTimer = setInterval(aggiornaTimer, 1000);
}

// Funzione per fermare tutto
function ferma() {
    if (intervalloOrologio) {
        clearInterval(intervalloOrologio);
    }
    if (intervalloTimer) {
        clearInterval(intervalloTimer);
    }
}

// Funzione per resettare il timer
function resettaTimer() {
    tempoInizio = Date.now();
    aggiornaTimer();
}

// Funzione per richiedere di nuovo la posizione
function aggiornaPosizioneManuale() {
    richiediPosizione();
}

// Avvia tutto quando la pagina è caricata
document.addEventListener('DOMContentLoaded', inizializza);

// Esporta funzioni globali
window.fermaOrologio = ferma;
window.resettaTimer = resettaTimer;
window.aggiornaPosizioneManuale = aggiornaPosizioneManuale;


// ==========================================
// SISTEMA DI TOGGLE TEMA DARK/LIGHT MODE
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Elementi DOM
    const themeToggleBtn = document.querySelector('button');
    // Assicurati che il bottone esista prima di cercare i suoi figli
    if (!themeToggleBtn) {
        console.warn("Bottone per il tema non trovato. Il toggle del tema non funzionerà.");
        return;
    }
    const themeIcon = themeToggleBtn.querySelector('img');
    const themeText = themeToggleBtn.querySelector('p');
    const body = document.body;
    
    // Percorsi delle icone (modifica questi percorsi secondo la tua struttura)
    const moonIcon = 'foto/luna.png';     // Icona per dark mode
    const sunIcon = 'foto/luna.png';      // Icona per light mode (devi creare questa)
    
    // Controlla se c'è una preferenza salvata
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Inizializza il tema
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDarkMode) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
    
    // Event listener per il toggle
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
        
        // Salva la preferenza
        localStorage.setItem('theme', newTheme);
        
        // Animazione del bottone
        themeToggleBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggleBtn.style.transform = 'scale(1)';
        }, 150);
    });
    

    
    // Ascolta i cambiamenti nelle preferenze del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Solo se l'utente non ha una preferenza salvata
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // Funzione per reset del tema (opzionale)
    function resetTheme() {
        localStorage.removeItem('theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDarkMode ? 'dark' : 'light');
    }
    
    // Rendi disponibile la funzione reset globalmente (per debugging)
    window.resetTheme = resetTheme;
    
    // Aggiungi supporto per shortcut da tastiera (opzionale)
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Shift + T per toggle tema
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            themeToggleBtn.click();
        }
    });
    
    // Funzione per ottenere il tema corrente
    function getCurrentTheme() {
        return body.classList.contains('light-mode') ? 'light' : 'dark';
    }
    
    // Rendi disponibile la funzione getCurrentTheme globalmente
    window.getCurrentTheme = getCurrentTheme;
    
    console.log('📱 Menu a scorrimento mobile implementato!');
});

// ==========================================
// FUNZIONI UTILITY PER IL TEMA
// ==========================================

// Funzione per applicare tema personalizzato
function applyCustomTheme(customColors) {
    const root = document.documentElement;
    
    Object.keys(customColors).forEach(property => {
        root.style.setProperty(`--${property}`, customColors[property]);
    });
}

// Funzione per animazione di transizione tema
function animateThemeTransition() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, transparent 0%, rgba(0,0,0,0.8) 100%);
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }, 150);
    });
}

// Event listener per animazione personalizzata (opzionale)
document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.querySelector('button');
    if (themeBtn) {
        themeBtn.addEventListener('click', animateThemeTransition);
    }
});

//Prende le prime cinque lettere del login e le mette su Bentornato <nome utente>
function effettuaLogin() {
  // Prendi i valori inseriti
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // ESEMPIO: Verifica fittizia. Sostituiscila con la tua vera validazione.
  if (email && password) {
    // Salva le prime 5 lettere dell’email
    const primoNome = email.slice(0, 5);
    sessionStorage.setItem("utente", primoNome);

    // Vai alla dashboard
    window.location.href = "../app utente/app.html";
  } else {
    alert("Inserisci email e password.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const utenteElement = document.getElementById("nome-utente");
  if (utenteElement) { // Assicurati che l'elemento esista
    const utente = sessionStorage.getItem("utente"); // o localStorage.getItem("utente");
    
    if (utente) {
      utenteElement.textContent = utente;
    } else {
      utenteElement.textContent = "ospite";
    }
  }
});


// JavaScript per il popup contapassi
class StepCounterPopup {
    constructor() {
        this.currentSteps = 0;
        this.stepElements = null; // Array di tutti gli elementi .passi
        this.popup = null;
        this.countdownElement = null;
        this.resetTimer = null;
        
        this.init();
    }
    
    init() {
        // Carica i passi salvati
        this.loadSteps();
        
        // Trova TUTTI gli elementi dei passi nel DOM (desktop e responsive)
        this.stepElements = document.querySelectorAll('.passi');
        console.log('🔍 StepCounter init - Elementi .passi trovati:', this.stepElements.length);
        
        // Mostra dettagli degli elementi trovati
        this.stepElements.forEach((el, i) => {
            const parent = el.closest('.cerchio-2') ? 'desktop' : el.closest('.content-passi') ? 'mobile' : 'unknown';
            console.log(`📍 Elemento ${i}: ${parent} - testo: "${el.textContent}"`);
        });
        
        // Crea il popup
        this.createPopup();
        
        // Rendi cliccabili tutti gli elementi passi
        this.makeStepsClickable();
        
        // Imposta il reset automatico
        this.setupMidnightReset();
        
        // Aggiorna il display iniziale
        this.updateDisplay();
        
        // Aggiorna il countdown
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 60000);
    }
    
    loadSteps() {
        const saved = localStorage.getItem('dailySteps');
        const lastDate = localStorage.getItem('lastStepDate');
        const today = new Date().toDateString();
        
        // Se è un nuovo giorno, resetta i passi
        if (lastDate !== today) {
            this.currentSteps = 0;
            this.saveSteps();
        } else if (saved) {
            this.currentSteps = parseInt(saved) || 0;
        }
    }
    
    saveSteps() {
        localStorage.setItem('dailySteps', this.currentSteps.toString());
        localStorage.setItem('lastStepDate', new Date().toDateString());
    }
    
    updateDisplay() {
        // Aggiorna tutti gli elementi .passi (desktop e responsive)
        const allStepElements = document.querySelectorAll('.passi');
        allStepElements.forEach(element => {
            element.textContent = this.currentSteps.toLocaleString();
            element.classList.add('passi-updated');
            
            setTimeout(() => {
                element.classList.remove('passi-updated');
            }, 600);
        });
        
        // Aggiorna anche il display nel popup se è aperto
        const currentStepsDisplay = document.getElementById('currentStepsValue');
        if (currentStepsDisplay) {
            currentStepsDisplay.textContent = this.currentSteps.toLocaleString();
        }
        
        // Aggiorna la barra di progresso
        this.updateProgressBar();
    }
    
    updateProgressBar() {
        // Ottieni l'obiettivo corrente dal StepGoalManager
        const stepGoal = window.stepGoalManager ? window.stepGoalManager.stepGoal : 10000;
        
        // Aggiorna la barra di progresso
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            const percentage = Math.min((this.currentSteps / stepGoal) * 100, 100);
            
            progressFill.style.width = percentage + '%';
            
            // Cambia colore se obiettivo raggiunto
            if (percentage >= 100) {
                progressFill.style.background = 'linear-gradient(90deg, #28a745, #20c997)';
                progressText.style.color = '#28a745';
                progressText.textContent = `🎉 ${this.currentSteps.toLocaleString()} / ${stepGoal.toLocaleString()} passi - Obiettivo raggiunto!`;
            } else {
                progressFill.style.background = 'linear-gradient(90deg, var(--circle-gradient-1-start), var(--circle-gradient-1-end))';
                progressText.style.color = 'var(--progress-text)';
                progressText.textContent = `${this.currentSteps.toLocaleString()} / ${stepGoal.toLocaleString()} passi`;
            }
        }
    }
    
    makeStepsClickable() {
        // Approccio più diretto - trova e rendi cliccabili tutti gli elementi .passi
        const allPassiElements = document.querySelectorAll('.passi');
        
        if (allPassiElements.length > 0) {
            console.log(`🔧 Trovati ${allPassiElements.length} elementi .passi`);
            
            allPassiElements.forEach((element, index) => {
                console.log(`🎯 Rendendo cliccabile elemento ${index}`);
                
                // Rimuovi tutti gli event listener precedenti
                const newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);
                
                // Aggiungi il click listener
                newElement.addEventListener('click', (e) => {
                    console.log(`👆 CLICK RILEVATO su elemento ${index}`);
                    e.stopPropagation();
                    this.openPopup();
                });
                
                // Stili per renderlo visibilmente cliccabile
                newElement.style.cursor = 'pointer';
                newElement.style.userSelect = 'none';
                newElement.title = 'Clicca per modificare i passi';
                newElement.classList.add('passi-clickable');
                
                console.log(`✅ Elemento ${index} reso cliccabile`);
            });
            
            // Aggiorna il riferimento
            this.stepElements = document.querySelectorAll('.passi');
        } else {
            console.warn('⚠️ Nessun elemento .passi trovato!');
        }
    }
    
    createPopup() {
        const overlay = document.createElement('div');
        overlay.className = 'step-popup-overlay';
        overlay.innerHTML = `
            <div class="step-popup">
                <div class="step-popup-header">
                    <h3 class="step-popup-title">📊 Contapassi</h3>
                    <button class="step-popup-close" onclick="stepCounter.closePopup()">✕</button>
                </div>
                
                <div class="step-popup-content">
                    <div class="current-steps">
                        Passi attuali:
                        <div class="current-steps-value" id="currentStepsValue">0</div>
                    </div>
                    
                    <input type="number" class="step-input" placeholder="Inserisci passi" min="0" id="stepPopupInput">
                    
                    <div class="step-popup-buttons">
                        <button class="step-btn add-btn" onclick="stepCounter.addStepsFromPopup()">
                            ➕ Aggiungi passi
                        </button>
                        <button class="step-btn set-btn" onclick="stepCounter.setStepsFromPopup()">
                            📝 Imposta passi
                        </button>
                        <button class="step-btn reset-btn" onclick="stepCounter.resetSteps()">
                            🔄 Resetta tutto
                        </button>
                    </div>
                    
                    <div class="reset-info">
                        🌙 Reset automatico tra: <span class="reset-countdown" id="popupCountdown">--</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.popup = overlay;
        this.countdownElement = document.getElementById('popupCountdown');
        
        // Chiudi popup cliccando sull'overlay
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closePopup();
            }
        });
        
        // Chiudi popup con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('active')) {
                this.closePopup();
            }
        });
        
        // Enter nell'input per aggiungere passi
        const input = document.getElementById('stepPopupInput');
        if (input) { // Controllo aggiunto
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addStepsFromPopup();
                }
            });
        }
    }
    
    openPopup() {
        console.log('🔥 Apertura popup passi - currentSteps:', this.currentSteps);
        
        if (this.popup) {
            this.popup.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Aggiorna il valore corrente nel popup
            const currentStepsValue = document.getElementById('currentStepsValue');
            if (currentStepsValue) {
                currentStepsValue.textContent = this.currentSteps.toLocaleString();
                console.log('✅ Aggiornato display popup con:', this.currentSteps);
            } else {
                console.warn('⚠️ currentStepsValue non trovato nel popup');
            }
            
            this.updateCountdown();
            
            // Focus sull'input
            setTimeout(() => {
                const input = document.getElementById('stepPopupInput');
                if (input) {
                    input.focus();
                    input.value = '';
                }
            }, 200);
            
            console.log('✅ Popup passi aperto');
        } else {
            console.error('❌ this.popup non definito!');
        }
    }
    
    closePopup() {
        if (this.popup) {
            this.popup.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Pulisci l'input
            const input = document.getElementById('stepPopupInput');
            if (input) input.value = '';
        }
    }
    
    addStepsFromPopup() {
        const input = document.getElementById('stepPopupInput');
        if (!input) { // Controllo aggiunto
            this.showFeedback('Errore: Input passi non trovato.', 'warning');
            return;
        }
        const steps = parseInt(input.value);
        
        if (steps && steps > 0) {
            this.currentSteps += steps;
            this.saveSteps();
            this.updateDisplay();
            this.showFeedback(`+${steps.toLocaleString()} passi aggiunti!`, 'success');
            input.value = '';
        } else {
            this.showFeedback('Inserisci un numero valido!', 'warning');
        }
    }
    
    setStepsFromPopup() {
        const input = document.getElementById('stepPopupInput');
        if (!input) { // Controllo aggiunto
            this.showFeedback('Errore: Input passi non trovato.', 'warning');
            return;
        }
        const steps = parseInt(input.value);
        
        if (steps >= 0) {
            this.currentSteps = steps;
            this.saveSteps();
            this.updateDisplay();
            this.showFeedback(`Passi impostati a ${steps.toLocaleString()}`, 'info');
            input.value = '';
        } else {
            this.showFeedback('Inserisci un numero valido!', 'warning');
        }
    }
    
    resetSteps() {
        this.currentSteps = 0;
        this.saveSteps();
        this.updateDisplay();
        this.showFeedback('Passi resettati!', 'warning');
        
        // Pulisci l'input
        const input = document.getElementById('stepPopupInput');
        if (input) input.value = '';
    }
    
    setupMidnightReset() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const msUntilMidnight = tomorrow.getTime() - now.getTime();
        
        this.resetTimer = setTimeout(() => {
            this.resetSteps();
            this.showFeedback('🌙 Reset automatico a mezzanotte!', 'info');
            
            // Imposta il prossimo reset
            setInterval(() => {
                this.resetSteps();
            }, 24 * 60 * 60 * 1000); // Ogni 24 ore
        }, msUntilMidnight);
    }
    
    updateCountdown() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const msUntilMidnight = tomorrow.getTime() - now.getTime();
        const hours = Math.floor(msUntilMidnight / (1000 * 60 * 60));
        const minutes = Math.floor((msUntilMidnight % (1000 * 60 * 60)) / (1000 * 60));
        
        const countdownText = `${hours}h ${minutes}m`;
        
        if (this.countdownElement) {
            this.countdownElement.textContent = countdownText;
        }
    }
    
    showFeedback(message, type = 'info') {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'warning' ? '#dc3545' : '#007bff'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 1001;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }
}

// CSS per le animazioni di feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    /* Stili per il popup del contapassi */
    .step-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6); /* Sfondo semi-trasparente */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .step-popup-overlay.active {
        opacity: 1;
        visibility: visible;
    }

    .step-popup {
        background-color: var(--card-background); /* Usa la variabile del tema */
        color: var(--text-color-primary);
        padding: 25px 30px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        width: 90%;
        max-width: 400px;
        transform: translateY(-20px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .step-popup-overlay.active .step-popup {
        transform: translateY(0);
        opacity: 1;
    }

    .step-popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--border-color); /* Colore del bordo */
        padding-bottom: 15px;
        margin-bottom: 15px;
    }

    .step-popup-title {
        margin: 0;
        font-size: 1.6em;
        font-weight: 600;
    }

    .step-popup-close {
        background: none;
        border: none;
        font-size: 1.8em;
        color: var(--text-color-secondary);
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 50%;
        transition: background-color 0.2s ease, color 0.2s ease;
    }

    .step-popup-close:hover {
        background-color: var(--hover-background);
        color: var(--accent-color);
    }

    .current-steps {
        font-size: 1.1em;
        text-align: center;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .current-steps-value {
        font-size: 2.2em;
        font-weight: bold;
        color: var(--accent-color); /* Colore accento */
        background-color: var(--input-background);
        padding: 10px 20px;
        border-radius: 8px;
        min-width: 150px;
        text-align: center;
        box-shadow: inset 0 2px 5px rgba(0,0,0,0.1);
    }

    .step-input {
        width: calc(100% - 20px);
        padding: 12px;
        margin: 10px 0;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background-color: var(--input-background);
        color: var(--text-color-primary);
        font-size: 1em;
        box-sizing: border-box;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .step-input:focus {
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(var(--accent-color-rgb), 0.2);
        outline: none;
    }

    .step-popup-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        margin-top: 10px;
    }

    .step-btn {
        padding: 12px 18px;
        border: none;
        border-radius: 8px;
        font-size: 0.95em;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
        flex-grow: 1;
        min-width: 140px;
        text-align: center;
    }

    .add-btn {
        background-color: #28a745; /* Verde per aggiungere */
        color: white;
    }
    .add-btn:hover {
        background-color: #218838;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(40, 167, 69, 0.3);
    }

    .set-btn {
        background-color: #007bff; /* Blu per impostare */
        color: white;
    }
    .set-btn:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
    }

    .reset-btn {
        background-color: #dc3545; /* Rosso per resettare */
        color: white;
    }
    .reset-btn:hover {
        background-color: #c82333;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(220, 53, 69, 0.3);
    }

    .reset-info {
        font-size: 0.9em;
        text-align: center;
        margin-top: 15px;
        color: var(--text-color-secondary);
    }

    .reset-countdown {
        font-weight: bold;
        color: var(--accent-color);
    }

    /* Variabili CSS di esempio (devono essere definite nel tuo CSS principale o nel body) */
    body {
        --card-background: #2a2a2a;
        --text-color-primary: #f0f0f0;
        --text-color-secondary: #aaaaaa;
        --border-color: #444;
        --input-background: #3a3a3a;
        --accent-color: #007bff;
        --accent-color-rgb: 0, 123, 255;
        --hover-background: rgba(255, 255, 255, 0.1);
    }

    body.light-mode {
        --card-background: #ffffff;
        --text-color-primary: #333333;
        --text-color-secondary: #666666;
        --border-color: #ddd;
        --input-background: #f0f0f0;
        --accent-color: #007bff;
        --accent-color-rgb: 0, 123, 255;
        --hover-background: rgba(0, 0, 0, 0.05);
    }
`;
document.head.appendChild(style);

// Inizializza il contapassi quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    window.stepCounter = new StepCounterPopup();
});

// Aggiorna i passi quando la pagina è completamente caricata
window.addEventListener('load', () => {
    if (window.stepCounter) {
        window.stepCounter.updateDisplay();
    }
});

// ==========================================
//   FUNZIONI MENU A SCORRIMENTO MOBILE
// ==========================================

// Funzione per gestire lo scorrimento fluido del menu
function initScrollMenu() {
    const scrollMenu = document.querySelector('.scroll-menu');
    const scrollContainer = document.querySelector('.scroll-menu-container');
    
    if (!scrollMenu || !scrollContainer) return;
    
    // Aggiungi indicatori di scorrimento se necessario
    function updateScrollIndicators() {
        const canScrollLeft = scrollContainer.scrollLeft > 0;
        const canScrollRight = scrollContainer.scrollLeft < (scrollContainer.scrollWidth - scrollContainer.clientWidth);
        
        // Aggiungi classi per indicatori visivi (opzionale)
        scrollContainer.classList.toggle('can-scroll-left', canScrollLeft);
        scrollContainer.classList.toggle('can-scroll-right', canScrollRight);
    }
    
    // Event listener per aggiornare gli indicatori
    scrollContainer.addEventListener('scroll', updateScrollIndicators);
    
    // Inizializza gli indicatori
    updateScrollIndicators();
    
    // Scorrimento fluido con touch/swipe
    let isDown = false;
    let startX;
    let scrollLeft;
    
    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.classList.add('active');
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });
    
    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.classList.remove('active');
    });
    
    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        scrollContainer.classList.remove('active');
    });
    
    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
}

// Event listener per inizializzare il menu a scorrimento
document.addEventListener('DOMContentLoaded', function() {
    initScrollMenu();
    
    // Aggiungi effetti di feedback tattile per i menu items
    const menuItems = document.querySelectorAll('.scroll-menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(0) scale(0.95)';
        });
        
        item.addEventListener('touchend', function() {
            this.style.transform = '';
        });
        
        item.addEventListener('touchcancel', function() {
            this.style.transform = '';
        });
    });
});

// ==========================================
//   FUNZIONI MODAL SOCIAL
// ==========================================

// Funzione per aprire il modal social
function openSocialModal() {
    const modal = document.getElementById('socialModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animazione di entrata
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

// Funzione per chiudere il modal social
function closeSocialModal() {
    const modal = document.getElementById('socialModal');
    if (modal) {
        modal.classList.remove('active');
        
        // Aspetta la fine dell'animazione prima di nascondere
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

// Funzione per copiare il link
function copyLink() {
    const shareLink = document.getElementById('shareLink');
    if (shareLink) {
        shareLink.select();
        shareLink.setSelectionRange(0, 99999); // Per mobile
        
        try {
            document.execCommand('copy');
            
            // Feedback visivo
            const copyBtn = document.querySelector('.copy-btn');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiato!';
                copyBtn.style.background = '#28a745';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.background = '';
                }, 2000);
            }
        } catch (err) {
            console.error('Errore nella copia:', err);
            alert('Link copiato negli appunti!');
        }
    }
}

// Funzioni per condivisione social
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Scopri questa fantastica app fitness!');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Scopri questa fantastica app fitness! 🏃‍♂️💪');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Scopri questa fantastica app fitness! 🏃‍♂️💪');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

function shareOnTelegram() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Scopri questa fantastica app fitness!');
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}

// Event listener per chiudere modal cliccando fuori
document.addEventListener('click', function(e) {
    const modal = document.getElementById('socialModal');
    if (modal && e.target === modal) {
        closeSocialModal();
    }
});

// ==========================================
//   FUNZIONE TOGGLE TEMA
// ==========================================

function toggleTheme() {
    const body = document.body;
    
    // Toggle della classe light-mode
    body.classList.toggle('light-mode');
    
    // Aggiorna le icone del tema
    updateThemeIcons();
    
    // Salva la preferenza
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        console.log(' Tema chiaro attivato');
    } else {
        localStorage.setItem('theme', 'dark');
        console.log('Tema scuro attivato');
    }
}

function updateThemeIcons() {
    const body = document.body;
    const isLightMode = body.classList.contains('light-mode');
    
    // Trova tutte le icone del tema (desktop e mobile)
    const themeIcons = document.querySelectorAll('button img[src*="luna"], .theme-button img[src*="luna"], button img[src*="sole"], .theme-button img[src*="sole"]');
    
    themeIcons.forEach(icon => {
        if (isLightMode) {
            // Cambia a icona sole per tema chiaro (usa icona online come fallback)
            icon.src = 'foto/luna.png';
            icon.alt = 'Sole';
        } else {
            // Cambia a icona luna per tema scuro
            icon.src = 'foto/luna.png';
            icon.alt = 'Luna';
        }
    });
}

// Carica il tema salvato all'avvio
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    // Aggiorna le icone del tema all'avvio
    setTimeout(updateThemeIcons, 100);
});

console.log('📱 Menu a scorrimento mobile implementato!');

// ==========================================
// CLASSE PER LA GESTIONE OBIETTIVI PASSI
// ==========================================

class StepGoalManager {
    constructor() {
        this.stepGoal = 10000; // Default 10.000 passi
        this.stepGoalElements = null;
        this.popup = null;
        
        this.init();
    }
    
    init() {
        // Carica l'obiettivo salvato
        this.loadStepGoal();
        
        // Trova gli elementi dell'obiettivo passi nel DOM
        this.stepGoalElements = {
            desktop: document.querySelector('.cerchio-2 p:first-of-type'), // Il primo <p> nella cerchio-2 (10.000)
            responsive: document.querySelector('.content-passi p:first-of-type'), // Il primo <p> nella content-passi (10.000)
            progressText: document.querySelector('.progress-text'),
            goalTextElements: document.querySelectorAll('.step-goal-text')
        };
        
        // Crea il popup
        this.createPopup();
        
        // Rendi cliccabile l'elemento obiettivo
        this.makeStepGoalClickable();
        
        // Aggiorna il display iniziale
        this.updateDisplay();
        
        // Debug info
        console.log('🎯 StepGoalManager inizializzato:');
        console.log('- Desktop element:', this.stepGoalElements.desktop);
        console.log('- Responsive element:', this.stepGoalElements.responsive);
        console.log('- Current goal:', this.stepGoal);
    }
    
    loadStepGoal() {
        const savedGoal = localStorage.getItem('stepGoal');
        const savedGoalDate = localStorage.getItem('stepGoalDate');
        const today = new Date().toDateString();
        
        // Se è un nuovo giorno, mantiene l'obiettivo salvato
        if (savedGoal) {
            this.stepGoal = parseInt(savedGoal);
        } else {
            // Default 10.000 passi
            this.stepGoal = 10000;
            this.saveStepGoal();
        }
    }
    
    saveStepGoal() {
        localStorage.setItem('stepGoal', this.stepGoal.toString());
        localStorage.setItem('stepGoalDate', new Date().toDateString());
    }
    
    updateDisplay() {
        // Aggiorna obiettivo passi (versione desktop/cerchi)
        if (this.stepGoalElements.desktop) {
            this.stepGoalElements.desktop.textContent = this.stepGoal.toLocaleString();
            this.stepGoalElements.desktop.classList.add('step-goal-display');
        }
        
        // Aggiorna obiettivo passi (versione responsive)
        if (this.stepGoalElements.responsive) {
            this.stepGoalElements.responsive.textContent = this.stepGoal.toLocaleString();
            this.stepGoalElements.responsive.classList.add('step-goal-display');
        }
        
        // Aggiorna tutti gli elementi con classe step-goal-text
        this.stepGoalElements.goalTextElements.forEach(element => {
            if (element) {
                element.textContent = this.stepGoal.toLocaleString();
            }
        });
        
        // Aggiorna la barra di progresso se StepCounter è disponibile
        if (window.stepCounter && window.stepCounter.updateProgressBar) {
            window.stepCounter.updateProgressBar();
        }
    }
    
    makeStepGoalClickable() {
        // Rendi cliccabile l'obiettivo passi (desktop)
        if (this.stepGoalElements.desktop) {
            this.stepGoalElements.desktop.classList.add('step-goal-display');
            this.stepGoalElements.desktop.style.cursor = 'pointer';
            this.stepGoalElements.desktop.style.userSelect = 'none';
            this.stepGoalElements.desktop.addEventListener('click', () => {
                console.log('👆 Click su obiettivo desktop');
                this.openPopup();
            });
            this.stepGoalElements.desktop.title = 'Clicca per modificare l\'obiettivo passi';
        }
        
        // Rendi cliccabile l'obiettivo passi (responsive)
        if (this.stepGoalElements.responsive) {
            this.stepGoalElements.responsive.classList.add('step-goal-display');
            this.stepGoalElements.responsive.style.cursor = 'pointer';
            this.stepGoalElements.responsive.style.userSelect = 'none';
            this.stepGoalElements.responsive.addEventListener('click', () => {
                console.log('👆 Click su obiettivo responsive');
                this.openPopup();
            });
            this.stepGoalElements.responsive.title = 'Clicca per modificare l\'obiettivo passi';
        }
        
        console.log('✅ Obiettivi passi resi cliccabili');
    }
    
    createPopup() {
        const overlay = document.createElement('div');
        overlay.className = 'step-goal-popup-overlay';
        overlay.innerHTML = `
            <div class="step-goal-popup">
                <div class="step-goal-popup-header">
                    <h3 class="step-goal-popup-title">🎯 Obiettivo Passi Giornaliero</h3>
                    <button class="step-goal-popup-close" onclick="stepGoalManager.closePopup()">✕</button>
                </div>
                
                <div class="step-goal-popup-content">
                    <div class="current-goal">
                        Obiettivo attuale:
                        <div class="current-goal-value" id="currentGoalValue">${this.stepGoal.toLocaleString()} passi</div>
                    </div>
                    
                    <div class="preset-goals">
                        <h4>Obiettivi predefiniti:</h4>
                        <div class="preset-buttons">
                            <button class="preset-btn" onclick="stepGoalManager.setPresetGoal(5000)">5.000</button>
                            <button class="preset-btn" onclick="stepGoalManager.setPresetGoal(8000)">8.000</button>
                            <button class="preset-btn" onclick="stepGoalManager.setPresetGoal(10000)">10.000</button>
                            <button class="preset-btn" onclick="stepGoalManager.setPresetGoal(12000)">12.000</button>
                            <button class="preset-btn" onclick="stepGoalManager.setPresetGoal(15000)">15.000</button>
                            <button class="preset-btn" onclick="stepGoalManager.setPresetGoal(20000)">20.000</button>
                        </div>
                    </div>
                    
                    <input type="number" class="step-goal-input" placeholder="Inserisci obiettivo personalizzato" min="1000" max="100000" step="500" id="stepGoalInput">
                    
                    <div class="step-goal-popup-buttons">
                        <button class="step-goal-btn set-btn" onclick="stepGoalManager.setCustomGoal()">
                            📝 Imposta obiettivo
                        </button>
                        <button class="step-goal-btn reset-btn" onclick="stepGoalManager.resetToDefault()">
                            🔄 Reset a default
                        </button>
                    </div>
                    
                    <div class="goal-info">
                        <p>💡 Suggerimento: L'OMS raccomanda almeno 10.000 passi al giorno per una vita sana.</p>
                        <p>📊 Il tuo obiettivo verrà salvato automaticamente e resettato ogni giorno.</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.popup = overlay;
        
        // Chiudi popup cliccando sull'overlay
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closePopup();
            }
        });
        
        // Chiudi popup con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('active')) {
                this.closePopup();
            }
        });
        
        // Enter nell'input per impostare obiettivo
        const input = document.getElementById('stepGoalInput');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.setCustomGoal();
                }
            });
        }
    }
    
    openPopup() {
        if (this.popup) {
            this.popup.classList.add('active');
            this.updateDisplay();
            
            // Focus sull'input
            setTimeout(() => {
                const input = document.getElementById('stepGoalInput');
                if (input) input.focus();
            }, 300);
        }
    }
    
    closePopup() {
        if (this.popup) {
            this.popup.classList.remove('active');
            
            // Pulisci l'input
            const input = document.getElementById('stepGoalInput');
            if (input) input.value = '';
        }
    }
    
    setPresetGoal(steps) {
        this.stepGoal = steps;
        this.saveStepGoal();
        this.updateDisplay();
        this.showFeedback(`Obiettivo impostato a ${steps.toLocaleString()} passi!`, 'success');
        this.closePopup();
    }
    
    setCustomGoal() {
        const input = document.getElementById('stepGoalInput');
        if (!input) {
            this.showFeedback('Errore: Input obiettivo non trovato.', 'warning');
            return;
        }
        
        const steps = parseInt(input.value);
        
        if (steps && steps >= 1000 && steps <= 100000) {
            this.stepGoal = steps;
            this.saveStepGoal();
            this.updateDisplay();
            this.showFeedback(`Obiettivo personalizzato impostato a ${steps.toLocaleString()} passi!`, 'success');
            input.value = '';
            this.closePopup();
        } else {
            this.showFeedback('Inserisci un obiettivo valido (1.000-100.000 passi)!', 'warning');
        }
    }
    
    resetToDefault() {
        this.stepGoal = 10000;
        this.saveStepGoal();
        this.updateDisplay();
        this.showFeedback('Obiettivo resettato a 10.000 passi (default)!', 'info');
        this.closePopup();
    }
    
    showFeedback(message, type = 'info') {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'warning' ? '#dc3545' : '#007bff'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 1001;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }
}

// ==========================================
// CLASSE PER IL TRACKER DEL PESO
// ==========================================

class WeightTrackerPopup {
    constructor() {
        this.weightHistory = []; // Array per memorizzare [pesoAttuale, pesoPrecedente]
        this.currentWeight = null;
        this.previousWeight = null;
        this.lastWeightDate = null; // Data dell'ultimo aggiornamento peso
        this.weightElements = null;
        this.popup = null;
        
        this.init();
    }
    
    init() {
        // Carica i pesi salvati
        this.loadWeights();
        
        // Trova gli elementi del peso nel DOM
        this.weightElements = {
            current: document.querySelector('.cdue p'),
            previous: document.querySelector('.cdue .kg'),
            arrow: document.querySelector('.cdue .allinea-icona img'),
            dateDisplay: document.querySelector('.cdue h3'),
            circle: document.querySelector('.cdue .cerchio-1'),
            // Elementi responsive (senza cerchi)
            currentResponsive: document.querySelector('.content-peso p'),
            previousResponsive: document.querySelector('.content-peso .kg'),
            arrowResponsive: document.querySelector('.content-peso .allinea-icona img'),
            dateDisplayResponsive: document.querySelector('.content-peso h3')
        };
        
        // Crea il popup
        this.createPopup();
        
        // Rendi cliccabile l'elemento peso
        this.makeWeightClickable();
        
        // Aggiorna il display iniziale
        this.updateDisplay();
    }
    
    loadWeights() {
        const saved = localStorage.getItem('weightHistory');
        const lastDate = localStorage.getItem('lastWeightDate');
        
        if (saved) {
            this.weightHistory = JSON.parse(saved);
            if (this.weightHistory.length >= 1) {
                this.currentWeight = this.weightHistory[0];
            }
            if (this.weightHistory.length >= 2) {
                this.previousWeight = this.weightHistory[1];
            } else {
                // Se hai solo un peso salvato, previous rimane 0
                this.previousWeight = 0;
            }
            
            // Carica la data salvata o usa quella odierna
            this.lastWeightDate = lastDate ? new Date(lastDate) : new Date();
        } else {
            // Inizializza con i valori di default - peso di default a 0 invece di 90
            this.currentWeight = 0;
            this.previousWeight = 0; // Inizia con zero
            this.weightHistory = [0]; // Solo peso attuale inizialmente
            this.lastWeightDate = new Date(); // Data odierna
            this.saveWeights();
        }
    }

    saveWeights() {
        localStorage.setItem('weightHistory', JSON.stringify(this.weightHistory));
        localStorage.setItem('lastWeightDate', this.lastWeightDate.toISOString());
    }

    updateDisplay() {
        // Formatta la data nel formato DD MM YYYY
        const formattedDate = this.formatWeightDate(this.lastWeightDate);
        
        // Aggiorna peso attuale (versione desktop/cerchi)
        if (this.weightElements.current) {
            this.weightElements.current.textContent = `${this.currentWeight} kg`;
        }
        
        // Aggiorna peso precedente (versione desktop/cerchi)
        if (this.weightElements.previous) {
            this.weightElements.previous.textContent = `${this.previousWeight} kg`;
        }
        
        // Aggiorna data (versione desktop/cerchi)
        if (this.weightElements.dateDisplay) {
            this.weightElements.dateDisplay.textContent = formattedDate;
        }
        
        // Aggiorna elementi responsive (versione mobile senza cerchi)
        if (this.weightElements.currentResponsive) {
            this.weightElements.currentResponsive.textContent = `${this.currentWeight} kg`;
        }
        
        if (this.weightElements.previousResponsive) {
            this.weightElements.previousResponsive.textContent = `${this.previousWeight} kg`;
        }
        
        if (this.weightElements.dateDisplayResponsive) {
            this.weightElements.dateDisplayResponsive.textContent = formattedDate;
        }
        
        // Aggiorna freccia e colore cerchio
        this.updateArrowAndCircle();
    }
    
    // Funzione per formattare la data nel formato DD MM YYYY
    formatWeightDate(date) {
        if (!date) return "01 01 2025"; // fallback
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day} ${month} ${year}`;
    }
    
    updateArrowAndCircle() {
        // Funzione per aggiornare una freccia (desktop o responsive)
        const updateArrow = (arrowElement) => {
            if (!arrowElement) return;
            
            if (this.previousWeight === 0) {
                // Prima misurazione: freccia neutra e trasparente
                arrowElement.src = "foto\\frecciasu.png";
                arrowElement.style.transform = "rotate(0deg)";
                arrowElement.style.opacity = "0.3";
                arrowElement.style.display = "inline-block";
            } else if (this.currentWeight > this.previousWeight) {
                // Peso aumentato: nascondi la freccia
                arrowElement.style.display = "none";
            } else if (this.currentWeight < this.previousWeight) {
                // Peso diminuito: freccia giù
                arrowElement.src = "foto\\frecciasu.png";
                arrowElement.style.transform = "rotate(180deg)";
                arrowElement.style.opacity = "1";
                arrowElement.style.display = "inline-block";
            } else {
                // Peso stabile: freccia orizzontale
                arrowElement.src = "foto\\frecciasu.png";
                arrowElement.style.transform = "rotate(90deg)";
                arrowElement.style.opacity = "1";
                arrowElement.style.display = "inline-block";
            }
        };
        
        // Aggiorna freccia desktop
        updateArrow(this.weightElements.arrow);
        
        // Aggiorna freccia responsive
        updateArrow(this.weightElements.arrowResponsive);
        
        // Aggiorna colore cerchio (solo per desktop)
        if (this.weightElements.circle) {
            if (this.previousWeight === 0) {
                // Prima misurazione: cerchio normale
                this.weightElements.circle.style.background = "linear-gradient(98deg, var(--circle-gradient-2-start) 0%, var(--circle-gradient-2-end) 100%)";
            } else if (this.currentWeight > this.previousWeight) {
                // Peso aumentato: cerchio rosso
                this.weightElements.circle.style.background = "linear-gradient(98deg, #ff6b6b 0%, #ee5a52 100%)";
            } else {
                // Peso diminuito o stabile: cerchio normale
                this.weightElements.circle.style.background = "linear-gradient(98deg, var(--circle-gradient-2-start) 0%, var(--circle-gradient-2-end) 100%)";
            }
        }
    }
    
    makeWeightClickable() {
        // Rendi cliccabile il peso attuale (desktop)
        if (this.weightElements.current) {
            this.weightElements.current.style.cursor = 'pointer';
            this.weightElements.current.addEventListener('click', () => this.openPopup());
            this.weightElements.current.title = 'Clicca per modificare il peso';
        }
        
        // Rendi cliccabile il peso attuale (responsive)
        if (this.weightElements.currentResponsive) {
            this.weightElements.currentResponsive.style.cursor = 'pointer';
            this.weightElements.currentResponsive.addEventListener('click', () => this.openPopup());
            this.weightElements.currentResponsive.title = 'Clicca per modificare il peso';
        }
        
        // Rendi cliccabile anche il contenitore della card peso
        const pesoCard = document.querySelector('.cdue');
        if (pesoCard) {
            pesoCard.addEventListener('click', (e) => {
                // Solo se non si clicca su link o bottoni
                if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                    this.openPopup();
                }
            });
        }
        
        // Rendi cliccabile anche il content-peso responsive
        const pesoContentResponsive = document.querySelector('.content-peso');
        if (pesoContentResponsive) {
            pesoContentResponsive.addEventListener('click', (e) => {
                // Solo se non si clicca su link o bottoni
                if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                    this.openPopup();
                }
            });
        }
    }
    
    createPopup() {
        const overlay = document.createElement('div');
        overlay.className = 'weight-popup-overlay';
        overlay.innerHTML = `
            <div class="weight-popup">
                <div class="weight-popup-header">
                    <h3 class="weight-popup-title">⚖️ Tracker Peso</h3>
                    <button class="weight-popup-close" onclick="weightTracker.closePopup()">✕</button>
                </div>
                
                <div class="weight-popup-content">
                    <div class="current-weight">
                        Peso attuale (${this.formatWeightDate(this.lastWeightDate)}):
                        <div class="current-weight-value" id="currentWeightValue">${this.currentWeight} kg</div>
                    </div>
                    
                    <div class="previous-weight">
                        Peso precedente:
                        <div class="previous-weight-value" id="previousWeightValue">${this.previousWeight} kg</div>
                    </div>
                    
                    <input type="number" class="weight-input" placeholder="Inserisci nuovo peso (kg)" min="30" max="200" step="0.1" id="weightPopupInput">
                    
                    <div class="weight-popup-buttons">
                        <button class="weight-btn set-btn" onclick="weightTracker.setWeightFromPopup()">
                            📝 Aggiorna peso
                        </button>
                        <button class="weight-btn reset-btn" onclick="weightTracker.resetWeight()">
                            🔄 Reset storico
                        </button>
                    </div>
                    
                    <div class="weight-info">
                        <div class="weight-comparison" id="weightComparison">
                            ${this.getWeightComparisonText()}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.popup = overlay;
        
        // Chiudi popup cliccando sull'overlay
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closePopup();
            }
        });
        
        // Chiudi popup con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('active')) {
                this.closePopup();
            }
        });
        
        // Enter nell'input per aggiornare peso
        const input = document.getElementById('weightPopupInput');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.setWeightFromPopup();
                }
            });
        }
    }
    
    getWeightComparisonText() {
        if (this.previousWeight === 0) {
            return "🆕 Prima misurazione - inserisci un nuovo peso per vedere il confronto";
        } else if (this.currentWeight === this.previousWeight) {
            return "⚖️ Peso stabile";
        } else if (this.currentWeight > this.previousWeight) {
            const diff = (this.currentWeight - this.previousWeight).toFixed(1);
            return `📈 +${diff} kg rispetto alla scorsa misurazione`;
        } else {
            const diff = (this.previousWeight - this.currentWeight).toFixed(1);
            return `📉 -${diff} kg rispetto alla scorsa misurazione`;
        }
    }
    
    openPopup() {
        if (this.popup) {
            this.popup.classList.add('active');
            
            // Aggiorna i valori nel popup inclusa la data
            const currentWeightSection = document.querySelector('.current-weight');
            const currentDisplay = document.getElementById('currentWeightValue');
            const previousDisplay = document.getElementById('previousWeightValue');
            const comparisonDisplay = document.getElementById('weightComparison');
            
            if (currentWeightSection) {
                currentWeightSection.innerHTML = `
                    Peso attuale (${this.formatWeightDate(this.lastWeightDate)}):
                    <div class="current-weight-value" id="currentWeightValue">${this.currentWeight} kg</div>
                `;
            }
            if (previousDisplay) previousDisplay.textContent = `${this.previousWeight} kg`;
            if (comparisonDisplay) comparisonDisplay.textContent = this.getWeightComparisonText();
            
            // Focus sull'input
            setTimeout(() => {
                const input = document.getElementById('weightPopupInput');
                if (input) input.focus();
            }, 300);
        }
    }
    
    closePopup() {
        if (this.popup) {
            this.popup.classList.remove('active');
            
            // Pulisci l'input
            const input = document.getElementById('weightPopupInput');
            if (input) input.value = '';
        }
    }
    
    setWeightFromPopup() {
        const input = document.getElementById('weightPopupInput');
        if (!input) {
            this.showFeedback('Errore: Input peso non trovato.', 'warning');
            return;
        }
        
        const weight = parseFloat(input.value);
        
        if (weight && weight >= 30 && weight <= 200) {
            // Gestisci logica prima/seconda misurazione
            if (this.previousWeight === 0) {
                // Prima misurazione: il peso di default diventa precedente, il nuovo diventa attuale
                this.previousWeight = this.currentWeight;
                this.currentWeight = weight;
                this.weightHistory = [this.currentWeight, this.previousWeight];
            } else {
                // Misurazioni successive: sposta attuale a precedente, nuovo diventa attuale
                this.previousWeight = this.currentWeight;
                this.currentWeight = weight;
                this.weightHistory = [this.currentWeight, this.previousWeight];
            }
            
            // Aggiorna la data con quella corrente
            this.lastWeightDate = new Date();
            
            this.saveWeights();
            this.updateDisplay();
            
            // Mostra feedback con data
            const formattedDate = this.formatWeightDate(this.lastWeightDate);
            this.showFeedback(`Peso aggiornato a ${weight} kg il ${formattedDate}!`, 'success');
            input.value = '';
            
            // Aggiorna anche il popup se è aperto
            this.openPopup();
        } else {
            this.showFeedback('Inserisci un peso valido (30-200 kg)!', 'warning');
        }
    }
    
    resetWeight() {
        this.currentWeight = 0; // Reset a 0 invece di 70
        this.previousWeight = 0; // Reset a zero come all'inizio
        this.weightHistory = [0]; // Solo peso attuale
        this.lastWeightDate = new Date(); // Reset anche la data
        
        this.saveWeights();
        this.updateDisplay();
        
        const formattedDate = this.formatWeightDate(this.lastWeightDate);
        this.showFeedback(`Storico peso resettato il ${formattedDate}!`, 'warning');
        
        // Pulisci l'input
        const input = document.getElementById('weightPopupInput');
        if (input) input.value = '';
        
        // Aggiorna il popup se è aperto
        if (this.popup.classList.contains('active')) {
            this.openPopup();
        }
    }
    
    showFeedback(message, type = 'info') {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'warning' ? '#dc3545' : '#007bff'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 1001;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }
}

// Inizializza tutti i componenti quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza il tracker peso
    if (typeof weightTracker === 'undefined') {
        window.weightTracker = new WeightTrackerPopup();
    }
    
    // Inizializza il contatore passi
    if (typeof stepCounter === 'undefined') {
        window.stepCounter = new StepCounterPopup();
    }
    
    // Inizializza il gestore obiettivi passi
    if (typeof stepGoalManager === 'undefined') {
        window.stepGoalManager = new StepGoalManager();
    }
});

// Funzione per ottimizzare le performance
function optimizePerformance() {
    let ticking = false;
    
    function updateTransforms(e) {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Le trasformazioni vengono applicate qui
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Applica l'ottimizzazione solo se necessario per performance
    const cards = document.querySelectorAll('.card-uno, .card-two, .cuno, .cdue, .ctre, .Progressi');
    cards.forEach(card => {
        card.addEventListener('mousemove', updateTransforms);
    });
}

// Esporta funzioni globali per uso esterno
window.fermaOrologio = ferma;
window.resettaTimer = resettaTimer;
window.aggiornaPosizioneManuale = aggiornaPosizioneManuale;

// Funzioni di utilità globali
window.showNotification = function(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 1002;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// Debug utilities
window.debugStepCounter = function() {
    if (window.stepCounter) {
        console.log('🔍 StepCounter Debug:');
        console.log('Current Steps:', window.stepCounter.currentSteps);
        console.log('Step Elements:', window.stepCounter.stepElements);
        console.log('Popup:', window.stepCounter.popup);
    }
};

window.debugStepGoal = function() {
    if (window.stepGoalManager) {
        console.log('🎯 StepGoal Debug:');
        console.log('Current Goal:', window.stepGoalManager.stepGoal);
        console.log('Goal Elements:', window.stepGoalManager.stepGoalElements);
    }
};

// Funzione per ricaricare tutti i sistemi
window.reloadAllSystems = function() {
    console.log('🔄 Ricaricando tutti i sistemi...');
    
    // Ricarica step counter
    if (window.stepCounter) {
        window.stepCounter.updateDisplay();
    }
    
    // Ricarica step goal manager  
    if (window.stepGoalManager) {
        window.stepGoalManager.updateDisplay();
    }
    
    // Ricarica weight tracker
    if (window.weightTracker) {
        window.weightTracker.updateDisplay();
    }
    
    console.log('✅ Tutti i sistemi ricaricati!');
};
