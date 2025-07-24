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

// Modal logic
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const card = document.getElementById("project1-card");

card.onclick = () => {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  const scrollY = window.scrollY || window.pageYOffset;
  modal.scrollIntoView({ behavior: "smooth", block: "center" });
};

closeModal.onclick = () => {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
};

// Lightbox logic
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
  lightboxImg.src = src;
  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function hideLightbox() {
  lightbox.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function showPrevImg() {
  currentImgIndex = (currentImgIndex - 1 + screenshots.length) % screenshots.length;
  lightboxImg.src = screenshots[currentImgIndex].src;
}

function showNextImg() {
  currentImgIndex = (currentImgIndex + 1) % screenshots.length;
  lightboxImg.src = screenshots[currentImgIndex].src;
}

closeLightbox.addEventListener("click", hideLightbox);
prevImg.addEventListener("click", showPrevImg);
nextImg.addEventListener("click", showNextImg);
