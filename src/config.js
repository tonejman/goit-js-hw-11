export const API_PATH = 'https://pixabay.com/api/';
export const API_KEY = '36791869-dea73c155c5167a62349db1b3';

export const DEFAULT_PIXABAY_PARAMS = {
  method: 'get',
  baseURL: API_PATH,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: '',
    q: '',
  },
};
