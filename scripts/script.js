
let selectedUser = document.querySelector(".user.selected");
let selectedPrivacy = document.querySelector(".privacy.selected");
let name = document.querySelector(".user.selected .name");
let privacy = document.querySelector(".privacy.selected span");

getUsers();
getMessages();
// login();

function login() {
    let nick = prompt("Qual seu nome?");
}

function getUsers() {

}

function getMessages() {

}

function sendMessage(input) {

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