var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);

var dance = document.getElementById("clickerBtn");

if (contextClass) {
    var context = new contextClass();
} else {
    onError;
}

var request = new XMLHttpRequest();

// function audio() {
//     let soundFX = "https://www.youtube.com/watch?v=h6_8SlZZwvQ";
//     let audioFX = document.createElement("audio");
//     let div = document.createElement("div");
//     audioFX.innerHTML = soundFX;
//     div.appendChild(audioFX);
// }
// audio();

let audio = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/gonna-make-you-sweat.mp3";

request.open('GET', audio, true);
request.responseType = 'arraybuffer';
request.onload = function () {
    context.decodeAudioData(request.response, function (theBuffer) {
        buffer = theBuffer;
    }, onError);
}
let URL = 'https://boredapp2021.herokuapp.com/'

// We created an empty variable which will store all the data from our api call
let boredItems

// here we are getting the h1 tag from our HTML
let boredElement = document.querySelector('.bored-element')

const getBored = async () => {
    // The async keyword allows you to utilize the await keyword which replaces the .then() syntax
    // Now you can write code more concisely
    let res = await fetch(URL)
    let json = await res.json()

    console.log(json)

    // We are setting the value of the boredItems variable to the JSON data we got back from our api call
    boredItems = json

    console.log(boredItems)
    // Fetch return a URL encode data stream
    // fetch(URL)
    // then is a promise which make you code wait for the Fetch to do it work and RETURN a URL encoded response
    // res stores the URL encoded data
    // res.json() take the URL encoded body and converted its readableStream to JSON data
    // because this is an arrow function it explicity returns the converted json
    // .then(res => res.json())
    // then we store the converted json into the res variable in this promise and console.log it
    // .then(convertRes => console.log(convertRes))
}

getBored()

request.send();

function onError() { console.log("Bad browser! No Web Audio API for you"); }

function unpress() { dance.classList.remove("pressed"); }

function playSound() {
    dance.classList.add("pressed");
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);

    // You need to figure out a way to randomly get an index
    // ie: replace boredItems[0]: boredItems[random Number here]
    for(let i=0; i<=boredItems.length; i++) {
    boredElement.innerHTML = boredItems[[Math.floor(Math.random()*boredItems.length)]].activity;
    // boredElement.innerHTML = boredItems[[Math.floor(Math.random()*boredItems.length)]].type;
    // boredElement.innerHTML = boredItems[[Math.floor(Math.random()*boredItems.length)]].participants;
    // boredElement.innerHTML = boredItems[[Math.floor(Math.random()*boredItems.length)]].price;
    }
    // Or you could use DOM manipulation to render all of the jokes that are stored in the boredItems array

    var delay = 600;
    setTimeout(unpress, delay);
}
dance.addEventListener('click', function (event) { playSound() });