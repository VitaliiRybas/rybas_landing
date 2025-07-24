document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  // Scroll smooth
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Skills tab logic
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

  // ===== MODAL LOGIC (Project 1) ===== //
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("closeModal");
  const card = document.getElementById("project1-card");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  function closeModal() {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");

    if (lightbox) lightbox.classList.add("hidden");
    if (lightboxImg) lightboxImg.src = "";
  }

  card.onclick = () => {
    modal.classList.add("active");
    document.body.classList.add("modal-open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  closeModalBtn.onclick = closeModal;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ===== MODAL LOGIC (Projects 2 & 3) ===== //
  const modals = {
    project2: document.getElementById("modal2"),
    project3: document.getElementById("modal3"),
  };

  const projectCards = {
    project2: document.getElementById("project2-card"),
    project3: document.getElementById("project3-card"),
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

      // Закриття по кнопці ❌
      const closeBtn = modal.querySelector(".close-modal");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          modal.classList.remove("active");
          document.body.classList.remove("modal-open");
        });
      }

      // Клік поза вікном — закрити
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
          document.body.classList.remove("modal-open");
        }
      });
    }
  });

  // ===== LIGHTBOX LOGIC ===== //
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
    if (lightboxImg) {
      lightboxImg.src = src;
    }
    if (lightbox) {
      lightbox.classList.remove("hidden");
    }
    document.body.classList.add("modal-open");
  }

  function hideLightbox() {
    if (lightbox) {
      lightbox.classList.add("hidden");
    }
    document.body.classList.remove("modal-open");
  }

  function showPrevImg() {
    currentImgIndex = (currentImgIndex - 1 + screenshots.length) % screenshots.length;
    if (lightboxImg) {
      lightboxImg.src = screenshots[currentImgIndex].src;
    }
  }

  function showNextImg() {
    currentImgIndex = (currentImgIndex + 1) % screenshots.length;
    if (lightboxImg) {
      lightboxImg.src = screenshots[currentImgIndex].src;
    }
  }

  if (closeLightbox) closeLightbox.addEventListener("click", hideLightbox);
  if (prevImg) prevImg.addEventListener("click", showPrevImg);
  if (nextImg) nextImg.addEventListener("click", showNextImg);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      hideLightbox();
      Object.values(modals).forEach(m => m.classList.remove("active"));
    }
  });
});
