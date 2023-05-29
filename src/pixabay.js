import { API_PATH, DEFAULT_PIXABAY_PARAMS } from './config.js';
import Notiflix from 'notiflix';

export default async function pingPixabay({ q = '', page = '1' }) {
  const querystring = new URLSearchParams({
    ...DEFAULT_PIXABAY_PARAMS,
    page,
    q,
  });

  try {
    const response = await fetch(`${API_PATH}?${querystring}`);
    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      const images = data.hits.map(hit => ({
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
        likes: hit.likes,
        views: hit.views,
        comments: hit.comments,
        downloads: hit.downloads,
      }));

      return images;
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
