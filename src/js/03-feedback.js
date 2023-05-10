import throttle from 'lodash.throttle';

const KEY = "feedback-form-state"

const form = document.querySelector('.feedback-form')
const email = document.querySelector('[name="email"]')
const message = document.querySelector('[name="message"]')
const submitBtn = document.querySelector('[type="submit"]')


form.addEventListener(
    "input",
    throttle(() => {
        const inputValueEmail = String(email.value)
        const inputValueMessage = String(message.value)
        
        localStorage.setItem(KEY, JSON.stringify(
            {
                email: inputValueEmail, 
                message: inputValueMessage
            }))
    }, 500)
  );

// НЕ ЗНАЮ КАК СДЕЛАТЬ ЧЕРЕЗ ЛОДАШ 
// form.addEventListener('input', (event)=>{
//     const inputValueEmail = String(email.value)
//     const inputValueMessage = String(message.value)
    
//     localStorage.setItem(KEY, JSON.stringify(
//         {
//             email: inputValueEmail, 
//             message: inputValueMessage
//         }))
// })

function getValueInput(){
    // const localValueParse = JSON.parse(localStorage.getItem(KEY))

    const getItemLocalStorage = localStorage.getItem(KEY)
    if(getItemLocalStorage){
        const localValueParse = JSON.parse(getItemLocalStorage)
        email.value = localValueParse.email
        message.value = localValueParse.message
    }
}
getValueInput()

// ПРИ САБМИТЕ ОБНОВЛЯЕТСЯ СТРАНИЦА

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    localStorage.removeItem(KEY)
    const formObj = {'email': `${email.value}`, 'message': `${message.value}`}
    console.log(formObj);
    // console.log(email.value);
    // console.log(message.value);
    email.value = ''
    message.value = ''
})

