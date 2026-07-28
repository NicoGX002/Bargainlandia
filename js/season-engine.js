document.addEventListener("DOMContentLoaded", () => {
  // Configuración de temas
  const seasons = {
    "fin-de-ano": { icon: "fas fa-glass-cheers", message: "¡Feliz Año Nuevo! 🎉 Que este año esté lleno de bendiciones.", className: "theme-new-year" },
    "escolar": { icon: "fas fa-pencil-alt", message: "¡Regreso a clases! 📚 Encuentra todo para la temporada escolar.", className: "theme-escolar" },
    "san-valentin": { icon: "fas fa-heart", message: "¡San Valentín! ❤️ Detalles hermosos para enamorar.", className: "theme-amor" },
    "mujer": { icon: "fas fa-female", message: "¡Día de la Mujer! 🌸 Celebramos a las mujeres en su día.", className: "theme-mujer" },
    "vacacional": { icon: "fas fa-sun", message: "¡Temporada Vacacional! ☀️ Prepárate para el sol y la diversión.", className: "theme-vacacional" },
    "madre": { icon: "fas fa-gift", message: "¡Día de la Madre! 🌹 El regalo perfecto para mamá.", className: "theme-madre" },
    "padre": { icon: "fas fa-crown", message: "¡Día del Padre! 👔 Sorprende a papá en su día.", className: "theme-padre" },
    "independencia": { icon: "fas fa-flag", message: "¡Celebremos nuestra Independencia! 🇨🇴", className: "theme-independencia" },
    "cometas": { icon: "fas fa-wind", message: "¡Llegó Agosto! 🪁 Tiempo de volar cometas.", className: "theme-cometas" },
    "amor-amistad": { icon: "fas fa-heart", message: "¡Amor y Amistad! 💞 Celebra con tus personas favoritas.", className: "theme-amor" },
    "halloween": { icon: "fas fa-ghost", message: "¡Feliz Halloween! 🎃 ¡", className: "theme-halloween" },
    "navidad": { icon: "fas fa-tree", message: "¡Feliz Navidad! 🎄 Adornos y regalos para toda la familia.", className: "theme-navidad" },
    "velitas": { icon: "fas fa-fire", message: "¡Día de las Velitas! 🕯️ Ilumina tu hogar con nosotros.", className: "theme-navidad" },
    "juguetes": { icon: "fas fa-puzzle-piece", message: "¡Temporada de Juguetes! 🧸 Los mejores juguetes para regalar.", className: "theme-juguetes" },
    "default": { icon: "", message: "¡Bienvenidos a Bargainlandia!", className: "" }
  };

  // Administrador: permite forzar el tema mediante la URL (ej. ?season=halloween)
  const urlParams = new URLSearchParams(window.location.search);
  const forceSeason = urlParams.get('season');

  let activeSeason = "default";

  if (forceSeason && seasons[forceSeason]) {
    activeSeason = forceSeason;
  } else {
    // Lógica del Calendario Automático
    const today = new Date();
    const month = today.getMonth() + 1; // 1 = Enero, 12 = Diciembre
    const day = today.getDate();

    if (month === 1 && day <= 3) activeSeason = "fin-de-ano";
    else if (month === 1 && day > 3) activeSeason = "escolar";
    else if (month === 2) activeSeason = "san-valentin";
    else if (month === 3) activeSeason = "mujer";
    else if (month === 4) activeSeason = "vacacional";
    else if (month === 5) activeSeason = "madre";
    else if (month === 6) activeSeason = "padre";
    else if (month === 7 && day <= 20) activeSeason = "independencia";
    else if (month === 7 && day > 20) activeSeason = "cometas";
    else if (month === 8) activeSeason = "cometas";
    else if (month === 9) activeSeason = "amor-amistad";
    else if (month === 10) activeSeason = "halloween";
    // Noviembre: 1 al 15 normal, 16 al 25 Pre-navidad, 26 al 30 Velitas
    else if (month === 11 && day <= 15) activeSeason = "juguetes";
    else if (month === 11 && day > 15 && day <= 25) activeSeason = "navidad";
    else if (month === 11 && day >= 26) activeSeason = "velitas";
    // Diciembre: 1 al 7 Velitas, 8 al 25 Navidad, 26 al 31 Fin de año
    else if (month === 12 && day <= 7) activeSeason = "velitas";
    else if (month === 12 && day > 7 && day <= 25) activeSeason = "navidad";
    else if (month === 12 && day > 25) activeSeason = "fin-de-ano";
  }

  // Aplicar Tema
  const themeData = seasons[activeSeason];
  
  // 1. Asignar clase al body para CSS
  if (themeData.className) {
    document.body.classList.add(themeData.className);
  }

  // 1.5 Unified Cinematic Intros
  const intros = {
    "halloween": { title: "🎃 Bargainlandia de Terror 👻", subtitle: "¿Te atreves a entrar?", class: "halloween-special", extraHTML: '<div class="halloween-lightning"></div>' },
    "navidad": { 
      title: "Feliz Navidad", 
      subtitle: "La magia de la Navidad llegó a Bargainlandia", 
      class: "navidad-special", 
      extraHTML: ''
    },
    "velitas": { 
      title: "Noche de Velitas", 
      subtitle: "ILUMINA TU HOGAR CON NOSOTROS", 
      class: "navidad-special", 
      extraHTML: '' 
    },
    "juguetes": { 
      title: "Temporada de Juguetes", 
      subtitle: "Los mejores juguetes para los más pequeños", 
      class: "juguetes-special", 
      extraHTML: '' 
    },

    "amor-amistad": { title: "", subtitle: "", class: "amor-special", extraHTML: `
<div class="vib-amor-container">
    <div class="vib-hero">
        <div class="vib-hero-content">
            <h1 class="vib-title">Amor y Amistad en Bargainlandia</h1>
            <p class="vib-subtitle">Detalles únicos, piñatas especiales y juguetes para sorprender</p>
            <a href="#temporada" class="vib-btn">Ver Colección</a>
        </div>
    </div>
</div>
` },
    "san-valentin": { title: "San Valentín 💝", subtitle: "Sorprende a tu persona especial", class: "amor-special", extraHTML: '' },
    "padre": { title: "A los Reyes del Hogar 👑", subtitle: "¡Feliz día, Papá!", class: "padre-special", extraHTML: '' },
    "escolar": { title: "", subtitle: "", class: "escolar-special", extraHTML: `
<div class="fondo-escolar" id="fondo-escolar"></div>
<div style="text-align: center; padding: 15vh 15px 25vh 15px;">
    <h1 class="titulo-principal">¡Regreso a Clases!</h1>
    <p class="subtitulo-tienda"><i class="fa-solid fa-pencil"></i> Prepara su año escolar con los mejores útiles <i class="fa-solid fa-pencil"></i></p>
</div>
` },
    "vacacional": { title: "Sol, Playa y Descuentos ☀️", subtitle: "Disfruta tus vacaciones al máximo", class: "vacacional-special", extraHTML: '' },
    "cometas": { title: "<img src='./logo-bargainlandia.png' alt='Bargainlandia' class='logo-cometas-hero-img'>", subtitle: "", class: "cometas-special", extraHTML: '<div class="cometas-fondo"><div class="cometa-1"></div><div class="cometa-2"></div></div>' },
    "fin-de-ano": { title: "Feliz Año Nuevo", subtitle: 'Te desea <span>Bargainlandia</span>', class: "findeano-special", extraHTML: '' }
  };

  if (intros[activeSeason]) {
    const introData = intros[activeSeason];
    const section = document.createElement("section");
    section.id = introData.class;
    section.className = "cinematic-intro";
    section.innerHTML = `
      ${introData.extraHTML}
      <h1 class="cinematic-title">${introData.title}</h1>
      ${introData.subtitle ? `<h2 class="cinematic-subtitle">${introData.subtitle}</h2>` : ''}
      <div class="scroll-down-hint"><i class="fas fa-chevron-down"></i></div>
    `;
    
    const heroSection = document.getElementById("home");
    document.body.insertBefore(section, heroSection);
    
    // Ocultar el hero por defecto para no tener doble hero, pero mantener el banner
    const heroContainer = heroSection.querySelector(".hero-container");
    if (heroContainer) {
      heroContainer.style.display = "none";
    }
    
    // Add snow canvas and animation for navidad
    if (activeSeason === 'escolar') {
      const contenedor = document.getElementById('fondo-escolar');
      if (contenedor) {
        const elementos = ['<i class="fa-solid fa-pencil"></i>', '<i class="fa-solid fa-ruler"></i>', '<i class="fa-solid fa-star"></i>', '<i class="fa-solid fa-book"></i>'];
        for(let i = 0; i < 25; i++) {
            let el = document.createElement('div');
            el.classList.add('elemento-escolar');
            el.innerHTML = elementos[Math.floor(Math.random() * elementos.length)];
            el.style.left = Math.random() * 100 + '%';
            let size = Math.random() * 20 + 15;
            el.style.fontSize = size + 'px';
            el.style.animationDuration = (Math.random() * 15 + 15) + 's';
            el.style.animationDelay = (Math.random() * 10) + 's';
            contenedor.appendChild(el);
        }
      }
    }

    // Add snow canvas and animation for navidad
    if (introData.class === 'navidad-special' && activeSeason === 'navidad') {
      const canvas = document.createElement('canvas');
      canvas.id = 'snow-canvas';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      let width = window.innerWidth;
      let height = window.innerHeight;
      let scrollFactor = 0;

      const snowflakes = [];
      const MAX_SNOWFLAKES = 120;

      function resizeCanvas() {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
      }
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      class Snowflake {
          constructor() {
              this.x = Math.random() * width;
              this.y = Math.random() * height - height;
              this.radius = Math.random() * 3.5 + 0.5;
              this.speed = Math.random() * 1.5 + 0.5;
              this.sway = Math.random() * 0.5 + 0.1;
              this.angle = Math.random() * Math.PI * 2;
          }

          update() {
              this.angle += this.sway * 0.02;
              this.x += Math.sin(this.angle) * 0.5;
              this.y += this.speed;
              this.y += scrollFactor * 0.1;

              if (this.y > height) {
                  this.y = -10;
                  this.x = Math.random() * width;
              }
          }

          draw() {
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
              ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
              ctx.shadowBlur = 10;
              ctx.fill();
              ctx.shadowBlur = 0;
          }
      }

      for (let i = 0; i < MAX_SNOWFLAKES; i++) {
          snowflakes.push(new Snowflake());
      }

      function animate() {
          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = 'rgba(0, 0, 0, 0)';
          
          snowflakes.forEach(sf => {
              sf.update();
              sf.draw();
          });
          requestAnimationFrame(animate);
      }

      window.addEventListener('scroll', () => {
          scrollFactor = window.scrollY;
          canvas.style.transform = `translateY(${scrollFactor * 0.2}px)`;
      });

      animate();
    }

    // Add stars canvas and animation for fin-de-ano
    if (introData.class === 'findeano-special' && activeSeason === 'fin-de-ano') {
      const canvas = document.createElement('canvas');
      canvas.id = 'fondo-particulas';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      let width = window.innerWidth;
      let height = window.innerHeight;

      function resize() {
          width = window.innerWidth; height = window.innerHeight;
          canvas.width = width; canvas.height = height;
      }
      window.addEventListener('resize', resize);
      resize();

      // Configuración de las partículas
      const particles = [];
      const MAX_PARTICLES = 50; /* Cantidad de estrellas en el fondo */

      class Particle {
          constructor() {
              this.reset();
          }
          reset() {
              this.x = Math.random() * width;
              this.y = Math.random() * height - height;
              this.size = Math.random() * 3 + 1;
              this.speed = Math.random() * 0.4 + 0.1; /* Muy lento para no distraer */
              this.opacity = Math.random() * 0.7 + 0.3;
              this.drift = (Math.random() - 0.5) * 0.2;
              
              // Alternar entre dorado y morado
              this.color = Math.random() > 0.7 ? 'rgba(155, 89, 182, ' : 'rgba(255, 215, 0, '; 
          }
          update() {
              this.x += this.drift;
              this.y += this.speed;
              if (this.y > height) this.reset();
          }
          draw() {
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
              ctx.fillStyle = this.color + this.opacity + ')';
              ctx.shadowColor = 'rgba(255, 215, 0, 0.3)';
              ctx.shadowBlur = 8;
              ctx.fill();
              ctx.shadowBlur = 0;
          }
      }

      for (let i = 0; i < MAX_PARTICLES; i++) {
          particles.push(new Particle());
      }

      function animate() {
          ctx.clearRect(0, 0, width, height);
          particles.forEach(p => { p.update(); p.draw(); });
          requestAnimationFrame(animate);
      }
      animate();
    }
  }

  // 2. Banner
  const banner = document.getElementById("seasonal-banner");
  if (banner && activeSeason !== "default") {
    banner.innerHTML = `<span>${themeData.message}</span>`;
    banner.classList.remove("hidden");
  }

  // 3. Icono del Logo
  const logoIcons = document.querySelectorAll(".seasonal-logo-icon");
  logoIcons.forEach(icon => {
    if (themeData.icon !== "") {
      icon.className = themeData.icon + " seasonal-logo-icon";
    }
  });

  // 4. Unified Cinematic Particles Engine
  const cinematicParticles = {
    "navidad": { icons: ["❄"], count: 0, animation: "snowFallMultilevel" },
    "velitas": { icons: ["❄", "🕯️"], count: 35, animation: "snowFallMultilevel" },
    "amor-amistad": { icons: ["💖", "💘"], count: 10, animation: "heartZoom" },
    "san-valentin": { icons: ["💝", "🌹"], count: 10, animation: "heartZoom" },
    "padre": { icons: ["👑", "👔"], count: 8, animation: "itemFloat" },
    "vacacional": { icons: ["🏖️", "☀️"], count: 8, animation: "beachBounce" },
    "cometas": { icons: ["", ""], count: 10, animation: "kiteFly" },
    "fin-de-ano": { icons: ["", ""], count: 10, animation: "fireworkExplode" },
    "halloween": { icons: ["💀", "👻"], count: 6, animation: "screamerZoom" }
  };

  if (cinematicParticles[activeSeason]) {
    createCinematicParticles(cinematicParticles[activeSeason]);
  } else if (activeSeason !== "default" && activeSeason !== "madre" && activeSeason !== "mujer" && themeData.icon !== "") {
    // Fallback original simple particles for others
    createParticles(themeData.icon);
  }

  function createParticles(iconClass) {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement("i");
        particle.className = iconClass + " particle";
        const startPosX = Math.random() * 100;
        const animationDuration = 8 + Math.random() * 10;
        particle.style.left = startPosX + "vw";
        particle.style.animationDuration = animationDuration + "s";
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), animationDuration * 1000);
      }, i * 300);
    }
  }

  function createCinematicParticles(config) {
    for (let i = 0; i < config.count; i++) {
      // Spawn initial particles immediately with negative delays
      spawnCinematicParticle(config, true);
      // Setup the continuous loop for new particles
      setTimeout(() => {
        setInterval(() => spawnCinematicParticle(config, false), 8000 + Math.random() * 5000);
      }, Math.random() * 8000);
    }
  }

  function spawnCinematicParticle(config) {
    const p = document.createElement("div");
    p.className = "cinematic-particle";
    const icon = config.icons[Math.floor(Math.random() * config.icons.length)];
    
    // Soporte para imágenes PNG y Emojis
    if (icon.includes(".png") || icon.includes(".jpg") || icon.includes(".svg")) {
      const img = document.createElement("img");
      img.src = icon;
      img.className = "particle-img";
      p.appendChild(img);
    } else {
      p.innerHTML = icon;
    }
    
    let startPosX = 5 + Math.random() * 90;
    let startPosY = 5 + Math.random() * 90;
    let duration = 10 + Math.random() * 10;
    
    if (config.animation === "snowFallMultilevel" || config.animation === "rainOfPresents") {
      startPosY = -10;
      // Asignar aleatoriamente una capa de profundidad
      const depth = Math.random();
      const isImage = icon.includes(".png") || icon.includes(".jpg") || icon.includes(".svg");
      
      if (depth < 0.2) {
        // Foreground
        p.classList.add(isImage ? "present-fg" : "snow-fg");
        duration = isImage ? 8 + Math.random() * 6 : 3 + Math.random() * 4;
      } else if (depth < 0.6) {
        // Midground
        p.classList.add(isImage ? "present-mid" : "snow-mid");
        duration = isImage ? 14 + Math.random() * 8 : 8 + Math.random() * 7;
      } else {
        // Background
        p.classList.add(isImage ? "present-bg" : "snow-bg");
        duration = isImage ? 22 + Math.random() * 10 : 15 + Math.random() * 15;
      }
      
      p.style.left = (Math.random() * 100) + "vw";
      p.style.animation = `snowFall ${duration}s linear forwards`;
      
      // If initial spawn, set negative delay so it's already on screen
      if (arguments.length > 1 && arguments[1] === true) {
        p.style.animationDelay = `-${Math.random() * duration}s`;
      }
      
      // Balanceo extra para las imágenes
      if (isImage) {
         p.firstElementChild.style.animation = `sway ${3 + Math.random() * 3}s ease-in-out infinite alternate`;
      }
      
    } else if (config.animation === "kiteFly") {
      startPosX = -10;
      startPosY = 40 + Math.random() * 50;
      duration = 15 + Math.random() * 10;
    } else if (config.animation === "beachBounce") {
      startPosY = 110;
      duration = 8 + Math.random() * 6;
    }
    
    p.style.left = startPosX + "vw";
    p.style.top = startPosY + "vh";
    p.style.animation = `${config.animation} ${duration}s linear forwards`;
    
    document.body.appendChild(p);
    setTimeout(() => p.remove(), duration * 1000);
  }

  // 6. Frases de Mamá Consecutivas
  if (activeSeason === "madre" || activeSeason === "mujer") {
    createSequentialMomPhrases();
  }

  function createSequentialMomPhrases() {
    const phrases = [
      "Le entra por un oído y le sale por el otro.",
      "Cuando tenga hijos, se acordará de mí.",
      "Usted verá.",
      "Búsqueme, que me va a encontrar.",
      "Si un amigo suyo se tira de un balcón, ¿usted también?",
      "En la casa hay sopa.",
      "Más tarde hablamos.",
      "Cuento hasta 3 y voy en 2.",
      "En mi época no había eso.",
      "Mejor lo visto antes que alimentarlo.",
      "La casa no se va a limpiar sola.",
      "Pa’ qué cría cola la vaca.",
      "Mientras usted viva bajo este techo, aquí se hace lo que YO diga.",
      "Y si yo lo encuentro, ya sabe qué pasa.",
      "¿En qué idioma le tengo que hablar?",
      "Los pájaros tirándoles a las escopetas.",
      "No se le olvide que primero fue su mamá que ese noviecit@ suyo."
    ];
    let currentIndex = 0;
    
    const container = document.createElement("div");
    container.className = "mom-phrases-container";
    document.body.appendChild(container);

    function spawnPhrase() {
      const el = document.createElement("div");
      el.className = "mom-phrase";
      el.innerText = phrases[currentIndex];
      currentIndex = (currentIndex + 1) % phrases.length;
      
      const startPosX = 5 + Math.random() * 50; 
      const startPosY = 15 + Math.random() * 70;
      
      el.style.left = startPosX + "vw";
      el.style.top = startPosY + "vh";
      el.style.animation = `phraseFadeIn 6s ease-in-out forwards`;
      
      container.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }

    // Inicializar varias rápido
    setTimeout(spawnPhrase, 500);
    setTimeout(spawnPhrase, 2500);
    setTimeout(spawnPhrase, 4500);
    
    // Luego continuar cada 2 segundos
    setInterval(spawnPhrase, 2500);
  }

  // 5. Cargar Lógica Extra de Navidad (Overlay, Reloj, Hielo)
  if (activeSeason === "navidad" || activeSeason === "velitas") {
    const script = document.createElement("script");
    script.src = "js/navidad-extra.js";
    script.defer = true;
    document.body.appendChild(script);
  }
});

// Definir funciones globalmente si se necesitan fuera
window.changeSeason = function(season) {
  window.location.search = `?season=${season}`;
};
