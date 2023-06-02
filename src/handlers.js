import { loadPhotos } from './ui.js';

let currentPage = '1';
let startPage = '';

export async function initializeApplication() {
  const searchForm = document.querySelector('#search-form');
  searchForm.addEventListener('submit', searchForPhotos);
  if (startPage.length === 0) {
    return;
  }
  await loadPhotos({ q: '', page: '1' });
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
