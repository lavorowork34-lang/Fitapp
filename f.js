// Sistema light dark o di sistema
function getSavedTheme() {
    try {
        return localStorage.getItem('theme') || 'auto';
    } catch (e) {
        return 'auto';
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        // Ignora errori localStorage
    }
}

function isSystemDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function shouldUseDarkMode() {
    const saved = getSavedTheme();
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return isSystemDark(); // auto o default
}

function applyTheme() {
    const isDark = shouldUseDarkMode();
    
    if (isDark) {
        document.body.classList.add('dark-mode');
        if (document.documentElement) {
            document.documentElement.classList.add('dark-mode');
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (document.documentElement) {
            document.documentElement.classList.remove('dark-mode');
        }
    }
}

function toggleDarkMode() {
    const currentlyDark = document.body.classList.contains('dark-mode');
    const newTheme = currentlyDark ? 'light' : 'dark';
    
    saveTheme(newTheme);
    applyTheme();
    
    console.log('Tema cambiato a:', newTheme);
}

// Funzione per impostare tema specifico
function setTheme(theme) {
    if (theme === 'dark' || theme === 'light' || theme === 'auto') {
        saveTheme(theme);
        applyTheme();
        console.log('Tema impostato a:', theme);
    }
}

// Listener per cambiamenti sistema (solo se supportato)
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', function() {
            if (getSavedTheme() === 'auto') {
                applyTheme();
            }
        });
    } else if (mediaQuery.addListener) {
        // Fallback per browser più vecchi
        mediaQuery.addListener(function() {
            if (getSavedTheme() === 'auto') {
                applyTheme();
            }
        });
    }
}



// Applica tema all'avvio
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
} else {
    applyTheme();
}

// Applica anche quando la pagina è completamente caricata
if (document.readyState !== 'complete') {
    window.addEventListener('load', applyTheme);
}


// Google Translate Language Detector - JavaScript
class GoogleTranslateDetector {
    
    constructor() {
        this.apiUrl = 'https://translate.googleapis.com/translate_a/single';
        this.supportedLanguages = {
            'af': 'afrikaans',
            'sq': 'albanian',
            'am': 'amharic',
            'ar': 'arabic',
            'hy': 'armenian',
            'az': 'azerbaijani',
            'eu': 'basque',
            'be': 'belarusian',
            'bn': 'bengali',
            'bs': 'bosnian',
            'bg': 'bulgarian',
            'ca': 'catalan',
            'ceb': 'cebuano',
            'ny': 'chichewa',
            'zh': 'chinese',
            'zh-cn': 'chinese-simplified',
            'zh-tw': 'chinese-traditional',
            'co': 'corsican',
            'hr': 'croatian',
            'cs': 'czech',
            'da': 'danish',
            'nl': 'dutch',
            'en': 'english',
            'eo': 'esperanto',
            'et': 'estonian',
            'tl': 'filipino',
            'fi': 'finnish',
            'fr': 'french',
            'fy': 'frisian',
            'gl': 'galician',
            'ka': 'georgian',
            'de': 'german',
            'el': 'greek',
            'gu': 'gujarati',
            'ht': 'haitian-creole',
            'ha': 'hausa',
            'haw': 'hawaiian',
            'he': 'hebrew',
            'iw': 'hebrew',
            'hi': 'hindi',
            'hmn': 'hmong',
            'hu': 'hungarian',
            'is': 'icelandic',
            'ig': 'igbo',
            'id': 'indonesian',
            'ga': 'irish',
            'it': 'italian',
            'ja': 'japanese',
            'jw': 'javanese',
            'kn': 'kannada',
            'kk': 'kazakh',
            'km': 'khmer',
            'ko': 'korean',
            'ku': 'kurdish',
            'ky': 'kyrgyz',
            'lo': 'lao',
            'la': 'latin',
            'lv': 'latvian',
            'lt': 'lithuanian',
            'lb': 'luxembourgish',
            'mk': 'macedonian',
            'mg': 'malagasy',
            'ms': 'malay',
            'ml': 'malayalam',
            'mt': 'maltese',
            'mi': 'maori',
            'mr': 'marathi',
            'mn': 'mongolian',
            'my': 'myanmar',
            'ne': 'nepali',
            'no': 'norwegian',
            'or': 'odia',
            'ps': 'pashto',
            'fa': 'persian',
            'pl': 'polish',
            'pt': 'portuguese',
            'pa': 'punjabi',
            'ro': 'romanian',
            'ru': 'russian',
            'sm': 'samoan',
            'gd': 'scots-gaelic',
            'sr': 'serbian',
            'st': 'sesotho',
            'sn': 'shona',
            'sd': 'sindhi',
            'si': 'sinhala',
            'sk': 'slovak',
            'sl': 'slovenian',
            'so': 'somali',
            'es': 'spanish',
            'su': 'sundanese',
            'sw': 'swahili',
            'sv': 'swedish',
            'tg': 'tajik',
            'ta': 'tamil',
            'te': 'telugu',
            'th': 'thai',
            'tr': 'turkish',
            'tk': 'turkmen',
            'uk': 'ukrainian',
            'ur': 'urdu',
            'ug': 'uyghur',
            'uz': 'uzbek',
            'vi': 'vietnamese',
            'cy': 'welsh',
            'xh': 'xhosa',
            'yi': 'yiddish',
            'yo': 'yoruba',
            'zu': 'zulu'
        };
    }
    
