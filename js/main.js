(() => {
  const works = [
    {
      id: "love-bears-all-things",
      image: "assets/art/love-bears-all-things.png",
      price: null,
      priceless: true,
      size: "Oil on canvas",
      sq: {
        title: "Love Bears All Things",
        meta: "Vaj në kanavacë · Unike",
        priceNote: "Dashuria është e paçmuar",
        teaser:
          "Dy trupa të mbështetur në njëri-tjetrin, të ngrohur nga e kuqja e mbrëmjes. ",
        full:
          "Kjo vepër lindi nga ideja se dashuria nuk është spektakël — është qëndrim. Furçat e trasha mbajnë frymën e dy njerëzve që pushojnë në të njëjtën heshtje: pa fjalë, pa maskë, vetëm prani. Ngjyrat e nxehta ngrihen si kujtesë e një nate ku bota jashtë ndalet, ndërsa brenda dy zemrave mbeten të hapura. «Dashuria i duron të gjitha» — dhe këtu, ajo duket e butë, e gjallë dhe e vërtetë.",
      },
      en: {
        title: "Love Bears All Things",
        meta: "Oil on canvas · Unique",
        priceNote: "Love is priceless",
        teaser:
          "Two bodies resting into each other, warmed by the red of evening. ",
        full:
          "This piece grew from the belief that love is not spectacle — it is presence. Thick strokes hold the breath of two people sharing the same quiet: no performance, only nearness. Warm color rises like the memory of a night when the world outside paused, while two hearts stayed open. “Love bears all things” — and here, it looks soft, alive, and true.",
      },
    },
    {
      id: "lypesi",
      image: "assets/art/lypesi.png",
      price: 1600,
      size: "Oil on canvas",
      sq: {
        title: "Lypësi",
        meta: "Vaj në kanavacë · Unike",
        teaser:
          "Një figurë e përkulur — jo si mungesë, por si dëshmi. ",
        full:
          "«Lypësi» nuk është vetëm një portret i varfërisë; është një pyetje për dinjitetin. Trupi i mbledhur, drita e ftohtë në lëkurë dhe errësira që e rrethon flasin për ato që shoqëria shpesh kalon pa i parë. Albana e pikturoi me respekt, jo me mëshirë të lehtë — që shikuesi të ndalet, të ndiejë peshën, dhe të kujtojë se çdo njeri mban një histori që meriton hapësirë në mur dhe në zemër.",
      },
      en: {
        title: "Lypësi (The Beggar)",
        meta: "Oil on canvas · Unique",
        teaser:
          "A curled figure — not as absence, but as witness. ",
        full:
          "“Lypësi” is not only a portrait of poverty; it is a question about dignity. The gathered body, the cool light on skin, and the darkness around it speak for those society too often walks past. Albana painted it with respect, not easy pity — so the viewer pauses, feels the weight, and remembers that every person carries a story that deserves space on a wall and in the heart.",
      },
    },
    {
      id: "orange-velvet",
      image: "assets/art/orange-velvet.png",
      price: 1450,
      size: "Abstract · Canvas",
      sq: {
        title: "Orange Velvet!",
        meta: "Abstrakte · Kanavacë · Unike",
        teaser:
          "Portokalli që digjet qetë — si kadife e ngrohtë mbi mur. ",
        full:
          "«Orange Velvet!» është një shpërthim i kontrolluar i ngrohtësisë. Shtresat e portokallit, të verdhës dhe hijeve të thella krijojnë një ndjesi luksi të butë — si prekje kadifeje në dritë të mbrëmjes. Kjo vepër u mendua për hapësira moderne: të sjellë energji pa zhurmë, të ngrohtë një dhomë grize, dhe të të kujtojë se abstraksioni mund të jetë po aq emocional sa një fytyrë.",
      },
      en: {
        title: "Orange Velvet!",
        meta: "Abstract · Canvas · Unique",
        teaser:
          "Orange that burns quietly — like warm velvet on a wall. ",
        full:
          "“Orange Velvet!” is a controlled burst of warmth. Layers of orange, gold, and deep shadow create a soft luxury — like velvet touched by evening light. The piece was imagined for modern rooms: to bring energy without noise, warm a grey space, and remind you that abstraction can feel as emotional as a face.",
      },
    },
    {
      id: "red-lady",
      image: "assets/art/red-lady.png",
      price: 1800,
      size: "90 × 70 cm",
      sq: {
        title: "Red Lady",
        meta: "90 × 70 cm · Vaj · Unike",
        teaser:
          "Një grua e kuqe që mban krahët mbi gjoks — e fortë dhe e brishtë. ",
        full:
          "«Red Lady» është portret i forcës së qetë. Ngjyra e kuqe e thellë nuk bërtet; ajo mbron. Krahtë e kryqëzuara, aureola e lehtë dhe sfondi i pastër e bëjnë figurën të duket si dikush që ka kaluar stuhi dhe ka zgjedhur të qëndrojë. Kjo vepër (90×70 cm) u krijua për të mbajtur prani në hapësira të mëdha — një kujtesë se eleganca shpesh lind nga qëndrueshmëria.",
      },
      en: {
        title: "Red Lady",
        meta: "90 × 70 cm · Oil · Unique",
        teaser:
          "A red woman with arms across her chest — strong and tender. ",
        full:
          "“Red Lady” is a portrait of quiet strength. Deep crimson does not shout; it protects. Crossed arms, a soft halo, and a clean ground make her feel like someone who has weathered storms and chosen to stay. This 90×70 cm work was made to hold presence in open rooms — a reminder that elegance often grows from endurance.",
      },
    },
  ];

  const i18n = {
    sq: {
      "nav.gallery": "Galeria",
      "nav.artist": "Artistja",
      "nav.contact": "Kontakt",
      "hero.title": "Ngjyra që mbajnë kujtesën.",
      "hero.lede":
        "Piktura origjinale figurative nga Shqipëria — të nënshkruara, të gatshme për murin tuaj.",
      "hero.cta1": "Shiko koleksionin",
      "hero.cta2": "Porosi një vepër",
      "quote.text": "« Dashuria i duron të gjitha. »",
      "quote.attr": "— Fjala e njohur · frymëzim i koleksionit",
      "gallery.eyebrow": "Koleksioni",
      "gallery.title": "Vepra të disponueshme",
      "gallery.lede":
        "Çdo pikturë ka një histori. Lexo një copë — pastaj shiko më shumë.",
      "gallery.more": "Shiko më shumë",
      "gallery.less": "Mbyll historinë",
      "gallery.reserve": "Rezervo",
      "artist.eyebrow": "Artistja",
      "artist.role": "Piktore · Shqipëri",
      "artist.p1":
        "Albana pikturon figura, heshtje dhe dritë — me furçë të trashë dhe paletë që mban ngrohtësi. Punimet e saj flasin për dashuri, brishtësi dhe dinjitetin e njeriut të zakonshëm.",
      "artist.p2":
        "Nga studioja në Shqipëri, veprat dërgohen në Evropë dhe më gjerë. Porosi personale janë të mirëpritura.",
      "artist.quote": "« Në çdo tuş fshihet një frymëmarrje. »",
      "contact.eyebrow": "Kontakt",
      "contact.title": "Rezervo një vepër ose nis një porosi",
      "contact.lede": "Na trego veprën, hapësirën dhe ku duhet të mbërrijë.",
      "contact.name": "Emri",
      "contact.email": "Email",
      "contact.message": "Mesazhi",
      "contact.placeholder": "Titulli i veprës, madhësia, qyteti…",
      "contact.send": "Dërgo kërkesën",
      "contact.sent": "Kërkesa u pranua",
      "contact.note":
        "Çmimet janë në EUR. Transporti ndërkombëtar ofrohet me kërkesë.",
      "footer.meta": "Krijuar me dorë në Shqipëri · Dërgesë botërore",
      "doc.title": "Albana Osmani — Galeri Arte",
    },
    en: {
      "nav.gallery": "Gallery",
      "nav.artist": "Artist",
      "nav.contact": "Contact",
      "hero.title": "Colour that holds memory.",
      "hero.lede":
        "Original figurative paintings from Albania — signed and ready for your wall.",
      "hero.cta1": "View collection",
      "hero.cta2": "Commission a piece",
      "quote.text": "« Love bears all things. »",
      "quote.attr": "— The familiar words · collection inspiration",
      "gallery.eyebrow": "Collection",
      "gallery.title": "Available works",
      "gallery.lede":
        "Every painting carries a story. Read a glimpse — then see more.",
      "gallery.more": "See more",
      "gallery.less": "Close story",
      "gallery.reserve": "Reserve",
      "artist.eyebrow": "The artist",
      "artist.role": "Painter · Albania",
      "artist.p1":
        "Albana paints figures, silence, and light — with thick brushwork and a palette that holds warmth. Her works speak of love, vulnerability, and the dignity of ordinary people.",
      "artist.p2":
        "From the studio in Albania, works ship across Europe and beyond. Personal commissions are welcome.",
      "artist.quote": "« In every stroke, a breath is hidden. »",
      "contact.eyebrow": "Inquire",
      "contact.title": "Reserve a work or start a commission",
      "contact.lede": "Tell us the piece, the space, and where it should arrive.",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.placeholder": "Piece title, size preference, city…",
      "contact.send": "Send inquiry",
      "contact.sent": "Inquiry received",
      "contact.note":
        "Prices are in EUR. International shipping available on request.",
      "footer.meta": "Handcrafted in Albania · Worldwide delivery",
      "doc.title": "Albana Osmani — Art Gallery",
    },
  };

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

  /* Interactive monochrome hero — parallax + soft spotlight */
  const hero = document.querySelector("[data-hero]");
  const heroParallax = document.querySelector("[data-hero-parallax]");
  const heroLight = document.querySelector("[data-hero-light]");
  const heroCopy = document.querySelector("[data-hero-copy]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (hero && heroParallax && !reduceMotion) {
    let raf = 0;
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
      raf = requestAnimationFrame(renderHeroMotion);
    };

    raf = requestAnimationFrame(renderHeroMotion);

    hero.addEventListener("pointerenter", () => {
      hero.classList.add("is-lit");
    });

    hero.addEventListener("pointerleave", () => {
      hero.classList.remove("is-lit");
      targetX = 0;
      targetY = 0;
      if (heroLight) heroLight.style.opacity = "0";
    });

    hero.addEventListener(
      "pointermove",
      (e) => {
        const rect = hero.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        targetX = Math.max(-1, Math.min(1, nx));
        targetY = Math.max(-1, Math.min(1, ny));

        if (heroLight) {
          heroLight.style.left = `${e.clientX - rect.left}px`;
          heroLight.style.top = `${e.clientY - rect.top}px`;
        }
      },
      { passive: true }
    );

    window.addEventListener("pagehide", () => cancelAnimationFrame(raf));
  }

  const t = (key) => (i18n[lang] && i18n[lang][key]) || key;

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

    observePieces();
  };

  const setLang = (next) => {
    if (!i18n[next]) return;
    lang = next;
    localStorage.setItem("ao-lang", lang);
    applyStaticI18n();
    renderGallery();
  };

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.getAttribute("data-lang");
      if (next) setLang(next);
    });
  });

  applyStaticI18n();
  renderGallery();

  const form = document.querySelector(".inquire-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = t("contact.send");
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
