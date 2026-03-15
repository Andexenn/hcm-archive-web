document.addEventListener("DOMContentLoaded", () => {
  const sharedFooter = document.getElementById("shared-footer");

  if (sharedFooter) {
    const footerSrc = sharedFooter.dataset.footerSrc || "footer.html";

    fetch(footerSrc)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load footer");
        }

        return response.text();
      })
      .then((html) => {
        sharedFooter.innerHTML = html;
      })
      .catch(() => {
        sharedFooter.innerHTML = "";
      });
  }

  const headers = document.querySelectorAll(".site-header");

  headers.forEach((header) => {
    const menuToggle = header.querySelector(".menu-toggle");
    const siteNav = header.querySelector(".site-nav");

    if (!menuToggle || !siteNav) {
      return;
    }

    const closeMenu = () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.getComputedStyle(menuToggle).display === "none") {
        closeMenu();
      }
    });
  });
});