    /**
     * Rileva la lingua di un testo usando Google Translate
     */
    async detectLanguage(text) {
        try {
            const encodedText = encodeURIComponent(text);
            const url = `${this.apiUrl}?client=gtx&sl=auto&tl=en&dt=t&q=${encodedText}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.text();
            return this.extractLanguageCode(data);
            
        } catch (error) {
            console.error('Errore rilevamento lingua:', error);
            return 'en'; // Default inglese
        }
    }
    
    /**
     * Estrae il codice lingua dalla risposta di Google Translate
     */
    extractLanguageCode(jsonResponse) {
        try {
            // Cerca il pattern per il codice lingua nella risposta
            const matches = jsonResponse.match(/"([a-z]{2})"/g);
            if (matches && matches.length > 0) {
                // Prende l'ultimo match che dovrebbe essere la lingua rilevata
                const lastMatch = matches[matches.length - 1];
                return lastMatch.replace(/"/g, '');
            }
            return 'en';
        } catch (error) {
            console.error('Errore estrazione lingua:', error);
            return 'en';
        }
    }
    
    /**
     * Rileva la lingua dal contenuto della pagina
     */
    async detectPageLanguage() {
        // Prende del testo dalla pagina per l'analisi
        const textElements = document.querySelectorAll('p, h1, h2, h3, span, div');
        let pageText = '';
        
        for (let element of textElements) {
            if (element.textContent && element.textContent.trim().length > 0) {
                pageText += element.textContent.trim() + ' ';
                if (pageText.length > 200) break; // Limita a 200 caratteri
            }
        }
        
        // Se non trova testo, usa il testo del browser
        if (!pageText.trim()) {
            pageText = navigator.language || navigator.userLanguage || 'hello world';
        }
        
        return await this.detectLanguage(pageText.substring(0, 200));
    }
    
    /**
     * Applica la classe lingua solo su dispositivi responsive (≤1215px)
     */
    async applyLanguageClass() {
        if (window.innerWidth <= 1215) {
            try {
                const detectedLang = await this.detectPageLanguage();
                const langClass = this.supportedLanguages[detectedLang] || 'english';
                
                // Rimuove classi lingua esistenti
                document.documentElement.className = 
                    (document.documentElement.className || '').replace(/\blang-\w+\b/g, '');
                document.body.className = 
                    (document.body.className || '').replace(/\blang-\w+\b/g, '');
                
                // Applica la nuova classe lingua
                document.documentElement.classList.add(`lang-${langClass}`);
                document.body.classList.add(`lang-${langClass}`, 'responsive-mode');
                
                console.log(`Lingua rilevata: ${detectedLang} -> Classe applicata: lang-${langClass}`);
                
            } catch (error) {
                console.error('Errore applicazione lingua:', error);
                // Fallback alla lingua del browser
                this.applyBrowserLanguage();
            }
        } else {
            // Rimuove le classi su desktop
            document.documentElement.className = 
                (document.documentElement.className || '').replace(/\blang-\w+\b/g, '');
            document.body.className = 
                (document.body.className || '').replace(/\blang-\w+\b|\bresponsive-mode\b/g, '');
        }
    }
    
    /**
     * Fallback: usa la lingua del browser se Google Translate non funziona
     */
    applyBrowserLanguage() {
        const browserLang = (navigator.language || navigator.userLanguage).substring(0, 2).toLowerCase();
        const langClass = this.supportedLanguages[browserLang] || 'english';
        
        document.documentElement.classList.add(`lang-${langClass}`);
        document.body.classList.add(`lang-${langClass}`, 'responsive-mode');
        
        console.log(`Fallback lingua browser: ${browserLang} -> Classe: lang-${langClass}`);
    }
    
    /**
     * Inizializza il rilevatore
     */
    init() {
        // Applica al caricamento della pagina
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.applyLanguageClass());
        } else {
            this.applyLanguageClass();
        }
        
        // Riapplica al ridimensionamento della finestra
        window.addEventListener('resize', () => this.applyLanguageClass());
        
        // Riapplica se il contenuto della pagina cambia
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver(() => {
                if (window.innerWidth <= 1215) {
                    setTimeout(() => this.applyLanguageClass(), 1000);
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }
    }
}

// Inizializzazione automatica
const languageDetector = new GoogleTranslateDetector();
languageDetector.init();

// Espone globalmente per uso manuale se necessario
window.GoogleTranslateDetector = GoogleTranslateDetector;



