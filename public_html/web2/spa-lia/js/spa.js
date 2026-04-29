// console.log('spa.js is loaded');

// modal
const thumbnails = document.querySelectorAll('figure');

const modal = document.querySelector('dialog');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', showModal);

})

function showModal(event){
let thumbImg = event.target.closest('.information figure').querySelector('img').src;
    thumbImg = thumbImg.substring(thumbImg.lastIndexOf('/'));

    modal.querySelector('figure').innerHTML = event.target.closest('figure').innerHTML;
    modal.querySelector('img').src = 'img/flowers/1600' + thumbImg;
    modal.showModal(); 
}
// loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".container");
  loader.classList.add("fade-out");

  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});

// // reveal on scroll
// document.addEventListener("DOMContentLoaded", () => {
//   const revealElements = document.querySelectorAll('.reveal');

//   const toggleVisibility = () => {
//       revealElements.forEach((el) => {
//           const rect = el.getBoundingClientRect();

//           // check if the element is in the viewport
//           if (rect.top < window.innerHeight && rect.bottom > 0) {
//               el.classList.add('active'); 
//           } else {
//               el.classList.remove('active'); 
//           }
//       });
//   };

//   // trigger on scroll and load
//   window.addEventListener('scroll', toggleVisibility);
//   toggleVisibility();
// });

// carousel
const carousel = document.querySelector('.information');
const slide =document.querySelector('.information figure');

function handleCarouselMove(positive = true) {
  const slideWidth = slide.clientWidth;
  carousel.scrollLeft = positive ? carousel.scrollLeft + slideWidth : carousel.scrollLeft - slideWidth;
}