const url = "wss://echo-ws-service.herokuapp.com/";

const btnSend = document.querySelector('.btn');
const inputBox = document.querySelector(".input-box");
const chatBox = document.querySelector(".chat-box");
const btnGeo = document.querySelector(".geo-btn");

let message;

getConnect(url);

function writeToScreen(message, sender) {
    console.log('start writeToScreen');
    let msg = document.createElement("p");
    msg.style.wordBreak = 'break-word';
    if(sender === 'client') {
        msg.style.marginRight = '5px';
        msg.style.marginLeft = 'auto';
        msg.style.border = 'solid #7BA4E0';
        msg.style.textAlign = 'end';
    } else {
        msg.style.marginLeft = '5px';
        msg.style.marginRight = 'auto';
        msg.style.border = 'solid #D3E0A8';
        msg.style.textAlign = 'start';
    };
    msg.innerHTML = message;
    chatBox.appendChild(msg);
    console.log('end writeToScreen');
};

function getConnect(url) {
    websocket = new WebSocket(url);

    websocket.onopen = function(evt) {
        console.log('connettion is open');
        console.log(websocket.readyState, typeof websocket.readyState)
    };

    websocket.onmessage = function(evt) {
        writeToScreen(
        `<span>${evt.data}</span>`,
        'server');
    };

    websocket.onerror = function(evt) {
        writeToScreen(
        `<span style="color: red;">ERROR: ${evt.data}</span>`
        );
    };
};

function successGeo(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    let mapLink = `
    <a href='https://www.openstreetmap.org/#map=18/${latitude}/${longitude}' target='_blank'>Гео-локация</a>
    `;
    writeToScreen(mapLink, 'client');
};

function errorGeo(error) {
    writeToScreen('Нет доступа к гео-позиции', 'client');
}

btnSend.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Отправка!');
    message = document.querySelector('.input-box').value;
    writeToScreen(message, 'client');
    console.log('start send');
    websocket.send(message);
    console.log('end send');
    inputBox.value = '';
});

btnGeo.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Отправка!');
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
    } else {
        writeToScreen('Гео-локация не подерживается браузером', 'client');
    }
})




