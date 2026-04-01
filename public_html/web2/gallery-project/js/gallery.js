// console.log('gallery.js is loaded');

const thumbnails = document.querySelectorAll('figure'); 
// (selecting all figures)
// console.info(thumbnails);

const modal = document.querySelector('dialog'); 
// (selecting dialog on page)
// console.log(modal)

thumbnails.forEach(thumb => { 
    // (looping array)
    // console.warn(thumb);
    thumb.addEventListener('click', showModal); 
    // (add cllick listener)
})

function showModal(event){
    // console.log(event.target.closest('figure'));
    // console.info(event.target.closest('figure').querySelector('img').src);
    let thumbImg = event.target.closest('figure').querySelector('img').src;
    thumbImg = thumbImg.substring(thumbImg.lastIndexOf('/'));
    // console.info(thumbImg); 

    modal.querySelector('figure').innerHTML = event.target.closest('figure').innerHTML;
    modal.querySelector('img').src = 'img/1600' + thumbImg;   
    modal.showModal(); 
    // (display the modal)
}