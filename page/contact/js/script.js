function submitForm() {
    body = JSON.stringify({
        name: document.getElementById('nameInput').value,
        object: document.getElementById('objectInput').value,
        message: document.getElementById('messageInput').value,
        via: document.URL
    })
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://162.248.100.96:61405/contact', true);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            switch (xhr.status) {
                case 400:
                    alert('Un champ n\'est pas valide')
                    break
                case 200:
                    alert('Message envoyé !')
                    break
            }
            console.log(xhr.responseText)
        }
    }
    xhr.send(body)
}