document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------
     YEAR
  ----------------------------- */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* -----------------------------
     MOBILE MENU
  ----------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {
      navigation.classList.toggle("open");
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
      });
    });
  }


  /* -----------------------------
     SCROLL REVEAL
  ----------------------------- */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }

      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* -----------------------------
     GALLERY MODAL
  ----------------------------- */

  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const modalClose = document.querySelector(".modal-close");

  if (galleryItems.length && modal && modalImage) {

    galleryItems.forEach(item => {

      item.addEventListener("click", () => {

        const image = item.getAttribute("data-image");

        if (!image) return;

        modalImage.src = image;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
      });

    });

    const closeModal = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");

      modalImage.src = "";

      document.body.style.overflow = "";
    };

    if (modalClose) {
      modalClose.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        closeModal();
      }

    });

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeModal();
      }

    });
  }


  /* -----------------------------
     SMOOTH SCROLL
  ----------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

});
