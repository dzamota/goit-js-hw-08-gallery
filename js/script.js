'use strict';
import images from './gallery-items.js';

const galleryList = document.querySelector('ul.js-gallery');
const lightBoxELem = document.querySelector('div.lightbox');
const lightBoxImage = lightBoxELem.querySelector('.lightbox__image');
const closeLightBoxBtn = document.querySelector('button[data-action="close-lightbox"]');

function createGalleryLi(array) {
  array.forEach(({ preview, original, description }) =>
    galleryList.insertAdjacentHTML(
      'beforeend',
      `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
    )
  );
}

createGalleryLi(images);

galleryList.addEventListener('click', mouseClick);
closeLightBoxBtn.addEventListener('click', closeLightBox);

function mouseClick(event) {
  if (event.target.tagName === 'IMG') {
    event.preventDefault();

    lightBoxELem.classList.add('is-open');
    lightBoxImage.setAttribute('src', `${event.target.dataset.source}`);

    document.body.addEventListener('click', closeModal);
    window.addEventListener('keyup', closeModalByKey);
    window.addEventListener('keyup', imageSlide);
    return;
  }
}

function closeLightBox() {
  lightBoxELem.classList.remove('is-open');
  lightBoxImage.removeAttribute('src');

  window.removeEventListener('keyup', closeModalByKey);
  window.removeEventListener('keyup', imageSlide);
}

function closeModal(event) {
  if (event.target.tagName !== 'IMG') {
    closeLightBox();
  }
}

function closeModalByKey(event) {
  if (event.code === 'Escape') {
    closeLightBox();
  }
}

const getCurrentImagePosition = () => {
  const currentImageSource = lightBoxImage.getAttribute('src');
  const currentImageIndex = images.indexOf(
    images.find(({ original }) => original === currentImageSource)
  );

  return currentImageIndex;
};

const nextImgSrc = () => {
  const currentImgIndx = getCurrentImagePosition();
  const endOfGalleryIndx = images.length - 1;
  if (currentImgIndx === endOfGalleryIndx) {
    return images[0].original;
  }
  return images[currentImgIndx + 1].original;
};

const prevImgSrc = () => {
  const currentImgIndx = getCurrentImagePosition();
  const endOfGalleryIndx = images.length - 1;
  if (currentImgIndx === 0) {
    return images[endOfGalleryIndx].original;
  }
  return images[currentImgIndx - 1].original;
};

function imageSlide(event) {
  if (event.code === 'ArrowRight') {
    lightBoxImage.setAttribute('src', `${nextImgSrc()}`);
  }
  if (event.code === 'ArrowLeft') {
    lightBoxImage.setAttribute('src', `${prevImgSrc()}`);
  }
}
