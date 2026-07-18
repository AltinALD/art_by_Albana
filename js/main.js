(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const nav = document.querySelector(".site-nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

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
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    pieces.forEach((el) => io.observe(el));
  } else {
    pieces.forEach((el) => el.classList.add("is-visible"));
  }

  const form = document.querySelector(".inquire-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = "Inquiry received";
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.textContent = original;
        btn.disabled = false;
      }, 2200);
    });
  }
})();
