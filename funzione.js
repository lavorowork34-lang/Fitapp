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
    
    // Funzione per impostare il tema
    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            if (themeText) themeText.textContent = 'Dark Mode';
            if (themeIcon) {
                themeIcon.src = sunIcon;
                themeIcon.alt = 'luna';
            }
            
            // Animazione di transizione smooth
            body.style.transition = 'all 0.3s ease';
        } else {
            body.classList.remove('light-mode');
            if (themeText) themeText.textContent = 'Light Mode';
            if (themeIcon) {
                themeIcon.src = moonIcon;
                themeIcon.alt = 'Luna';
            }
            
            // Animazione di transizione smooth
            body.style.transition = 'all 0.3s ease';
        }
    }
    
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
    
    console.log('✅ Sistema di toggle tema inizializzato');
    console.log('🎨 Tema corrente:', getCurrentTheme());
    console.log('⌨️  Shortcut: Ctrl/Cmd + Shift + T per cambiare tema');
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

/*
<html><body>
<iframe width="560" height="315" src="https://www.youtube.com/embed/FnqdxybhJ7Y" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/J7FuO6P57NQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SkrEAkRH7uc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/P2w4Kn7hKDw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/-_28DxMPJR4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/v1NfwUI2CUI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/2bJg_jeSAF4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/6GbxopD-6dE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/fl9ggCrv0M4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/cODPAs4WaRI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/8I0UOSFG4OU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/WKZU5ypmrZ8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/OFvOSJkn8QA" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Aun5Tm1f8oI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/jfzK7qmBYDw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/8GcMus5ypgQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Q92xakWMgb8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/vq-YCyTGW2o" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/nukdvJVc5CY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/FJJbvRU8lOY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/xhGwgLPixoE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/wVRAr978k4I" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Frm6d25lSTw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/wnjtm86dfUQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/lFtnL1fAp5c" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1vAHbEzmU-c" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/eeLAsZ-tBsA" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/qJHPCaKVplg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/od7u9TAPB9Y" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/C0l8qRm2X-k" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/L-uVMXdqtVE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/P3ecyTTUiXY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/w7X8HJFZraU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1yMQoZ_I58w" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/KJv_54Vw8Ls" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/w4LVfZcMqF8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1D04gFANloo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/WWUvpVf9d2g" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_PkjmigBOxs" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Uy2utnaM6SE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/NcRBk3jVz2s" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/JcmRYvFplhQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Ouf0kZPRFlY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/oVsjvHCI5Bs" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/rUv_D9-xJx8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/JvVDi5Nu78U" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/BfxFI1RS9OM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/s0hFupjh3OA" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/oWsD63DhA88" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/I8A7MfYwsv8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/saNT0ASWLI4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/cQp7HXNkmXU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/PpvJ84k9O1E" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/xdEG3fHwdsM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/X2sB0Rs4pJc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/DreVDhRSxhw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/vIveVnjx7D4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3LxqGRvNhSA" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/UfxVkgEoY1w" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_RcgniCs3Qk" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Bqg3HBA_0x0" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_yUXa9k_LoQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/E85P_m3fDS8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/sTKrJumvplU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/NBawXga2Q9A" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/hxLJGBRCJ_8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Pa6BQ7fqhbw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/FlK4Rseqf98" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/4-Ipc9Eykfs" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/vUosKSyIjAQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/jTq1KRoQTSE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/bWl-GbldDxA" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/oYc0GoQF850" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/f651s7K4fGc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/g-S0ekrvg0I" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/2DZv4oA3XTI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/tzYJT6abypU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/UOIzqgiHFyk" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/iGHFmE71rEg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/A3I4deFkEPY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Sjhtuyebfvk" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/dfqmnJZHAgk" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/mTc_aFog6UE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/VzWKbjyp1iI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3hDedBMtYdg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/i_emtlF_KQ0" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ICWjF4f46lw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/kj0IasrTqBE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Dq9FFIFxFGg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/02mK9eLexfM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/jfI75K7giOM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ovVvKe33Lhk" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/-d4XSzvU2AI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/sMpvXkffvbI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/sga3jicDpXY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/HzABgsfQOFI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/smWO4tgMXYc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/u0gcmKAZK7w" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/DB_aDYcgkJw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/DXKYEFEtDWE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3yhGAN3_-mc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Eay6TpQuvz0" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/5nq6zBu5dVE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/6p6yQ4xxW0U" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/wE7IhrC3UWU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/pA0jqqqaHMo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/NgDVEiu1P-4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/tcL9sIoJ8e8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/EYM--PIEJ6o" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/oxYrfVkdDoo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/L7sCJ694SoU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/76ttzRcx948" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/d_MA6G8Bhpo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Om-5Qny29Jw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/29OSq-oERpU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/C2UpsGxeW4I" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/AWneGi--Ptw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/9GgxbCaYUq0" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/uykZZYqeywc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/NIf7hIm6T90" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ms2LScxWwuA" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Z_9d9zJQH50" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/XtNHNlh_tMU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/M2UR0S1Rv1g" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/xqR9-_O4-6k" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/t7s2jwJLYMo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/WeooW_dVVo8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/eJ3FEkoYfoo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Gt3OV9luuvQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/HTryzAOynaE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/bYCHKDUX1WE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/yb0hl5AUopM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/vHLAXsQgzKU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/B9jK13eDEK4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Dr47nD0M4dA" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/eoQ3xIgpC1U" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/PmrysR70Hdk" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/unHTbE6zsLU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/HMIUg7UhLXg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/74eYj6ZYVno" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/lFcdxQMSrhQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/dJdcUjXBFcM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/jlVpRED1c5w" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/xCzcllpNE7k" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SiIKnGTsPkw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/j9MuCSE-JWM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/N0KJ2AqwlHk" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1Be5aSyb9dM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/MdjgulNkT2w" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ELarUnVzrRA" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/lRhhEkV0qzo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3M2RK8VaRu0" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/uLVCTOK-KOQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_8KAW7iQ7Ag" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/liVL5N9Xi-8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/OxBkKI8lW4c" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/-cgqmqDbExE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZCEPL4VE83U" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/2VgFx8fs58I" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3olW4QV-7eM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/eXdkop93REY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/LKRwsLlFq0s" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/GZaCcoh6Ews" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/XUK37o54fWg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/bs4t-Lr6lOg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/MQXLYq-ZRqM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/G2NSXHkYj0E" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/jA_-Q4eUK0s" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/WkocySNr0Tw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/QWcpkWuHQ8I" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/recK5jTMdfI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/LzwajPbkfMs" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/syLV4-5Ss8Q" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/LVN5-C6wfb0" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/mToqafOF-9A" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/-unqQkw5n_U" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/6FJVSp43PRY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/xSzxB4BrhQQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/HF6Vpd47y_8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/IHhJy1P5DLc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/P1RI06z-4eo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/M1KZUUAjzGY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/M7hA2OSOc0s" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Q4DVB705-9I" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/YZ1VGB5N7NA" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/lkgqnpPFe9w" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/6Y7sY_zY62E" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/f-HCBphYc28" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/nGNc25TUGI0" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/KWLZLHDv_aU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/NkRrj-2jkW8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/jVP8fIaiuv8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/6UCNUE2LBw0" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/zZvKFKjyxzc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/kIA2pELF7jc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/rtFI2C5ol_s" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/S7YZxQ5sYDY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/9nS9kkQo4Ss" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/pMlXs9RVd-k" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/-kqNV1wbRXg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/HZIQxG6aA2c" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ixRoYYF472E" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/vxYbo-M8LW8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/j63U38Yl9t8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/vGRhU16ccGE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/znpdcWCAJVM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/QkkPlLJQQs0" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/CKCFl08jl8c" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/AJhrf8etPig" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/sbInLzOaVfo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/P9sUbErMLUQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/m3_vutjVoVU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/sY2aLZPZft4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Iw2VSNKjpgs" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3BUK7_QTtgo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3O9OetKXv_o" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/TG2nzqDY7VY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/4eSqxL3lDsY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/8QMZdsBD8n4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/33YwxOYDCBM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/6xpTFn3jF7g" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_NMhITseBWI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/X51lZbQekHs" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/HUKWcCvXXx8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SNiddEq1Kio" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/MVGDaVl0dxc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/dD2qe2SlsRM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/qqsZNutX1S0" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/LfNxYwVUep0" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Up64qFKSkTc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/BJrAHWgKojI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/KntK-83iXtQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/9IYUFGiA0bw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/uMBIgoHuIRg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Nl9ZG6KZTgo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/lycFXxBr3lY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/YvD-TuJbtEI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/KC9ktUAFDCA" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/6dgdQ8jtTek" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/RMsbUag_QMQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/0_ZFejYudO0" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/0aRO9jB3WNw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ewp6UuJHN7Q" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/eY0UnASYo8E" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Pydw8w7UCck" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/cKCFvcyxUqE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/iQjFJrrFpQY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/TnN_LddlTE4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_XqQ_GSH2AY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ruJY2xytkAE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Q27ECgdHTbo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/HFnEdEPVbJQ" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/DntLJY2tOkY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/M4eo7PE_HcU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/iTiNJnWI42I" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Fl_wNPfVmEs" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/tMHhaw0VK2A" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/FHOMCAk8AL4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/2qE_pZNodok" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/gD_q1xzDizc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/X7l1MWgX9Es" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/UmMOgX8fEck" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/MA690a-lG9g" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1rarWVmU66s" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/rqHjQnZWvr8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/uSWZ5C89hMU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZoF_nOxMZgc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/DO7mCbTK2ag" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/WiFxVCB50oo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/q211Dul2MhY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/QYYz9EvYYFg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3IFkfmLDrnA" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Gd8JN23a4Vc" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/5TqUvvBgZyE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/oOREQBsMp68" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/MynES2AYTEU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/cKvl-ahtWW8" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/EwySc4pkcjo" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/cKq-tfVOpy4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/7EXrvjee-YU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/7c2xfq2YmSg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/R_n-b6XAUSU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/vlpikQfrfbM" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/HIQ1TLDMK4k" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/AG8K0dZUzvs" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Q4UowBZpG7A" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZDYNl2uHO1o" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ysO7Z-2PVyI" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/4mFbxYTJOc4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/kzrz9uAVPgg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/l0bDBCjakU4" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/DR3Jm0IrU9M" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/xnohkqn6P4A" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/nf31DSE1uaU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/kMtN_qDUksk" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/LVr5718r2Vg" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1U7DztzeeDE" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/6mkLhgy-jrY" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/bUOSUZyEeho" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/-5yxK9241Dw" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/82gJEl3iiiU" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Xyj6MBYkD6w" frameborder="0" allowfullscreen></iframe><br><br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Hdl1E3VxvwQ" frameborder="0" allowfullscreen></iframe><br><br>
</body></html>

CODICI DA ASSOCIARE AL PIANO DI ALLENAMENTO PDF

IMPOSTAZIONE LI METTO I FRAME COME VARIABILE LI PARAGONO CON IL TAG H2 DEL DOCUMENTO GENERATO AL LINK E SINCRONIZZO GLI ESERCIZI SU QUESTA PAGINA A SECONDA DI QUELLI CHE L'UTENTE DEVE FARE

*/

