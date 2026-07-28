// js/navidad-extra.js

// Este script solo se carga cuando la temporada es "navidad" o "velitas"
document.addEventListener("DOMContentLoaded", () => {
  // 0. Cargar el CSS especial
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "navidad-extra.css";
  document.head.appendChild(link);

  initXmasOverlay();
  initXmasTreeTimer();
  initFrostedGlass();
});

// 1. PANTALLA DE BIENVENIDA (OVERLAY CURTAIN)
function initXmasOverlay() {
  // Solo mostrar una vez por sesión para no molestar en cada recarga
  if (sessionStorage.getItem('xmasOverlayShown')) return;
  
  const overlay = document.createElement("div");
  overlay.id = "xmas-welcome-overlay";
  overlay.innerHTML = `
    <div class="xmas-overlay-content">
      <h1 class="xmas-overlay-title">🎄 ¡Feliz Navidad desde Bargainlandia! 🎄</h1>
      <p class="xmas-overlay-subtitle">Prepárate para la temporada más mágica del año</p>
      <button id="xmas-enter-btn" class="xmas-overlay-btn">Descubre la Magia ✨</button>
    </div>
  `;
  document.body.appendChild(overlay);

  // Generar estrellas centelleantes dinámicas en el fondo del overlay
  for (let i = 0; i < 60; i++) {
    const star = document.createElement("div");
    star.className = "xmas-star";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.animationDuration = (Math.random() * 2 + 1) + "s";
    star.style.animationDelay = (Math.random() * 2) + "s";
    overlay.appendChild(star);
  }

  const btn = document.getElementById("xmas-enter-btn");
  
  function dismissOverlay() {
    overlay.classList.add("dissolve"); // Dispara la animación CSS de dispersión
    sessionStorage.setItem('xmasOverlayShown', 'true');
    // Eliminar del DOM una vez termine la animación (1.5s)
    setTimeout(() => overlay.remove(), 1500);
  }

  btn.addEventListener("click", dismissOverlay);
  
  // Auto-cierre de seguridad tras 6 segundos
  setTimeout(() => {
    if (document.getElementById("xmas-welcome-overlay")) dismissOverlay();
  }, 6000);
}

// 2. ÁRBOL INTERACTIVO Y RELOJ REGRESIVO
function initXmasTreeTimer() {
  const treeContainer = document.createElement("div");
  treeContainer.id = "xmas-interactive-tree";
  treeContainer.innerHTML = `
    <i class="fas fa-tree tree-icon"></i>
    <div class="tree-tooltip">
      <h4 class="tooltip-title">Faltan para Navidad:</h4>
      <div id="xmas-countdown">Calculando...</div>
    </div>
  `;
  document.body.appendChild(treeContainer);

  const countdownEl = document.getElementById("xmas-countdown");
  let lastSecond = -1;
  
  function updateCountdown() {
    const now = new Date();
    
    // Optimización: Solo actualizar el DOM si cambió el segundo
    if (now.getSeconds() !== lastSecond) {
      lastSecond = now.getSeconds();
      
      const currentYear = now.getFullYear();
      let targetDate = new Date(currentYear, 11, 25); // Diciembre 25 (Mes 11 en JS)
      
      if (now.getTime() > targetDate.getTime()) {
        targetDate = new Date(currentYear + 1, 11, 25);
      }
      
      const diff = targetDate.getTime() - now.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      
      countdownEl.innerHTML = `<b>${days}</b>d <b>${hours}</b>h <b>${mins}</b>m <b>${secs}</b>s`;
    }
    
    // Aprovecha rAF para máxima fluidez y bajo consumo cuando la pestaña está inactiva
    requestAnimationFrame(updateCountdown);
  }
  
  requestAnimationFrame(updateCountdown);
}

// 3. EFECTO DE CRISTAL EMPAÑADO (DERRETIMIENTO AL SCROLL)
function initFrostedGlass() {
  const frostedElements = document.querySelectorAll(".frosted-text");
  
  if (!('IntersectionObserver' in window)) {
    // Fallback para navegadores muy antiguos
    frostedElements.forEach(el => el.classList.add('melted'));
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Cuando al menos el 50% del elemento entra en la pantalla
      if (entry.isIntersecting) {
        entry.target.classList.add("melted");
        // Dejar de observar una vez que se derritió
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  frostedElements.forEach(el => observer.observe(el));
}
