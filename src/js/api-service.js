import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.currentPage = 1;
  }

  fetchArticles() {
    const BASE_URL = 'https://pixabay.com/api';
    const key = '23040897-f684e552d269990a649c2a9ea';
    const perPage = 12;
    return axios
      .get(
        `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.currentPage}&per_page=${perPage}&key=${key}`,
      )
      .then(image => image)
      .then(data => {
        this.incrementPage();
        return data.data.hits;
      })
      .catch(error => console.log(error));
  }

  incrementPage() {
    this.currentPage += 1;
  }

  resetPage() {
    this.currentPage = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
