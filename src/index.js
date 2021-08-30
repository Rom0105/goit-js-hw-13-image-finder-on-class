import './sass/main.scss';
import NewsApiService from './js/api-service';
import handlebars from './templates/card-image.hbs';
import { alert, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import {
  searchForms,
  articlesContainer,
  loadMore,
  input,
  btn,
  element,
  isHiddenBtn,
} from './js/refs.js';
const newsApiService = new NewsApiService();

searchForms.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onloadMore);
input.addEventListener('input', delateMarkup);
articlesContainer.addEventListener('click', openModal);

function onSearch(event) {
  event.preventDefault();

  newsApiService.query = event.currentTarget.elements.query.value.trim();
  handleButtonClick();
  newsApiService.resetPage();
  articlesContainer.innerHTML = '';
  newsApiService.fetchArticles().then(appendHitsMarkup);
  if (input.value !== '') {
    btn.setAttribute('disabled', 'disabled');
  }
  isHidden();
}

function onloadMore() {
  newsApiService.fetchArticles().then(appendHitsMarkup);
  handleButtonClick();
}

function isHidden() {
  isHiddenBtn.classList.remove('ishidden');
}

function appendHitsMarkup(hits) {
  articlesContainer.insertAdjacentHTML('beforeend', handlebars(hits));
  if (hits.length === 0) {
    isHiddenBtn.classList.add('ishidden');
    error({
      text: 'No image!',
      delay: 2000,
    });
  }
}

function delateMarkup() {
  if (input.value === '') {
    btn.setAttribute('disabled', 'disabled');
    articlesContainer.innerHTML = '';
    alertImage();
    isHiddenBtn.classList.add('ishidden');
  }
  if (input.value !== '') {
    btn.removeAttribute('disabled');
    loadMore.removeAttribute('disabled');
  }
}

function alertImage() {
  alert({
    text: 'Type the request!',
    delay: 2000,
  });
}

function handleButtonClick() {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function openModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const img = `<img src= ${event.target.dataset.url}>`;
  const instance = basicLightbox.create(img);

  instance.show();
  window.addEventListener('keydown', closeModal);

  function closeModal(event) {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeModal);
    }
  }
}
