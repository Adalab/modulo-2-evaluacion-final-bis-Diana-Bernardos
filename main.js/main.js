'use strict';

const btnsave = document.querySelector(".js_btn-save");
const btnrecover = document.querySelector(".js_btn-recover");
const div = document.querySelector(".js_user");
const ul = document.querySelector(".ulList");

let userList = [];
let bestFriend = [];

function renderList(users) {
    ul.innerHTML = "";

    for (const user of users) {
        if (user.picture && user.picture.large) {
            let isSelect = false;
            for (const friend of bestFriend) {
                if (friend.login.uuid === user.login.uuid) {
                    isSelect = true;
                    break;
                }
            }
            //operador ternario en vez de if y else.
            const liClass = isSelect ? "selected" : "";
            const backgroundColor = isSelect ? "pink" : "rgb(148, 201, 241)"
   
            

            ul.innerHTML +=
                `<li class="userItem ${liClass}" id="${user.login.uuid}" style="background-color: ${backgroundColor}">
                    <img src="${user.picture.large}">
                    <h1>${user.name.first}</h1>
                    <h4>${user.location.city}</h4>
                    <h5>${user.login.username}</h5>
                </li>`;
        }
    }

    const liList = document.querySelectorAll(".userItem");
    for (const li of liList) {
        li.addEventListener("click", addFriend);
    }
}

function getDataAPI() {
    fetch('https://randomuser.me/api/?results=10')
    .then(response => response.json())
    .then(data => {
        userList = data.results;
        renderList(userList);
        /* localStorage.setItem("userList", JSON.stringify(userList)); */
    });
}

const addFriend = (ev) => {
    const userId = ev.currentTarget.id;
    const clickedUser = userList.find(user => user.login.uuid === userId);

    if (!clickedUser) return;

    const friendIndex = bestFriend.findIndex(friend => friend.login.uuid === clickedUser.login.uuid);

    if (friendIndex === -1) {
        bestFriend.push(clickedUser);
        ev.currentTarget.classList.add("selected");
    } else {
        bestFriend.splice(friendIndex, 1);
        ev.currentTarget.classList.remove("selected");
    }
   /*  for (const friend of bestFriend) {
        console.log(friend.name.first);
    } */
    renderList(userList);
    localStorage.setItem("bestFriend", JSON.stringify(bestFriend));
};

const saveDisplayUsers = () => {
    localStorage.setItem("displayedUsers", JSON.stringify(userList));
};

const recoverDiplaySaveUsers = () => {
    const storedFriends = JSON.parse(localStorage.getItem("bestFriend"));
    if (storedFriends) {
        bestFriend = storedFriends;
    } else {
        console.log("No hay usuarios guardados en el almacenamiento local.");
    }

    const storedUsers = JSON.parse(localStorage.getItem("displayedUsers"));
    if (storedUsers) {
        userList = storedUsers;
        renderList(userList);
    } else {
        console.log("No hay usuarios guardados en el almacenamiento local.");
    }
};

function handleClick(event) {
    event.preventDefault();
    const btnClicked = event.currentTarget;

    if (btnClicked === btnsave) {
        saveDisplayUsers();
    } else if (btnClicked === btnrecover) {
        recoverDiplaySaveUsers();
    }
}

getDataAPI();
btnsave.addEventListener("click", handleClick);
btnrecover.addEventListener("click", handleClick);





