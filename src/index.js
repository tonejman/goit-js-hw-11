('use strict');

import {
  searchForPhotos,
  loadMorePhotos,
  initializeApplication,
} from './handlers.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeApplication();
});

const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', searchForPhotos);
window.addEventListener('scroll', loadMorePhotos);
