// Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

// Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат.

// Добавить в чат механизм отправки гео-локации.

// При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.

const chatBox = document.querySelector('.chat-box');
const input = document.querySelector('.chat-input');
const msgbtn = document.querySelector('.btn-msg');
const geobtn = document.querySelector('.btn-geo');
const info = document.querySelector('.connection-info');

const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com');
let isGeo = false;

msgbtn.addEventListener('click', sendMessage);
input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        msgbtn.click();
    }
});

function sendMessage() {
    if (input.value === '') {
        return
    } else {
        websocket.send(input.value);
        isGeo = false;
        writeOutput(input.value, true);
        input.value = '';
    }
}

function writeOutput(message, isSended) {
    chatBox.innerHTML += `<div class='msg ${isSended ? "sended" : "received"}'>${message}</div>`;
}

websocket.onopen = () => {
    info.textContent = 'Соединение установлено!';
}

websocket.onmessage = (event) => {
    isSended = false;
    if (!isGeo) {
        writeOutput(event.data, false);
    }
}

websocket.onerror = () => {
    alert('При передаче данных произошла ошибка!');
}

websocket.onclose = () => {
    alert('Соединение закрыто!');
}

geobtn.addEventListener('click', sendGeo);

function sendGeo() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            let { latitude, longitude } = position.coords;
            let geoLink = `<a href='https://www.openstreetmap.org/#map=18/${latitude}/${longitude}' target='_blank'>Вы находитесь здесь</a>`;
            websocket.send(geoLink);
            isGeo = true;
            writeOutput(geoLink, true);
        });
    } else {
        writeOutput('Геолокация не поддерживается вашим браузером', true);
    }
}