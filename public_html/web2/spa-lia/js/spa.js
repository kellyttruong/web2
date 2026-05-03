// console.log('spa.js is loaded');

// modal
  const thumbnails = document.querySelectorAll('.information figure');
  const modal = document.querySelector('dialog');

  figure.forEach(thumb => {
  figure.addEventListener('click', showModal);
 })

  function showModal(event){
  const figure = event.currentTarget;

  const img = figure.querySelector('img').src;
  const title = figure.querySelector('figcaption').textContent;
  const desc = figure.dataset.desc;

  modal.querySelector('img').src = img;
  modal.querySelector('h2').textContent = title;
  modal.querySelector('p').textContent = desc;
   
  modal.showModal(); 
}
modal.addEventListener('click', function(e) {
  if (e.target ===modal) modal.close
})


// // loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".container");
  loader.classList.add("fade-out");

  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});

// IntersectionObserver

const thumbs = document.querySelectorAll('header, #about, #flowers, #common, footer');
// selects all

const options = {
  root: null,
  rootMargin: "0px",
  scrollMargin: "0px",
  threshold: 0.175, 
// percentage in which it loads
};

const observer = new IntersectionObserver(removeOpacity, options);

thumbs.forEach(thumb => {
  observer.observe(thumb);
});

function removeOpacity(entries){
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // fades in
     
    } else {
      entry.target.classList.remove('visible');
    }
    // fades out

  });
};

// carousel
const carousel = document.querySelector('.information');
const slide =document.querySelector('.information figure');

function handleCarouselMove(positive = true) {
  const slideWidth = slide.clientWidth;
  carousel.scrollLeft = positive ? carousel.scrollLeft + slideWidth : carousel.scrollLeft - slideWidth;
}