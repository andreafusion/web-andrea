window.addEventListener("load", () => {
  console.log("✅ script.js cargado");

  // ✅ Seguridad: comprobar que gsap existe
  if (typeof gsap === "undefined") {
    console.error("GSAP no está cargado");
    return;
  }

  // ✅ Si vas a usar ScrollTrigger, debe existir
  if (typeof ScrollTrigger === "undefined") {
    console.error("ScrollTrigger no está cargado. Revisa el <script> de ScrollTrigger.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1) (Opcional) animación del círculo decorativo
  gsap.to(".circle", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none"
  });

  // 2) (Opcional) tarjetas flotantes en sección solución
  gsap.to(".floating-card", {
    scrollTrigger: {
      trigger: ".solucion",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    },
    y: -100,
    stagger: 0.2
  });
 // --- ANIMACIÓN DE SERVICIOS (Versión Ultra-Segura) ---
    gsap.from(".servicio-item", {
        scrollTrigger: {
            trigger: ".servicios",     // Cambiamos el disparador a la sección entera
            start: "top 50%",          // Se activa cuando la sección entra un 20% en pantalla
            toggleActions: "play none none none",
            // markers: true           // <-- Si quieres ver dónde se dispara, quita las //
        },
        y: 100,                        // Aumentamos el movimiento para que se note más
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,                  // Más espacio entre uno y otro
        ease: "power4.out"             // Un movimiento más premium
    });

  // 3) (Opcional) texto solución
  gsap.from(".solucion-texto", {
    scrollTrigger: {
      trigger: ".solucion-texto",
      start: "top 85%"
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power2.out"
  });
  // Animación Proyecto Destacado (Entra desde la izquierda)
gsap.from(".proyecto-card.destacado", {
    scrollTrigger: {
        trigger: ".proyectos-grid",
        start: "top 80%",
    },
    x: -50,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
});

// Animación Proyectos Secundarios (Entran desde la derecha en cascada)
gsap.from(".proyectos-secundarios .proyecto-card", {
    scrollTrigger: {
        trigger: ".proyectos-secundarios",
        start: "top 80%",
    },
    x: 50,
    opacity: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: "power4.out"
});
    });
    // 8. Animación CTA Final
    gsap.from(".cta-final .container", {
        scrollTrigger: {
            trigger: ".cta-final",
            start: "top 70%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });

  // ✅ 4) REVEAL para cualquier elemento con .reveal
  const revealEls = gsap.utils.toArray(".reveal");
  console.log("revealEls encontrados:", revealEls.length);

  revealEls.forEach((el) => {
    // Estado inicial (solo lo aplicamos con JS para que no “desaparezca” si falla)
    gsap.set(el, { autoAlpha: 0, y: 18 });

    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  });
  // 9. Scroll Suave con GSAP para los enlaces del menú
    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Evitamos el salto brusco
            const target = e.target.getAttribute("href");
            
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: target, offsetY: 70 },
                ease: "power4.inOut"
            });
        });
        // --- LÓGICA MENÚ MÓVIL (Sincronizada) ---
const menuBtn = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('full-menu');

if (menuBtn && menuOverlay) {
    menuBtn.onclick = function() {
        // Toggle para el botón (se convierte en X)
        this.classList.toggle('active');
        // Toggle para el fondo naranja (aparece/desaparece)
        menuOverlay.classList.toggle('active');
        
        // Bloquear el scroll del cuerpo para que no se mueva la web de fondo
        if (menuOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    // Cerrar al hacer clic en los enlaces
    const navLinks = menuOverlay.querySelectorAll('a');
    navLinks.forEach(link => {
        link.onclick = function() {
            menuBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
    });
}
    });
