
let selectedUser = document.querySelector(".user.selected");
let selectedPrivacy = document.querySelector(".privacy.selected");
let name = document.querySelector(".user.selected .name");
let privacy = document.querySelector(".privacy.selected span");
let nick;

//getUsers();
getMessages();
//login();

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

}

function getMessages() {
    axios.get('')
}

function sendMessage(input) {

}

function selectUser(user) {
    selectedUser.classList.remove("selected");
    user.classList.add("selected");
    selectedUser = user;
    name = document.querySelector(".user.selected .name");
    updateSending();
}

function selectPrivacy(pvt) {
    selectedPrivacy.classList.remove("selected");
    pvt.classList.add("selected");
    selectedPrivacy = pvt;
    privacy = document.querySelector(".privacy.selected span");
    updateSending();
}

function updateSending() {
    let sending = document.querySelector(".sending");
    let user = name.innerHTML;
    let pvt = privacy.innerHTML;
    sending.innerHTML = `Enviando para ${user} (${pvt})`;
}

function openUsers() {
    let sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "block";
}

function exit() {
    let sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none"
}


{/* <div class="message status">
        <span class="time">(12:29:22)</span>
        <span class="user">João</span>
        <span>entrou.</span>
    </div>
    <div class="message private">
        <span class="time">(12:29:33)</span>
        <span class="user">Sálvio</span>
        <span>privado para</span>
        <span class="user">Marilene:</span>
        <span>Olá, Marilene!</span>
    </div>
    <div class="message">
        <span class="time">(12:30:02)</span>
        <span class="user">Ana</span>
        <span>para</span>
        <span class="user">Todos:</span>
        <span>Tudo bem, pessoal?</span>
    </div>
    <div class="message status">
        <span class="time">(12:30:45)</span>
        <span class="user">Marilene</span>
        <span>saiu.</span>
    </div> */}