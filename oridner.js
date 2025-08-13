// JavaScript per la barra di progresso dei passi
function updateProgressBar() {
  try {
    const passiElement = document.querySelector('.cerchio-2 .passi');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const passiResponsive = document.querySelector('.content-passi .passi');
    
    if (passiElement && progressFill && progressText) {
      const passiAttuali = parseInt(passiElement.textContent) || 0;
      const obiettivo = 10000;
      const percentuale = Math.min((passiAttuali / obiettivo) * 100, 100);
      
      progressFill.style.width = percentuale + '%';
      progressText.textContent = passiAttuali + ' / 10.000 passi';
      
      // Sincronizza con la versione responsive
      if (passiResponsive) {
        passiResponsive.textContent = passiAttuali;
      }
    }
  } catch (error) {
    console.log('Errore aggiornamento barra progresso:', error);
  }
}

// Aggiorna ogni 2 secondi
setInterval(updateProgressBar, 2000);

// Aggiorna al caricamento della pagina
window.addEventListener('load', function() {
  setTimeout(updateProgressBar, 1000);
});