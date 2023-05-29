('use strict');

import { searchForPhotos, loadMorePhotos, drawPhotos } from './handlers.js';

document.addEventListener('DOMContentLoaded', () => {
  drawPhotos();
});

const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', searchForPhotos);
window.addEventListener('scroll', loadMorePhotos);
