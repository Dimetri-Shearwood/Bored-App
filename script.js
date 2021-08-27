var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);

var dance = document.getElementById("clickerBtn");

if (contextClass) {
    var context = new contextClass();
} else {
    onError;
}

var request = new XMLHttpRequest();

// let audio = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/gonna-make-you-sweat.mp3";

let audio = new Audio("./click.mp3");
document.onclick = function () {
    audio.play();
};

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



// Need a function that creates a div, h1, and ul
// Also will need to create li's for each sub0thing (participants, price, type)
// We will need to create the li's dynamically
// ?how should we do this?



const getBored = async () => {
    // The async keyword allows you to utilize the await keyword which replaces the .then() syntax
    // Now you can write code more concisely
    let res = await fetch(URL)
    boredItems = await res.json()

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


let body = document.querySelector('body')

// here we are getting the h1 tag from our HTML
// We needed a class name that matched these properties of the key value pairs
let arrayOfActivityClasses = ['participants', 'type', 'price']
let title = document.createElement('h1');

let createActivityCard = () => {
    let card = document.createElement('div');
    let activityList = document.createElement('ul');

    card.className = "activity-card"
    title.className = "activity-title"
    activityList.className = "activity-list"

    card.appendChild(title)
    card.appendChild(activityList)
    body.appendChild(card)
// using the map method, we iterate over the array, and for each item in the array we create an Li, then add a class, then make it hidden until the button is pushed. Then append CreatedLi to the Ul activityList.
    arrayOfActivityClasses.map(activityClass => {
        let createdLi = document.createElement('li')

        createdLi.className = activityClass
        createdLi.hidden = true

        activityList.appendChild(createdLi)
    })

}

createActivityCard()

function playSound(e) {
    // console.log(e);
    e.preventDefault();
    dance.classList.add("pressed");

    // Turn This code on to run sound when button is clicked

    // var source = context.createBufferSource();
    // source.buffer = buffer;
    // source.connect(context.destination);
    // source.start(0);


    let randomNumber = Math.floor(Math.random() * boredItems.length)

    //deconstruction curly brackets allows us to deconstruct an object
    let { participants, type, price } = boredItems[randomNumber]
    let arrayOfActivityItems = [participants, type, price]

    // for (let i = 0; i < arrayOfActivityItems.length; i++) {
    //     const item = arrayOfActivityItems[i];

    //     let createdLi = document.createElement('li')

    //     createdLi.innerHTML =item

    // }

    arrayOfActivityItems.forEach((item, index) => {

        let className = arrayOfActivityClasses[index]
        console.log(item)
        let grabListItem = document.querySelector(`.${className}`)

        console.log(grabListItem)

        grabListItem.innerHTML = `<span class="something">${className}:</span> ${item}`
        grabListItem.hidden = false

        // activityList.appendChild(createdLi)
    })



    title.innerHTML = boredItems[randomNumber].activity



    // Or you could use DOM manipulation to render all of the jokes that are stored in the boredItems array

    var delay = 600;
    setTimeout(unpress, delay);
}
dance.addEventListener('click', playSound );