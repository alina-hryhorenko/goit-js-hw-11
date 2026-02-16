import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderWrapperEl = document.querySelector('.js-loader');


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        const safeTags = String(tags).replace(/"/g, '&quot;');


        return `
          <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
              <img
                class="gallery-image"
                src="${webformatURL}"
                alt="${safeTags}"
                loading="lazy"
              />
            </a>
            <div class="info">
              <p class="info-item">
                <span class="info-label">Likes</span>
                <span class="info-value">${likes}</span>
              </p>
              <p class="info-item">
                <span class="info-label">Views</span>
                <span class="info-value">${views}</span>
              </p>
              <p class="info-item">
                <span class="info-label">Comments</span>
                <span class="info-value">${comments}</span>
              </p>
              <p class="info-item">
                <span class="info-label">Downloads</span>
                <span class="info-value">${downloads}</span>
              </p>
            </div>
          </li>`;
      }
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  if (!loaderWrapperEl) return;
  loaderWrapperEl.classList.remove('is-hidden');
  loaderWrapperEl.setAttribute('aria-hidden', 'false');
}

export function hideLoader() {
  if (!loaderWrapperEl) return;
  loaderWrapperEl.classList.add('is-hidden');
  loaderWrapperEl.setAttribute('aria-hidden', 'true');
}
