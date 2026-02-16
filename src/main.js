import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

import 'loaders.css/loaders.min.css';

import errorIcon from './img/error-icon.svg';

const formEl = document.querySelector('.form');

const toastErrorOptions = {
  position: 'topRight',
  backgroundColor: '#EF4040',
  messageColor: '#FAFAFB',
  iconColor: '#FAFAFB',
  close: true,
  closeOnEscape: true,
  closeOnClick: true,
  iconUrl: errorIcon,
  timeout: 5000,
  progressBar: true,
  progressBarColor: '#b51b1b',
};

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();

    const form = evt.currentTarget;
    const query = form.elements['search-text'].value.trim();

    // ✅ очищаємо поле завжди (але ПІСЛЯ того, як прочитали значення)
    form.reset();

    // ✅ ТЗ: не відправляємо запит якщо порожньо/пробіли
    if (!query) return;

    clearGallery();
    showLoader();

    getImagesByQuery(query)
        .then(data => {
            const images = data.hits;

            if (!images || images.length === 0) {
                hideLoader();
                iziToast.error({
                    ...toastErrorOptions,
                    message:
                        'Sorry, there are no images matching your search query. Please try again!',
                });
                return;
            }

            createGallery(images);
            hideLoader();
        })
        .catch(() => {
            hideLoader();
            iziToast.error({
                ...toastErrorOptions,
                message: 'Something went wrong. Please try again later.',
            });
        });
}