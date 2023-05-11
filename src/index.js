import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
axios.defaults.baseURL = 'https://pixabay.com/api/' 


const gallery = document.querySelector('.gallery')
const searchForm = document.querySelector('#search-form')
const inputElement = document.querySelector('input')
const loadMore = document.querySelector('.load-more')

let page = 1
const per_page = 40
const getApi = async (input) => {
    
    const { data } = await axios.get('', {
        params:{
            q: `${input}`,
            key: '36273438-7ad8bc87a6816fbd3e66d9cf9',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: `${page}`,
            per_page: `${per_page}`,
        }
    })
    return data
}






function search(event){
    gallery.innerHTML = ''
    page = 1
    event.preventDefault()
    createCard(event.target.elements.searchQuery.value.trim())
}
searchForm.addEventListener('submit', search)

//получаем данные из промиса
async function getData(text){
    // масив данных из Api
    if(!text){
        loadMore.style.display = 'none'
        return
    }
    const data = await getApi(text)
    // console.log(dataApi);
    // if(data.hits.length === 0){
    // }

    
    if(data.totalHits <= per_page * page){
        Notify.warning("Sorry, there are no images matching your search query. Please try again.")
        loadMore.style.display = 'none'
    } else {
        loadMore.style.display = 'block'
    }

    if(data.length !== 0){
        return data
    }
}   

async function createCard (text){
    const arr = await getData(text)
    if (arr) {
        const newArr = arr.hits.map(element => card(element))
        gallery.insertAdjacentHTML('beforeend', newArr.join(''))
    }
}

function card (data){
   return `
    <div class="photo-card">
        <img class="img" src="${data.webformatURL}" alt="${data.tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes</b>
            ${data.likes}
            </p>
            <p class="info-item">
            <b>Views</b>
            ${data.views}
            </p>
            <p class="info-item">
            <b>Comments</b>
            ${data.comments}
            </p>
            <p class="info-item">
            <b>Downloads</b>
            ${data.downloads}
            </p>
        </div>
    </div>
   `
}

// Пагинация

loadMore.addEventListener('click', morePage)


async function morePage(event){
    page += 1
    // console.log(page);
    createCard(inputElement.value)
    const dataApi = await getApi(inputElement.value)
    console.log(dataApi);
}
