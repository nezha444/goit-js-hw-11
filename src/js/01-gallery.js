import { galleryItems } from './gallery-items.js';
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryLightBox = document.querySelector('.gallery')

const addGalleryItemsLightBox = galleryItems.map(objItem =>{  
    const stringLightBox =
`    <li class="gallery__item">
        <a class="gallery__link" href=${objItem.original}>
            <img 
            onclick="event.preventDefault()"
            class="gallery__image" 
            src=${objItem.preview}
            alt=${objItem.description}/>
        </a>
    </li>`
    return stringLightBox
}).join('')
galleryLightBox.insertAdjacentHTML("beforeend", addGalleryItemsLightBox)

var gallerylightbox = new SimpleLightbox('.gallery .gallery__item a', { 
    captionsData: 'alt',
    captionDelay: 250,
    captionsPosition: 'bottom'
 });