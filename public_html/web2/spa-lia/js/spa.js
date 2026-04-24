// console.log('spa.js is loaded');

// modal
const thumbnails = document.querySelectorAll('figure');

const modal = document.querySelector('dialog');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', showModal);

})

function showModal(event){
let thumbImg = event.target.closest('figure').querySelector('img').src;
    thumbImg = thumbImg.substring(thumbImg.lastIndexOf('/'));

    modal.querySelector('figure').innerHTML = event.target.closest('figure').innerHTML;
    modal.querySelector('img').src = 'img/flowers/1600' + thumbImg;
    modal.showModal(); 
}

// carousel