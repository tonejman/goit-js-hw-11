import { loadPhotos } from './ui.js';

let currentPage = '1';

export async function drawPhotos() {
  const searchForm = document.querySelector('#search-form');
  searchForm.addEventListener('submit', searchForPhotos);

  await loadPhotos({ q: '', page });
}

export async function searchForPhotos(event) {
  event.preventDefault();

  const searchQuery = document
    .querySelector('input[name="searchQuery"]')
    .value.trim();

  const gallery = document.querySelector('#photos');
  gallery.innerHTML = '';
  currentPage = 1;

  await loadPhotos({ q: searchQuery, page: currentPage });
}

export async function loadMorePhotos() {
  const searchQuery = document
    .querySelector('input[name="searchQuery"]')
    .value.trim();
  const scrollPosition = window.innerHeight + window.pageYOffset;
  const pageHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= pageHeight) {
    currentPage++;
    await loadPhotos({ q: searchQuery, page: currentPage });
  }
}
