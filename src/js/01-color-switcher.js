const body = document.querySelector('body')
const start = document.querySelector('[data-start]')
const stop = document.querySelector('[data-stop]')

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}



start.addEventListener('click', editColor)
function editColor(){
    start.setAttribute('disabled', 'true')
   const interval = setInterval(() => {
        const rColor = getRandomHexColor()
        body.style.backgroundColor = `${rColor}`
    }, 1000);
    stop.addEventListener('click', ()=>{
        clearInterval(interval)
        start.removeAttribute('disabled')
    })
}