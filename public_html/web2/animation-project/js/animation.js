const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2  
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const thumbnails = document.querySelectorAll(
  '.outfit-slide, #hamburger, #store'
);

thumbnails.forEach(thumb => {
  observer.observe(thumb);
});

window.addEventListener("load", () => {
  const loader = document.querySelector(".container");
  loader.classList.add("fade-out");

  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});
