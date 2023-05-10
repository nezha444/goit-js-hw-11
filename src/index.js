import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box')
const ul = document.querySelector('.country-list')


input.addEventListener('input',
debounce( 
    
    (event)=>{
    if(event.target.value.trim() === ''){
        ul.innerHTML = ''
        return
    }
    fetchCountries(event.target.value.trim())
    .then(data=>{
        if (Array.isArray(data)) {
            if(data.length>10){
                Notify.info('Too many matches found. Please enter a more specific name.')
            }
    
            if(data.length<=10 && data.length>1){
                ul.innerHTML = ''
                data.forEach(el=>{ul.insertAdjacentHTML('beforeend',createCountrisListItem(el))})
            }
            
            if(data.length === 1){
                ul.innerHTML = createCountri(data[0])
            }
        } else {
            throw new Error('Invalid data format');
        }
    })
    .catch((error)=>{
        Notify.failure(`❌"Oops, there is no country with that name"`);
        console.error(error);
    });
    

},DEBOUNCE_DELAY))

const createCountrisListItem = item => {
   return `<li class='country-list-items'>
        <img class='country-list-svg' src="${item.flags.svg}">
        <h3 class='country-list-title'>${item.name.common}</h3>
    </li>
    `
}
const countryListItems = document.querySelector('.country-list-items')
const countryListSvg = document.querySelector('.country-list-svg')
const countryListTitle = document.querySelector('.country-list-title')
 
const createCountri = data =>{
   return `<li class='country-one'>
            <div class='country-one-cont'>
                    <img class='country-one-img' src="${data.flags.svg}">
                    <h3 class='country-one-title'>${data.name.common}</h3>
            </div>

            <ul class='country-one-list'>
                <li class='country-one-list-item'>
                    <span class='country-one-list-item-span'>Capital:</span><p>${data.capital}</p>
                </li>
                <li class='country-one-list-item'>
                    <span class='country-one-list-item-span'>Population:</span><p>${data.population}</p>
                </li>
                <li class='country-one-list-item'>
                    <span class='country-one-list-item-span'>Languages:</span><p>${Object.values(data.languages).join(',')}</p>
                </li>
            </ul>
    </li>` 
}


// const renderList = (el) => {
//   const countri = el.map(createCountriListItem).join("");
//   ul.innerHTML = countri;
// };





const fetchCountries = (name) => {
    const filter = 'name,capital,population,flags,languages'
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=${filter}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data)) {
            return data;
        } else {
            throw new Error('Invalid data format');
        }
    })
}


