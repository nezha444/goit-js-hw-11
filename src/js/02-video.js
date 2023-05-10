import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY = "videoplayer-current-time"

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe); // 


function onPlay(data){
        console.log(data);
        localStorage.setItem(KEY, JSON.stringify(data.seconds))
    }

 // localStorage.setItem(KEY, JSON.stringify(data.seconds))

player.on('timeupdate', throttle(onPlay, 1000))


player.setCurrentTime(localStorage.getItem(KEY)).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});






























// player.on('play', function() {
//     console.log('played the video!');
// });

// player.getVideoTitle().then(function(title) {
//     console.log('title:', title);
// });


// ////////////СЛУШАТЕЛЬ
// const onPlay = function(data) {
//     // data is an object containing properties specific to that event
// };

// player.on('play', onPlay);



// ///////////////////////////СОБЫТИЯ
// player.on('eventName', function(data) {
//     // data is an object containing properties specific to that event


//     //////////////////ОБНОВЛЕНИЕ ВРЕМЕНИ
//     {
//         duration: 61.857
//         percent: 0.049
//         seconds: 3.034
//     }
// });


