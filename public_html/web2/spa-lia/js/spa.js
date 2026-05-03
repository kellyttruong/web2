// console.log('spa.js is loaded');

// modal
const figures = document.querySelectorAll('.information figure');
const modal = document.querySelector('dialog');

figures.forEach(figure => {
figure.addEventListener('click', showModal);
 })

function showModal(event){
  const figure = event.currentTarget;

  const img = figure.querySelector('img').src;
  const title = figure.querySelector('figcaption').textContent;
  const desc = figure.dataset.desc;

  console.log('original img src:', img);
  console.log('replaced img src:', img.replace('flowers/400/', 'flowers/1600/'));

  modal.querySelector('img').src = img.replace('flowers/400/', 'flowers/1600/');
  modal.querySelector('h2').textContent = title;
  modal.querySelector('p').textContent = desc;
   
modal.showModal(); 
}
modal.addEventListener('click', function(e) {
  if (e.target ===modal) modal.close();
})


// // loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".container");
  console.log(loader);
  loader.classList.add("fade-out");

  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});

// IntersectionObserver

const thumbs = document.querySelectorAll('header, #about, #flowers, #common, footer');
// selects all

const options = {
  root: null,
  rootMargin: "0px",
  // scrollMargin: "0px",
  threshold: 0.1, 
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