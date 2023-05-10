// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/material_green.css");


const input = document.querySelector('#datetime-picker')
const submit = document.querySelector('[data-start]')

const day = document.querySelector('[data-days]')
const hour = document.querySelector('[data-hours]')
const min = document.querySelector('[data-minutes]')
const sec = document.querySelector('[data-seconds]')
const timer = document.querySelector('.timer')
const field = document.querySelectorAll('.field')
const value = document.querySelectorAll('.value')

timer.style.display = 'flex'

value.forEach(element => {
    element.style.fontSize = '30px'
    element.style.fontWeight = '500'
})

field.forEach(element => {
    element.style.display = 'flex'
    element.style.flexDirection = 'column'
    element.style.alignItems = 'center'
    element.style.margin = '24px' 
});

submit.setAttribute('disabled', 'true')
let dateFuture

submit.addEventListener('click', startClick)
function startClick(event){
   const IdInterval = setInterval(()=>{
        const recult = dateFuture - new Date()
        if(recult<=0){
            clearInterval(IdInterval)
            return
        }
        const { days, hours, minutes, seconds } = convertMs(recult)
        day.textContent = addLeadingZero(days)
        hour.textContent = addLeadingZero(hours)
        min.textContent = addLeadingZero(minutes)
        sec.textContent = addLeadingZero(seconds)

    },1000)
}

function validDate(nowDate, futureDate){
    if(nowDate>futureDate){
        window.alert("Please choose a date in the future")
        return false
    }
    submit.removeAttribute('disabled')
    return true
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates, dateStr) {
        dateFuture = selectedDates[0]
        const recultFn = validDate(options.defaultDate, dateFuture)
        if(!recultFn){
            return
        } 
    }
};

const calendars =  flatpickr(input, options)
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
    function addLeadingZero(value){
    return String(value).padStart(2, '0')
  }