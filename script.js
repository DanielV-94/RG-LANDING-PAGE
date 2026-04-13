gsap.registerPlugin(ScrollTrigger);

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const loader = $("#page-loader");
const header = $(".site-header");
const menuToggle = $("#menu-toggle");
const mainNav = $("#main-nav");
const cursorDot = $("#cursor-dot");
const cursorRing = $("#cursor-ring");
const scrollProgress = $("#scroll-progress");

// Lightbox
const lightbox = $("#lightbox");
const lightboxImg = $("#lightbox-img");
const lightboxCaption = $("#lightbox-caption");
const lightboxClose = $("#lightbox-close");
const lightboxBackdrop = $("#lightbox-backdrop");

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightboxCaption.textContent = alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";

  gsap.fromTo(
    lightboxBackdrop,
    { opacity: 0 },
    { opacity: 1, duration: 0.3, ease: "power2.out" },
  );
  gsap.fromTo(
    ".lightbox-inner",
    { opacity: 0, scale: 0.88, y: 24 },
    { opacity: 1, scale: 1, y: 0, duration: 0.38, ease: "power3.out" },
  );
  gsap.fromTo(
    ".lightbox-close",
    { opacity: 0, scale: 0.7, rotate: -45 },
    {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 0.32,
      ease: "back.out(1.5)",
      delay: 0.1,
    },
  );
}

function closeLightbox() {
  const tl = gsap.timeline({
    onComplete: () => {
      lightbox.hidden = true;
      lightboxImg.src = "";
      document.body.style.overflow = "";
    },
  });
  tl.to(".lightbox-close", {
    opacity: 0,
    scale: 0.7,
    duration: 0.18,
    ease: "power2.in",
  })
    .to(
      ".lightbox-inner",
      { opacity: 0, scale: 0.9, y: 16, duration: 0.25, ease: "power2.in" },
      "<",
    )
    .to(
      lightboxBackdrop,
      { opacity: 0, duration: 0.22, ease: "power2.in" },
      "<0.05",
    );
}

$$(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    const img = $("img", card);
    openLightbox(img.src, img.alt);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxBackdrop) {
  lightboxBackdrop.addEventListener("click", closeLightbox);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && !lightbox.hidden) {
    closeLightbox();
  }
});

// Año automático de footer
$("#year").textContent = new Date().getFullYear();

// Loader inicial
if (loader) {
  if (reduceMotion) {
    loader.remove();
  } else {
    const loaderTl = gsap.timeline({ defaults: { ease: "power2.out" } });
    loaderTl
      .from(loader.querySelector("img"), { y: 20, opacity: 0, duration: 0.55 })
      .from(
        loader.querySelector("span"),
        { y: 12, opacity: 0, duration: 0.4 },
        "<0.1",
      )
      .to(loader, {
        opacity: 0,
        duration: 0.5,
        delay: 0.4,
        onComplete: () => loader.remove(),
      });
  }
}

// Menú móvil
if (menuToggle && header && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  $$("a", mainNav).forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Cursor custom (solo escritorio)
if (cursorDot && cursorRing && !reduceMotion && window.innerWidth > 960) {
  const interactiveSelector = "a, button, .service-card, .btn";

  window.addEventListener("mousemove", (event) => {
    gsap.to(cursorDot, {
      x: event.clientX,
      y: event.clientY,
      duration: 0.08,
      ease: "none",
    });

    gsap.to(cursorRing, {
      x: event.clientX,
      y: event.clientY,
      duration: 0.25,
      ease: "power3.out",
    });
  });

  $$(interactiveSelector).forEach((item) => {
    item.addEventListener("mouseenter", () =>
      cursorRing.classList.add("active"),
    );
    item.addEventListener("mouseleave", () =>
      cursorRing.classList.remove("active"),
    );
  });
}

// Barra de progreso de scroll
if (scrollProgress) {
  gsap.to(scrollProgress, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
}

if (!reduceMotion) {
  // Animación de entrada principal
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .from(".site-header", { y: -24, opacity: 0, duration: 0.7 })
    .from(
      ".reveal",
      { y: 40, opacity: 0, duration: 0.85, stagger: 0.11 },
      "<0.1",
    )
    .from(".hero-showcase", { scale: 0.92, opacity: 0, duration: 1 }, "<0.2");

  // Orbes del hero con movimiento continuo
  $$(".hero-bg-orb").forEach((orb, idx) => {
    gsap.to(orb, {
      y: idx % 2 === 0 ? 16 : -16,
      x: idx % 2 === 0 ? -10 : 10,
      duration: 3 + idx,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  // Reveal por scroll
  $$(".section").forEach((section) => {
    gsap.from(section.children, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
      y: 26,
      opacity: 0,
      duration: 0.75,
      stagger: 0.13,
      ease: "power2.out",
    });
  });

  // Cards con entrada y parallax sutil
  $$(".service-card").forEach((card, idx) => {
    const img = $("img", card);

    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: idx * 0.04,
      ease: "power3.out",
    });

    gsap.to(img, {
      yPercent: -7,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
      },
    });
  });

  // Botones magnéticos (microinteracción premium)
  $$(".magnetic").forEach((button) => {
    const intensity = 18;

    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: (x / rect.width) * intensity,
        y: (y / rect.height) * intensity,
        duration: 0.32,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: "elastic.out(1, 0.35)",
      });
    });
  });
}
