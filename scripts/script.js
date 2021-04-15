
let chat = document.querySelector(".chat");
let userList = document.querySelector(".users .online");
let selectedUser = document.querySelector(".user.selected");
let selectedPrivacy = document.querySelector(".privacy.selected");
let name = document.querySelector(".user.selected .name").innerHTML;
let privacy = document.querySelector(".privacy.selected span");
let input = document.querySelector(".input input");
let privacyType = 'message';
let nick;

setInterval(getUsers, 10000);
getMessages();
//setInterval(getMessages, 3000);
login();

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("send").click();
  }
});

function login() {
    nick = prompt("Qual seu nome?");
    let nickname = {name: `${nick}`};

    let promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants ', nickname);

    promise.then(updateStatus);
    promise.catch(usernameNotAvailable);
}

function updateStatus() {
    let message = {name: `${nick}`};
    axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status', message);

    setTimeout(updateStatus, 5000);
}

function usernameNotAvailable(error) {
    alert("Nome de usuário não disponível!");
    login();
}

function getUsers() {
    let promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants');

    promise.then(populateUsers);
    userList.innerHTML = '';
}

function populateUsers(users) {
    
    for(i = 0; i < users.data.length; i++) {
        
        if(users.data[i].name === name) {

            let userDiv = `
            <div class="user selected" onclick="selectUser(this)">
                <div>
                    <ion-icon name="person-circle"></ion-icon>
                    <span class="name">${users.data[i].name}</span>
                </div>
                <ion-icon class="check" name="checkmark"></ion-icon>
            </div>`

            userList.innerHTML += userDiv;
        } else {

            let userDiv = `
            <div class="user" onclick="selectUser(this)">
                <div>
                    <ion-icon name="person-circle"></ion-icon>
                    <span class="name">${users.data[i].name}</span>
                </div>
                <ion-icon class="check" name="checkmark"></ion-icon>
            </div>`

            userList.innerHTML += userDiv;
        }
    }
}

function getMessages() {
    let promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');

    promise.then(populateMessages);
    chat.innerHTML = '';
}

function populateMessages(msgList) {

    let messageHTML;
    let currentMsg;

    for(i = 0; i < msgList.data.length; i++) {

        if(msgList.data[i].type === 'status') {

            currentMsg = msgList.data[i]
            messageHTML = `
                <div class="message status">
                    <p>
                        <span class="time">(${currentMsg.time})</span>
                        <span class="user">${currentMsg.from}</span>
                        <span>${currentMsg.text}</span>
                    </p>
                </div>`;

            chat.innerHTML += messageHTML;

        } else if(msgList.data[i].type === 'message') {

            currentMsg = msgList.data[i];
            messageHTML = `
                <div class="message">
                    <p>
                        <span class="time">(${currentMsg.time})</span>
                        <span class="user">${currentMsg.from}</span>
                        <span>para</span>
                        <span class="user">${currentMsg.to}</span>
                        <span>: ${currentMsg.text}</span>
                    </p>
                </div>`;

            chat.innerHTML += messageHTML;

        } else if((msgList.data[i].to === nick && msgList.data[i].type === 'private_message') || (msgList.data[i].from === nick && msgList.data[i].type === 'private_message')){

            currentMsg = msgList.data[i];
            messageHTML = `
                <div class="message private">
                    <p>
                        <span class="time">(${currentMsg.time})</span>
                        <span class="user">${currentMsg.from}</span>
                        <span>privado para</span>
                        <span class="user">${currentMsg.to}</span>
                        <span>${currentMsg.text}</span>
                    </p>
                </div>`;

            chat.innerHTML += messageHTML;
        }
    }

    chat.scrollTop = chat.scrollHeight;
}

function sendMessage(input) {
    let typed = document.getElementById("typing");
    let newMessage = {from: `${nick}`, to: name, text: `${typed.value}`, type: `${privacyType}`};

    let promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages', newMessage);

    promise.then(getMessages);
    document.getElementById("typing").value = "";
}

function openUsers() {

    let sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "block";
}

function exit() {
    let sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none"
}

function selectUser(user) {
    selectedUser.classList.remove("selected");
    user.classList.add("selected");
    selectedUser = user;
    name = document.querySelector(".user.selected .name").innerHTML;
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
    let user = name;
    let pvt = privacy.innerHTML;
    sending.innerHTML = `Enviando para ${user} (${pvt})`;
}

// https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants