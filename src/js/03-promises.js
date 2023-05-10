import { Notify } from 'notiflix/build/notiflix-notify-aio';

const submit = document.querySelector('[type="submit"]');
const delayInput = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');

//                      номер   задержка
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) => {
    setTimeout(()=>{
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay)
  })
}

function submitFn(event) {
  event.preventDefault();
  const delay = Number(delayInput.value);
  const stepV =  Number(step.value)
  for (let i = 0; i < Number(amount.value); i++) {
      createPromise(i, delay + stepV * i)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position+1} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position+1} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position+1} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position+1} in ${delay}ms`)
      })
  }
}
form.addEventListener('submit', submitFn);
