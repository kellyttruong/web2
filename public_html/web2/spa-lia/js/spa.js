// console.log('spa.js is loaded');

// modal
// const thumbnails = document.querySelectorAll('figure');

// const modal = document.querySelector('dialog');

// thumbnails.forEach(thumb => {
//     thumb.addEventListener('click', showModal);

// })

// function showModal(event){
// let thumbImg = event.target.closest('.information figure').querySelector('img').src;
//     thumbImg = thumbImg.substring(thumbImg.lastIndexOf('/'));

//     modal.querySelector('figure').innerHTML = event.target.closest('figure').innerHTML;
//     modal.querySelector('img').src = 'img/flowers/1600' + thumbImg;
//     modal.showModal(); 
// }


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