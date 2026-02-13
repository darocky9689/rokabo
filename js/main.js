/*
  rokabo main interactions
  - Mobile navigation toggle
  - Smooth scrolling
  - Contact form validation with user feedback
  - Simple reveal-on-scroll animation
*/

document.addEventListener("DOMContentLoaded", async () => {
  await loadSharedLayout();
  initActiveNavigation();
  initMobileNavigation();
  initHeaderScrollState();
  initAmbientMotion();
  initSmoothScrolling();
  initRevealAnimation();
  initContactForms();
});

async function loadSharedLayout() {
  await Promise.all([
    injectPartial("[data-site-header]", "partials/header.html"),
    injectPartial("[data-site-footer]", "partials/footer.html")
  ]);
}

async function injectPartial(selector, filePath) {
  const target = document.querySelector(selector);
  if (!target) return;

  try {
    const response = await fetch(filePath, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Partial konnte nicht geladen werden: ${filePath}`);
    }

    target.outerHTML = await response.text();
  } catch (error) {
    console.warn(error);
  }
}

function initActiveNavigation() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const isActive = href === currentPath;

    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initMobileNavigation() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-mobile-nav]");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function initHeaderScrollState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const syncState = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };

  syncState();
  window.addEventListener("scroll", syncState, { passive: true });
}

function initAmbientMotion() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || window.innerWidth < 768) return;

  const motionTargets = document.querySelectorAll(".hero-card, .cta-banner");
  if (!motionTargets.length) return;

  let rafId = null;
  let mouseX = 0;
  let mouseY = 0;

  const animate = () => {
    const offsetX = (mouseX / window.innerWidth - 0.5) * 8;
    const offsetY = (mouseY / window.innerHeight - 0.5) * 8;

    motionTargets.forEach((el, index) => {
      const factor = index % 2 === 0 ? 1 : 0.7;
      el.style.transform = `translate3d(${offsetX * factor}px, ${offsetY * factor}px, 0)`;
    });

    rafId = null;
  };

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (!rafId) {
      rafId = window.requestAnimationFrame(animate);
    }
  });
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initRevealAnimation() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initContactForms() {
  const forms = document.querySelectorAll("[data-contact-form]");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const fields = [
        { id: "name", label: "Name", required: true },
        { id: "email", label: "E-Mail", required: true, type: "email" },
        { id: "company", label: "Unternehmen", required: true },
        { id: "package", label: "Paket", required: true },
        { id: "message", label: "Nachricht", required: true, min: 20 }
      ];

      let valid = true;
      clearFormErrors(form);

      fields.forEach((field) => {
        const input = form.querySelector(`#${field.id}`);
        if (!input) return;

        const value = input.value.trim();
        if (field.required && !value) {
          setFieldError(input, `Bitte ${field.label.toLowerCase()} ausfüllen.`);
          valid = false;
          return;
        }

        if (field.type === "email" && !isValidEmail(value)) {
          setFieldError(input, "Bitte eine gültige E-Mail-Adresse angeben.");
          valid = false;
        }

        if (field.min && value.length < field.min) {
          setFieldError(input, `Bitte mindestens ${field.min} Zeichen schreiben.`);
          valid = false;
        }
      });

      if (!valid) return;

      const success = form.querySelector("[data-form-success]");
      if (success) {
        success.style.display = "block";
      }

      // Optional mailto fallback for static hosting.
      const name = encodeURIComponent(form.querySelector("#name")?.value || "");
      const email = encodeURIComponent(form.querySelector("#email")?.value || "");
      const company = encodeURIComponent(form.querySelector("#company")?.value || "");
      const packageName = encodeURIComponent(form.querySelector("#package")?.value || "");
      const message = encodeURIComponent(form.querySelector("#message")?.value || "");

      const subject = encodeURIComponent("Neue Anfrage über rokabo Website");
      const body = `Name: ${name}%0AUnternehmen: ${company}%0AE-Mail: ${email}%0AGewünschtes Paket: ${packageName}%0A%0ANachricht:%0A${message}`;

      const mailtoLink = `mailto:info@rokabo.de?subject=${subject}&body=${body}`;
      window.setTimeout(() => {
        window.location.href = mailtoLink;
      }, 350);

      form.reset();
    });
  });
}

function clearFormErrors(form) {
  form.querySelectorAll(".error").forEach((error) => error.remove());
  form.querySelectorAll("[aria-invalid='true']").forEach((field) => {
    field.setAttribute("aria-invalid", "false");
  });
}

function setFieldError(input, message) {
  input.setAttribute("aria-invalid", "true");
  const p = document.createElement("p");
  p.className = "error";
  p.textContent = message;
  input.insertAdjacentElement("afterend", p);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
