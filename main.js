document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  // ===== SCROLL SMOOTH =====
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== SKILLS TABS =====
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });

  // ===== MODAL LOGIC FOR PROJECTS =====
  const modals = {
    habitflow: document.getElementById("modal-habitflow"),
    budgetly: document.getElementById("modal-budgetly"),
    talkmate: document.getElementById("modal-talkmate"),
  };

  const projectCards = {
    habitflow: document.getElementById("project1-card"),
    budgetly: document.getElementById("project2-card"),
    talkmate: document.getElementById("project3-card"),
  };

  Object.keys(projectCards).forEach(id => {
    const card = projectCards[id];
    const modal = modals[id];

    if (card && modal) {
      card.addEventListener("click", () => {
        modal.classList.add("active");
        document.body.classList.add("modal-open");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      const closeBtn = modal.querySelector(".close-modal");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          modal.classList.remove("active");
          document.body.classList.remove("modal-open");
        });
      }

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
          document.body.classList.remove("modal-open");
        }
      });
    }
  });

  // ===== LIGHTBOX LOGIC =====
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeLightbox = document.getElementById("closeLightbox");
  const prevImg = document.getElementById("prevImg");
  const nextImg = document.getElementById("nextImg");

  const screenshots = document.querySelectorAll(".modal-gallery img");
  let currentImgIndex = 0;

  screenshots.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentImgIndex = index;
      showLightbox(img.src);
    });
  });

  function showLightbox(src) {
    if (lightboxImg) lightboxImg.src = src;
    if (lightbox) lightbox.classList.remove("hidden");
    document.body.classList.add("modal-open");
  }

  function hideLightbox() {
    if (lightbox) lightbox.classList.add("hidden");
    document.body.classList.remove("modal-open");
  }

  function showPrevImg() {
    currentImgIndex = (currentImgIndex - 1 + screenshots.length) % screenshots.length;
    if (lightboxImg) lightboxImg.src = screenshots[currentImgIndex].src;
  }

  function showNextImg() {
    currentImgIndex = (currentImgIndex + 1) % screenshots.length;
    if (lightboxImg) lightboxImg.src = screenshots[currentImgIndex].src;
  }

  if (closeLightbox) closeLightbox.addEventListener("click", hideLightbox);
  if (prevImg) prevImg.addEventListener("click", showPrevImg);
  if (nextImg) nextImg.addEventListener("click", showNextImg);

  // ===== GLOBAL ESC KEY HANDLER =====
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      Object.values(modals).forEach(modal => modal.classList.remove("active"));
      document.body.classList.remove("modal-open");
      hideLightbox();
    }
  });
});
