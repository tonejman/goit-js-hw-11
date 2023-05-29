import pingPixabay from './pixabay.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const getPhotoCardElement = photo => {
  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');

  const imgLink = document.createElement('a');
  imgLink.href = photo.largeImageURL;

  const img = document.createElement('img');
  img.src = photo.webformatURL;
  img.alt = photo.tags;
  img.loading = 'lazy';
  
  const info = document.createElement('div');
  info.classList.add('info');

  const likes = createInfoItem('Likes', photo.likes);
  const views = createInfoItem('Views', photo.views);
  const comments = createInfoItem('Comments', photo.comments);
  const downloads = createInfoItem('Downloads', photo.downloads);

  info.append(likes, views, comments, downloads);
  imgLink.appendChild(img);
  photoCard.append(imgLink, info);

  return photoCard;
};

function createInfoItem(label, value) {
  const infoItem = document.createElement('p');

  infoItem.classList.add('info-item');
  infoItem.innerHTML = `<b>${label}</b>${value}`;

  return infoItem;
}

export async function loadPhotos({ q, page }) {
  try {
    const photos = await pingPixabay({ q, page });

    if (photos.length > 0) {
      const gallery = document.querySelector('#photos');
      const photoCards = photos.map(getPhotoCardElement);
      gallery.append(...photoCards);

      initializeLightbox('.photo-card a');
    } else {
      Notiflix.Notify.failure('No more photos found!');
    }
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Failed to load photos. Please try again.');
  }
}

let lightbox = null;

function initializeLightbox(selector) {
  if (lightbox) {
    lightbox.destroy();
  }

  lightbox = new SimpleLightbox(selector);
  lightbox.on('show.simplelightbox', () => {
    document.body.classList.add('show-lightbox');
  });
  lightbox.on('close.simplelightbox', () => {
    document.body.classList.remove('show-lightbox');
  });
}
