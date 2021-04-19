
let screen = document.querySelector(".loginScreen div");
let chat = document.querySelector(".chat");

let userList = document.querySelector(".users .online");
let selectedUser = document.querySelector(".user.selected");
let selectedPrivacy = document.querySelector(".privacy.selected");
let userName = document.querySelector(".user.selected .name").innerHTML;
let privacy = document.querySelector(".privacy.selected span");

let input = document.querySelector(".input input");
let privacyType = 'message';
let nick;

function login() {
    
    nick = document.getElementById("login").value;
    if(nick === '') {
        alert('Nome inválido!');
        input.value = '';
        return;
    }
    let nickname = {name: `${nick}`};
    screen.innerHTML = `<img src="assets/loading.gif" alt="Loading" style="margin: 0">`
    let promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants ', nickname);

    promise.then(loginSuccess);
    promise.catch(usernameNotAvailable);
}

function loginSuccess() {

    getUsers();
    setInterval(getUsers, 10000);
    getMessages();
    setInterval(getMessages, 3000);
    updateStatus();
    setInterval(updateStatus, 5000);

    setTimeout(openChat, 800);
}

function usernameNotAvailable(error) {
    alert("Nome de usuário não disponível!");

    screen.innerHTML = `<input type="text" id="login" placeholder="Digite seu nome">
                        <button id="loginButton" onclick="login(this)">Entrar</button>`
}

function openChat() {

    let loginScreen = document.querySelector(".loginScreen");
    loginScreen.style.display = "none";
}

// Enviar com Enter
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("send").click();
    }
  });

function getUsers() {
    let promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants');

    promise.then(populateUsers);
}

function populateUsers(users) {

    let usersHTML = '';
  
    for(i = 0; i < users.data.length; i++) {
        
        if(users.data[i].name === userName) {
            let userDiv = `
            <li class="user selected" onclick="selectUser(this)">
                <div>
                    <ion-icon name="person-circle"></ion-icon>
                    <span class="name">${users.data[i].name}</span>
                </div>
                <ion-icon class="check" name="checkmark"></ion-icon>
            </li>`

            usersHTML += userDiv;
        } else {

            let userDiv = `
            <li class="user" onclick="selectUser(this)">
                <div>
                    <ion-icon name="person-circle"></ion-icon>
                    <span class="name">${users.data[i].name}</span>
                </div>
                <ion-icon class="check" name="checkmark"></ion-icon>
            </li>`

            usersHTML += userDiv;
        }
    }

    userList.innerHTML = '';
    userList.innerHTML = usersHTML;
}

function getMessages() {
    let promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');

    promise.then(populateMessages);
}

function populateMessages(msgList) {

    let chatHTML = '';
    let messageHTML;
    let currentMsg;

    for(i = 0; i < msgList.data.length; i++) {

        let messageI = msgList.data[i];

        if(messageI.type === 'status') {

            currentMsg = messageI
            messageHTML = `
                <li class="message status">
                    <p>
                        <span class="time">(${currentMsg.time})</span>
                        <strong>${currentMsg.from}</strong>
                        <span>${currentMsg.text}</span>
                    </p>
                </li>`;

            chatHTML += messageHTML;

        } else if(messageI.type === 'message') {

            currentMsg = messageI;
            messageHTML = `
                <li class="message">
                    <p>
                        <span class="time">(${currentMsg.time})</span>
                        <strong>${currentMsg.from}</strong>
                        <span>para</span>
                        <strong>${currentMsg.to}:</strong>
                        <span> ${currentMsg.text}</span>
                    </p>
                </li>`;

            chatHTML += messageHTML;

        } else if((messageI.to === nick || messageI.from === nick || messageI.to === "Todos") && messageI.type === 'private_message'){

            currentMsg = messageI;
            messageHTML = `
                <li class="message private">
                    <p>
                        <span class="time">(${currentMsg.time})</span>
                        <strong>${currentMsg.from}</strong>
                        <span>privado para</span>
                        <strong>${currentMsg.to}:</strong>
                        <span>${currentMsg.text}</span>
                    </p>
                </li>`;

            chatHTML += messageHTML;
        }
    }

    chat.innerHTML = '';
    chat.innerHTML = chatHTML;
    chat.scrollTop = chat.scrollHeight;
}

function updateStatus() {
    let message = {name: `${nick}`};
    axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status', message);
}

function sendMessage(input) {
    let typed = document.getElementById("typing");
    if(typed.value === '') {
        return;
    }
    let newMessage = {from: `${nick}`, to: userName, text: `${typed.value}`, type: `${privacyType}`};

    let promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages', newMessage);

    promise.then(getMessages);
    promise.catch(reloadPage);
    document.getElementById("typing").value = "";
}

function openUsers() {

    let sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
    document.querySelector(".list").classList.add("showing")
}

function exit() {
    
    let sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none"
    document.querySelector(".list").classList.remove("showing")
}

function selectUser(user) {
    
    document.querySelector(".user.selected").classList.remove("selected");
    user.classList.add("selected");
    selectedUser = user;

    userName = document.querySelector(".user.selected .name").innerHTML;
    updateSending();
}

function selectPrivacy(pvt) {
    selectedPrivacy.classList.remove("selected");
    pvt.classList.add("selected");
    selectedPrivacy = pvt;
    privacy = document.querySelector(".privacy.selected span");
    
    if(privacy.innerHTML === "Privado") {
        privacyType = 'private_message';
    } else {
        privacyType = 'message';
    }
    updateSending();
}

function updateSending() {
    let sending = document.querySelector(".sending");
    let user = userName;
    let pvt = privacy.innerHTML;
    sending.innerHTML = `Enviando para ${user} (${pvt})`;
}

function reloadPage() {
    window.location.reload();
}