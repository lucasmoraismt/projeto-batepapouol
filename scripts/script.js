
let selectedUser = document.querySelector(".user.selected");
let selectedPrivacy = document.querySelector(".privacy.selected");

getUsers();
getMessages();
// login();

function login() {
    let name = prompt("Qual seu nome?");
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
}

function selectPrivacy(privacy) {
    selectedPrivacy.classList.remove("selected");
    privacy.classList.add("selected");
    selectedPrivacy = privacy;
}