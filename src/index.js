import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/' 

const gallery = document.querySelector('.gallery')
const searchForm = document.querySelector('#search-form')
const inputElement = document.querySelector('input')
const loadMore = document.querySelector('.load-more')

let page = 1
const getApi = async (input) => {
    
    const { data } = await axios.get('', {
        params:{
            q: `${input}`,
            key: '36273438-7ad8bc87a6816fbd3e66d9cf9',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: `${page}`,
            per_page: '40',
        }
    })
    return data
}






function search(event){
    gallery.innerHTML = ''
    page = 1
    event.preventDefault()
    createCard(event.target.elements.searchQuery.value.trim())
    loadMore.style.display = 'block'
}
searchForm.addEventListener('submit', search)

//получаем данные из промиса
async function getData(text){
    // масив данных из Api
    const dataApi = await getApi(text)
    console.log(dataApi);
    if(dataApi.hits.length === 0){
        console.log("Sorry, there are no images matching your search query. Please try again.")
    }
    return dataApi.hits
}   

async function createCard (text){

    const arr = await getData(text)
    const newArr = arr.map(element=>card(element))

    gallery.insertAdjacentHTML('beforeend', newArr.join(''))
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


function morePage(event){
    page += 1
    console.log(page);
    createCard(inputElement.value)

    if(){
        
    }
}

