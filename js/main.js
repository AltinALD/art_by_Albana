import { works, i18n } from "./data.js";
import { createGallery3D } from "./gallery3d.js";

(() => {
  let lang = localStorage.getItem("ao-lang") || "sq";
  if (!i18n[lang]) lang = "sq";

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const nav = document.querySelector(".site-nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Interactive monochrome hero */
  const hero = document.querySelector("[data-hero]");
  const heroParallax = document.querySelector("[data-hero-parallax]");
  const heroLight = document.querySelector("[data-hero-light]");
  const heroCopy = document.querySelector("[data-hero-copy]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (hero && heroParallax && !reduceMotion) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const renderHeroMotion = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      heroParallax.style.transform = `translate3d(${currentX * 18}px, ${currentY * 12}px, 0) scale(1.06)`;
      if (heroCopy) {
        heroCopy.style.transform = `translate3d(${currentX * -8}px, ${currentY * -5}px, 0)`;
      }
      requestAnimationFrame(renderHeroMotion);
    };
    requestAnimationFrame(renderHeroMotion);

    hero.addEventListener("pointerenter", () => hero.classList.add("is-lit"));
    hero.addEventListener("pointerleave", () => {
      hero.classList.remove("is-lit");
      targetX = 0;
      targetY = 0;
    });
    hero.addEventListener(
      "pointermove",
      (e) => {
        const rect = hero.getBoundingClientRect();
        targetX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
        targetY = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
        if (heroLight) {
          heroLight.style.left = `${e.clientX - rect.left}px`;
          heroLight.style.top = `${e.clientY - rect.top}px`;
        }
      },
      { passive: true }
    );
  }

  const t = (key) => (i18n[lang] && i18n[lang][key]) || key;

  const panel = {
    root: document.querySelector("[data-art-panel]"),
    title: document.querySelector("[data-art-title]"),
    meta: document.querySelector("[data-art-meta]"),
    price: document.querySelector("[data-art-price]"),
    story: document.querySelector("[data-art-story]"),
    moreBtn: document.querySelector("[data-art-more]"),
    reserve: document.querySelector("[data-art-reserve]"),
    close: document.querySelector("[data-art-close]"),
  };

  let storyOpen = false;
  let activeWork = null;
  let galleryApi = null;

  const priceHtml = (work, copy) => {
    if (work.priceless) {
      return `<span class="art-panel__price-note">${copy.priceNote}</span>`;
    }
    return `<span class="currency">EUR</span>${work.price}`;
  };

  const fillPanel = (work) => {
    activeWork = work;
    storyOpen = false;
    const copy = work[lang] || work.sq;
    if (panel.title) panel.title.textContent = copy.title;
    if (panel.meta) panel.meta.textContent = copy.meta;
    if (panel.price) {
      panel.price.classList.toggle("is-note", !!work.priceless);
      panel.price.innerHTML = priceHtml(work, copy);
    }
    if (panel.story) {
      panel.story.innerHTML = `<span class="story-teaser">${copy.teaser}</span><span class="story-ellipsis">…</span><span class="story-full">${copy.full}</span>`;
      panel.story.classList.remove("is-open");
    }
    if (panel.moreBtn) {
      panel.moreBtn.textContent = t("gallery.more");
      panel.moreBtn.setAttribute("aria-expanded", "false");
    }
  };

  const showPanel = (work) => {
    fillPanel(work);
    panel.root?.classList.add("is-open");
    document.body.classList.add("art-focused");
  };

  const hidePanel = () => {
    panel.root?.classList.remove("is-open");
    document.body.classList.remove("art-focused");
    activeWork = null;
  };

  panel.moreBtn?.addEventListener("click", () => {
    if (!panel.story) return;
    storyOpen = !storyOpen;
    panel.story.classList.toggle("is-open", storyOpen);
    panel.moreBtn.textContent = storyOpen ? t("gallery.less") : t("gallery.more");
    panel.moreBtn.setAttribute("aria-expanded", storyOpen ? "true" : "false");
  });

  panel.close?.addEventListener("click", () => {
    galleryApi?.blurFocus();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && galleryApi?.getFocusedId()) {
      galleryApi.blurFocus();
    }
  });

  const applyStaticI18n = () => {
    document.documentElement.lang = lang;
    document.title = t("doc.title");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key) el.setAttribute("placeholder", t(key));
    });
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (activeWork) fillPanel(activeWork);
    if (panel.reserve) panel.reserve.textContent = t("gallery.reserve");
    if (panel.close) panel.close.textContent = t("gallery.back");
  };

  const observePieces = () => {
    const pieces = document.querySelectorAll("[data-piece]");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
      );
      pieces.forEach((el) => io.observe(el));
    } else {
      pieces.forEach((el) => el.classList.add("is-visible"));
    }
  };

  const renderGallery = () => {
    const grid = document.getElementById("gallery-grid");
    if (!grid) return;
    const openIds = new Set(
      [...grid.querySelectorAll(".piece.is-open")].map((el) => el.dataset.id)
    );

    grid.innerHTML = works
      .map((work) => {
        const copy = work[lang] || work.sq;
        const isOpen = openIds.has(work.id);
        return `
          <article class="piece${isOpen ? " is-open is-visible" : ""}" data-piece data-id="${work.id}">
            <figure class="piece-frame">
              <img src="${work.image}" alt="${copy.title}" loading="lazy" />
            </figure>
            <div class="piece-info">
              <div class="piece-top">
                <div>
                  <h3 class="piece-title">${copy.title}</h3>
                  <p class="piece-meta">${copy.meta}</p>
                </div>
                <p class="piece-price${work.priceless ? " piece-price--note" : ""}">${
                  work.priceless
                    ? copy.priceNote
                    : `<span class="currency">EUR</span>${work.price}`
                }</p>
              </div>
              <p class="piece-story">
                <span class="story-teaser">${copy.teaser}</span><span class="story-ellipsis">…</span><span class="story-full">${copy.full}</span>
              </p>
              <div class="piece-actions">
                <button type="button" class="story-toggle" data-toggle-story aria-expanded="${isOpen ? "true" : "false"}">
                  ${isOpen ? t("gallery.less") : t("gallery.more")}
                </button>
                <button type="button" class="piece-view3d" data-focus-3d="${work.id}">3D</button>
                <a class="piece-reserve" href="#contact">${t("gallery.reserve")}</a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    grid.querySelectorAll("[data-toggle-story]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const piece = btn.closest(".piece");
        if (!piece) return;
        const open = piece.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.textContent = open ? t("gallery.less") : t("gallery.more");
      });
    });

    grid.querySelectorAll("[data-focus-3d]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-focus-3d");
        document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => galleryApi?.focusWork(id), 450);
      });
    });

    observePieces();
  };

  const renderThumbs = () => {
    const rail = document.querySelector("[data-work-rail]");
    if (!rail) return;
    rail.innerHTML = works
      .map((work, i) => {
        const copy = work[lang] || work.sq;
        return `<button type="button" class="work-rail__btn" data-rail-id="${work.id}" aria-label="${copy.title}">
          <img src="${work.image}" alt="" />
          <span>${String(i + 1).padStart(2, "0")}</span>
        </button>`;
      })
      .join("");

    rail.querySelectorAll("[data-rail-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-rail-id");
        galleryApi?.focusWork(id);
      });
    });
  };

  const setLang = (next) => {
    if (!i18n[next]) return;
    lang = next;
    localStorage.setItem("ao-lang", lang);
    applyStaticI18n();
    renderGallery();
    renderThumbs();
  };

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.getAttribute("data-lang");
      if (next) setLang(next);
    });
  });

  applyStaticI18n();
  renderGallery();
  renderThumbs();

  /* Boot 3D gallery */
  const mount = document.querySelector("[data-gallery3d]");
  const loaderEl = document.querySelector("[data-gallery-loader]");
  const fallbackEl = document.querySelector("[data-gallery-fallback]");

  if (mount) {
    galleryApi = createGallery3D({
      mount,
      getLang: () => lang,
      onFocus: (work) => {
        showPanel(work);
        document.querySelectorAll("[data-rail-id]").forEach((btn) => {
          btn.classList.toggle("is-active", btn.getAttribute("data-rail-id") === work.id);
        });
      },
      onBlur: () => {
        hidePanel();
        document.querySelectorAll("[data-rail-id]").forEach((btn) => btn.classList.remove("is-active"));
      },
      onReady: () => {
        loaderEl?.classList.add("is-done");
        mount.classList.add("is-ready");
      },
      onError: () => {
        loaderEl?.classList.add("is-done");
        fallbackEl?.classList.add("is-visible");
        mount.classList.add("is-failed");
      },
    });
  }

  const form = document.querySelector(".inquire-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = t("contact.sent");
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.textContent = t("contact.send");
        btn.disabled = false;
      }, 2200);
    });
  }
})();
