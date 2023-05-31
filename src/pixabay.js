import { DEFAULT_PIXABAY_PARAMS } from './config.js';
import Notiflix from 'notiflix';
import axios from 'axios';

export default async function pingPixabay({ q = '', page = '1' }) {
  let images = [];

  try {
    const response = await axios.get(DEFAULT_PIXABAY_PARAMS.baseURL, {
      params: { ...DEFAULT_PIXABAY_PARAMS.params, page, q },
      signal: AbortSignal.timeout(5000),
    });

    if (response.data.hits.length > 0) {
      images = response.data.hits.map(hit => ({
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
        likes: hit.likes,
        views: hit.views,
        comments: hit.comments,
        downloads: hit.downloads,
      }));
    }
  } catch (error) {
    const errorMn = error.toJSON();
    Notiflix.Notify.failure(`${errorMn}`);
    if (error.response) {
      Notiflix.Notify.failure(`${error.response.data}`);
      Notiflix.Notify.failure(`${error.response.status}`);
      Notiflix.Notify.failure(`${error.response.headers}`);
    } else if (error.request) {
      Notiflix.Notify.failure(`${error.request}`);
    } else {
      Notiflix.Notify.failure(`Error ${error.message}`);
    }
    Notiflix.Notify.failure(`${error.config}`);
  }

  return images;
}
