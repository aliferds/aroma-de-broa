function caroussel() {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const slides_identification = document.querySelectorAll('.slide_identification');

  let currentSlide = 0;

  function showSlide(index) {
      slides.forEach(slide => slide.classList.remove("active"));
      slides_identification.forEach(si => si.classList.remove("active"));
      slides[index].classList.add("active");
      slides_identification[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  showSlide(currentSlide);
  setInterval(nextSlide, 5000);
}

caroussel();