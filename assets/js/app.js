const htmlEl = document.documentElement;
const themeBtn = document.getElementById('theme');

const saved = localStorage.getItem('theme');
const initial = saved ? saved : 'dark';
htmlEl.setAttribute('data-theme', initial);
if (themeBtn) themeBtn.setAttribute('aria-pressed', initial === 'dark');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const next = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', next);
    themeBtn.setAttribute('aria-pressed', next === 'dark');
    localStorage.setItem('theme', next);
  });
}

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold:.12 });
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Lyrics modal
const openLyricsBtn = document.getElementById('openLyrics');
if (openLyricsBtn) {
  openLyricsBtn.addEventListener('click', ()=> {
    document.getElementById('lyricsModal').showModal();
  });
}

// Audio controls
const music = document.getElementById('music');
const playHymnBtn = document.getElementById('playHymn');
const playHymnAlt = document.getElementById('playHymnAlt');
const playCenter = document.getElementById('playHymnCenter');
const togglePauseBtn = document.getElementById('togglePause');

async function playFromStart() {
  try{
    music.currentTime = 0;
    await music.play();
  }catch(e){ alert('Pulsa de nuevo para activar el audio.'); }
}
async function resumeOrPause() {
  try{
    if (music.paused) {
      await music.play();
      togglePauseBtn.textContent = 'Pausar';
    } else {
      music.pause();
      togglePauseBtn.textContent = 'Reanudar';
    }
  }catch(e){ alert('Pulsa de nuevo para activar el audio.'); }
}

// Wiring
if (playHymnBtn && music) playHymnBtn.addEventListener('click', playFromStart);
if (playHymnAlt && music) playHymnAlt.addEventListener('click', playFromStart);
if (playCenter && music) playCenter.addEventListener('click', playFromStart);
if (togglePauseBtn && music) {
  togglePauseBtn.addEventListener('click', resumeOrPause);
  music.addEventListener('play', ()=> togglePauseBtn.textContent = 'Pausar');
  music.addEventListener('pause', ()=> togglePauseBtn.textContent = 'Reanudar');
  togglePauseBtn.textContent = 'Reanudar';
}

// Flip card: click/teclado
const boozCard = document.getElementById('boozCard');
if (boozCard) {
  const toggleFlip = () => boozCard.classList.toggle('is-flipped');
  boozCard.addEventListener('click', toggleFlip);
  boozCard.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(); }
  });
}

// Copiar oración principal (acordeón)
const copyMainBtn = document.getElementById('copyOracionPrincipal');
if (copyMainBtn) {
  copyMainBtn.addEventListener('click', async () => {
    const txt = document.getElementById('oracionPrincipalText')?.innerText || '';
    try{
      await navigator.clipboard.writeText(txt.trim());
      copyMainBtn.textContent = 'Copiado';
      setTimeout(()=> copyMainBtn.textContent = 'Copiar oración', 1600);
    }catch{ alert('No se pudo copiar. Copia manualmente, por favor.'); }
  });
}

// Copiar Ave Booz (acordeón)
const copyAveBtn = document.getElementById('copyAveBooz');
if (copyAveBtn) {
  copyAveBtn.addEventListener('click', async () => {
    const txt = document.getElementById('aveBoozText')?.innerText || '';
    try{
      await navigator.clipboard.writeText(txt.trim());
      copyAveBtn.textContent = 'Copiado';
      setTimeout(()=> copyAveBtn.textContent = 'Copiar oración', 1600);
    }catch{ alert('No se pudo copiar. Copia manualmente, por favor.'); }
  });
}



function equalizeFeatures(){
  const cards = [...document.querySelectorAll('.features-grid .card.feature')];
  if (!cards.length) return;
  cards.forEach(c => c.style.height = 'auto');               // reset
  const max = Math.max(...cards.map(c => c.offsetHeight));   // altura mayor
  cards.forEach(c => c.style.height = max + 'px');           // iguala todas
}
window.addEventListener('load', equalizeFeatures);
window.addEventListener('resize', () => { clearTimeout(window.__eqT); window.__eqT = setTimeout(equalizeFeatures, 120); });
