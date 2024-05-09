'use strict';

const btnsave=document.querySelector(".js_btn-save");
const btnrecover=document.querySelector(".js_btn-recover");
const div=document.querySelector(".js_user");
const ul=document.querySelector(".ulList");


let userList=[];
let bestFriend=[];

//funcion que renderiza el listado de los datos de la api.pintando una  cadena html con los datos que queremos obtener de cada usuario al azar 


function renderList (users){



ul.innerHTML= "";

 for (const user of users){
    if (user.picture && user.picture.thumbnail) {
    
    const isSelect= bestFriend.some(friend=>friend.id===user.id); 
    console.log(isSelect);
    const liCLass = isSelect ? "selected" :  " "; 

   ul.innerHTML +=
   `<li class="userItem ${liCLass}" id= "${user.login.uuid}">
    <img src="${user.picture.thumbnail}"> <h2>${user.name.first}</h2><h4>${user.location.city}</h4><h5>${user.login.username}</h5>
      </li>`;

/* if (isFavorite === -1){
    div.classList.add("pink");
}else{
    div.classList.remove("pink");
}}}; */
 }}
 const liList =document.querySelectorAll(".userItem");
 for (const li of liList){
    li.addEventListener("click", toggleFriend);
}
};

/* function getUserColors(colors){
    let userColorsHtml="";
for(const color of colors){
    userColorsHtml+=
    `<li class = "addFriend"
    style="background-color:#${color}"></li>
    <li class = "isuser"
    style="background-color:#${color}"></li>`;
}
return userColorsHtml;

}; */

function getDataAPI() {
    fetch('https://randomuser.me/api/?results=10')
    .then(response => response.json())
    .then(data => {
      userList=data.results;
      console.log(userList);
      renderList(userList);

      localStorage.setItem("userList", JSON.stringify(userList));
    })};

//funcion que agrega o elimina usuarios de la lista de amigos
const toggleFriend= (ev)=>{
    console.log(ev.currentTarget);
    
    const userId=ev.currentTarget.id;
  /* const liClikedId= ev.currentTarget.id; */
    const clikedUser= userList.find(user=>user.login.uuid===userId);
    console.log(userId);
    if (!clikedUser)return;
    
    //verifica si el usuario ya esta en la lista de ffav
 const friendIndex = bestFriend.findIndex(friend=>friend.id===clikedUser.id);
 console.log(friendIndex);
    
    //-1d si no se encuentra en fav
if (friendIndex=== -1){
    bestFriend.push(clikedUser);
    // si no esta lo añade
    
    // añado la clase para que cambie el color de fondo
    ev.currentTarget.classList.add("selected");
}else{
    bestFriend.splice(friendIndex,1);
    ev.currentTarget.classList.remove("selected");
    // si esta lo elimina
}
localStorage.setItem("bestFriend", JSON.stringify(bestFriend));
};
// renderiza xa ver los cambios 

const saveDisplayUsers = () =>{
    localStorage.setItem("displayedUsers", JSON.stringify(userList));
};



const recoverDiplaySaveUsers = () => {
    const storedFriends = JSON.parse(localStorage.getItem("bestFriend"));
    if (storedFriends) {
        bestFriend = storedFriends;
        renderList(bestFriend);
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
    console.log(btnClicked);
};
            
   document.addEventListener("DOMContentLoaded",getDataAPI ) ;


/*  li.addEventListener("click", toggleFriend); */
btnsave.addEventListener("click",handleClick);
btnrecover.addEventListener("click", handleClick);

