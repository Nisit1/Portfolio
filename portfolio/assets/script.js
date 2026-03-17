const hamburger = document.querySelector(".nav-hamburger");
const navLinks = document.querySelector(".nav-links");
const navResume = document.querySelector(".nav-resume");
const overlay = document.querySelector(".nav-overlay");

// Function to open/close sidebar
function toggleSidebar() {
  navLinks.classList.toggle("active");
  navResume.classList.toggle("active");
  hamburger.classList.toggle("open");
  overlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
}

// Open sidebar when hamburger clicked
hamburger.addEventListener("click", toggleSidebar);

// Close sidebar function
function closeSidebar() {
  navLinks.classList.remove("active");
  navResume.classList.remove("active");
  hamburger.classList.remove("open");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

// Close sidebar on overlay click
overlay.addEventListener("click", closeSidebar);

// Close sidebar when any nav link is clicked
document.querySelectorAll(".nav-links .nav-link").forEach((link) => {
  link.addEventListener("click", closeSidebar);
});

// Close sidebar on close button click
const closeBtn = document.querySelector(".nav-close-btn");
if (closeBtn) {
  closeBtn.addEventListener("click", closeSidebar);
}
/* 
   1. SCROLL SPY — highlights active nav link
    */
(function initScrollSpy() {
  const NAV_SECTIONS = [
    "hero",
    "about",
    "experience",
    "skills",
    "projects",
    "contact",
  ];
  const navLinks = document.querySelectorAll(".nav-link");
  let ticking = false;

  function getActive() {
    const scrollY = window.scrollY + window.innerHeight / 3;
    let current = NAV_SECTIONS[0];

    for (const id of NAV_SECTIONS) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    }
    return current;
  }

  function updateActive() {
    const active = getActive();
    navLinks.forEach((link) => {
      const href = link.getAttribute("href")?.replace("#", "");
      link.classList.toggle("active", href === active);
    });
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateActive);
        ticking = true;
      }
    },
    { passive: true },
  );

  updateActive(); // set on load
})();

/* 
   2. SMOOTH SCROLL — nav links & CTA buttons
    */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* 
   3. LOGO — spin + scroll to top
    */
(function initLogo() {
  const logo = document.querySelector(".nav-logo");
  if (!logo) return;

  logo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    logo.classList.add("spin");
    setTimeout(() => logo.classList.remove("spin"), 600);
  });

  logo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") logo.click();
  });
})();

/* 
   4. HERO — fade-in on load
    */
window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    document
      .querySelectorAll(".hero-badge, .hero-heading, .hero-desc, .hero-cta")
      .forEach((el) => el.classList.add("visible"));
  });
});

/* 
   5. INTERSECTION OBSERVER — scroll reveal
      Watches any element with class .reveal / .reveal-left /
      .reveal-right / .reveal-line and adds .visible when it
      enters the viewport.
    */
(function initReveal() {
  const SELECTORS = ".reveal, .reveal-left, .reveal-right, .reveal-line";
  const targets = document.querySelectorAll(SELECTORS);

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12 },
  );

  targets.forEach((el) => observer.observe(el));
})();

/* 
   6. ABOUT — staggered stat reveal
    */
(function initStatReveal() {
  const statsSection = document.querySelector(".stats-row");
  if (!statsSection) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll(".stat-item").forEach((item, i) => {
        item.style.transitionDelay = `${0.4 + i * 0.1}s`;
        item.classList.add("reveal");
        requestAnimationFrame(() => item.classList.add("visible"));
      });
      observer.unobserve(entry.target);
    },
    { threshold: 0.2 },
  );

  observer.observe(statsSection);
})();

/* 
   7. EDU TIMELINE — staggered slide-in from left
    */
(function initEduReveal() {
  const items = document.querySelectorAll(".edu-item");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  items.forEach((item, i) => {
    item.classList.add("reveal-left");
    item.style.transitionDelay = `${i * 0.12}s`;
    observer.observe(item);
  });
})();

/* 
   8. SKILL CARDS — staggered fade-up
    */
(function initSkillReveal() {
  const cards = document.querySelectorAll(".skill-card");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  cards.forEach((card, i) => {
    card.classList.add("reveal");
    card.style.transitionDelay = `${0.05 + i * 0.08}s`;
    observer.observe(card);
  });
})();

/* 
   9. PROJECTS — fade-up each item
    */
(function initProjectReveal() {
  const items = document.querySelectorAll(".project-item");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  items.forEach((item, i) => {
    item.classList.add("reveal");
    item.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(item);
  });
})();

/* 
   10. CONTACT FORM — submit handler
    */
(function initContactForm() {
  const form = document.querySelector("#contact-form");
  const submitBtn = document.querySelector(".btn-submit");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitBtn.textContent = "Message Sent ✓";
    submitBtn.classList.add("sent");

    setTimeout(() => {
      submitBtn.textContent = "Send Message ➤";
      submitBtn.classList.remove("sent");
      form.reset();
    }, 3000);
  });
})();

/* 
   11. SCROLL-TO-TOP BUTTON
    */
(function initScrollTop() {
  const btn = document.querySelector(".scroll-top");
  if (!btn) return;
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
})();
