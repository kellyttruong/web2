// console.log('spa.js is loaded');

const thumbnails = document.querySelectorAll('figure');

const modal = document.querySelector('dialog');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', showModal);

})

function showModal(event){
    let thumImg = event.targetclosest ('figure').querySelector('img').src;
    thumbImg = thumbImb.substring(thumbImg.lastIndexOf('/'));
}

modal.querySelector('figure').innerHTML = event.target.closest('figure').innerHTML;
modal.querySelector('img').src = 'img/flower/1600' + thumbImg;
modal.showModal();