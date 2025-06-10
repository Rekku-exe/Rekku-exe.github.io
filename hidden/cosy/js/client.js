const params = new URLSearchParams(document.location.search);

document.getElementById('t-room').value = params.get('r');

document.getElementById('t-server').value = params.get('u');

const serverURL = 'http://'+params.get('u');

const socket = io.connect(serverURL);

document.getElementById('msgForm').addEventListener('submit', e => {
    e.preventDefault();
    const text = document.getElementById('t-entre').value;
    const name = document.getElementById('t-name').value ? document.getElementById('t-name').value : 'invité';
    const key = document.getElementById('t-room').value ? document.getElementById('t-room').value : '';
    if('' != text){
        const message = CryptoJS.AES.encrypt(JSON.stringify({ name, text }), key).toString();
        socket.emit('message', message);
        document.getElementById('t-entre').value = '';
        const chat_box = document.getElementById('chat_box');
        chat_box.innerHTML += `<div class="chat_bubble chat_bubble-right">${text}</div>`;
        chat_box.scrollBy(0, chat_box.offsetHeight);
    }
});

socket.on('message', message => {
    try {
        const key = document.getElementById('t-room').value ? document.getElementById('t-room').value : '';
        const json = JSON.parse(CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8));
        const chat_box = document.getElementById('chat_box');
        chat_box.innerHTML += `<p class="chat_bubble_name">${json.name}</p><div class="chat_bubble chat_bubble-left">${json.text}</div>\n`;
        chat_box.scrollBy(0, chat_box.offsetHeight);
    } catch {}
});

document.getElementById('serverForm').addEventListener('submit', e => {
    e.preventDefault();
    const url = new URL(document.location.href);
    url.searchParams.set('u', document.getElementById('t-server').value)
    document.location.href = url.href;
});