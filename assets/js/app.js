// Theme toggle
const themeBtn = document.getElementById('theme');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    themeBtn.setAttribute('aria-pressed', next === 'dark');
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

// Music play (user gesture required)
const music = document.getElementById('music');
const playHymnBtn = document.getElementById('playHymn');
const playHymnAlt = document.getElementById('playHymnAlt');
const playCenter = document.getElementById('playHymnCenter');

async function tryPlayMusic() {
  try { await music.play(); } catch(e){ alert('Pulsa de nuevo para activar el audio.'); }
}
[playHymnBtn, playHymnAlt, playCenter].forEach(btn=>{
  if (btn && music) btn.addEventListener('click', tryPlayMusic);
});

// Flip card: click/toque/teclado
const boozCard = document.getElementById('boozCard');
if (boozCard) {
  const toggleFlip = () => boozCard.classList.toggle('is-flipped');
  boozCard.addEventListener('click', toggleFlip);
  boozCard.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(); }
  });
}
