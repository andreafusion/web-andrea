window.addEventListener("load", () => {
  console.log("✅ script.js cargado");

  // Marca que hay JS (para tus clases .reveal si quieres usarlas)
  document.body.classList.add("has-js");

  // Preferencias de accesibilidad
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // -------------------------
  // MENÚ MÓVIL (overlay naranja)
  // -------------------------
  const menuBtn = document.getElementById("menu-toggle");
  const menuOverlay = document.getElementById("full-menu");

  if (menuBtn && menuOverlay) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      menuOverlay.classList.toggle("active");

      if (menuOverlay.classList.contains("active")) {
        document.body.style.overflow = "hidden";

        // Animación links overlay (si hay GSAP y no reduce motion)
        if (!prefersReducedMotion && typeof gsap !== "undefined") {
          gsap.fromTo(
            ".full-menu-links a",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power4.out", delay: 0.1 }
          );
        }
      } else {
        document.body.style.overflow = "auto";
      }
    });

    // Cerrar overlay al clicar un link
    menuOverlay.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    });
  }

  // -------------------------
  // SCROLL SUAVE (nav desktop + overlay + back-to-top)
  // -------------------------
  const smoothLinks = document.querySelectorAll(".nav-links a, .full-menu-links a, .back-to-top");
  smoothLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("href");
      if (!target || !target.startsWith("#")) return;

      e.preventDefault();

      // Si GSAP + ScrollToPlugin existen, usamos scroll premium
      if (typeof gsap !== "undefined" && typeof ScrollToPlugin !== "undefined") {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: target, offsetY: 80 },
          ease: "power4.inOut"
        });
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Si el usuario reduce movimiento, no animamos nada más
  if (prefersReducedMotion) return;

  // -------------------------
  // GSAP (animaciones)
  // -------------------------
  if (typeof gsap === "undefined") {
    console.warn("GSAP no está cargado.");
    return;
  }

  if (typeof ScrollTrigger === "undefined") {
    console.warn("ScrollTrigger no está cargado.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Círculo del hero (rotación infinita)
  gsap.to(".circle", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none"
  });

  // Tarjetas flotantes en solución
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

  // Texto solución
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

  // Servicios (entrada)
  gsap.from(".servicio-item", {
    scrollTrigger: {
      trigger: ".servicios",
      start: "top 55%",
      toggleActions: "play none none none"
    },
    y: 80,
    opacity: 0,
    duration: 1.1,
    stagger: 0.2,
    ease: "power4.out"
  });

  // Proyectos (destacado)
  gsap.from(".proyecto-card.destacado", {
    scrollTrigger: {
      trigger: ".proyectos-grid",
      start: "top 80%"
    },
    x: -50,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
  });

  // Proyectos secundarios (cascada)
  gsap.from(".proyectos-secundarios .proyecto-card", {
    scrollTrigger: {
      trigger: ".proyectos-secundarios",
      start: "top 80%"
    },
    x: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.25,
    ease: "power4.out"
  });

  // Reveal genérico
  gsap.utils.toArray(".reveal").forEach((el) => {
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
});

// -------------------------
// FORMULARIO (Formspree)
// -------------------------
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("form-status");
    const btn = form.querySelector("button");

    btn.disabled = true;
    btn.innerText = "enviando...";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        status.textContent = "¡recibido! te escribo pronto.";
        form.reset();
      } else {
        status.textContent = "ops. algo falló. prueba otra vez o escríbeme por email.";
      }
    } catch (err) {
      status.textContent = "ops. error de red. prueba otra vez o escríbeme por email.";
    }

    btn.disabled = false;
    btn.innerText = "quiero una auditoría express";
  });
}
