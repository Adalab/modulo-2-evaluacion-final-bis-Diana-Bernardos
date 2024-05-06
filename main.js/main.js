'use stric';

const btnsave=document.querySelector(".js_btn-save");
const btnrecover=document.querySelector(".js_btn-recover");
const div=document.querySelector(".js_user");
const ul=document.querySelector(".ulList");

let userList=[];
let bestFriend=[];
//funcion que renderiza el listado de los datos de la api.pintando una  cadena html con los datos que queremos obtener de cada usuario al azar 

function renderList(userList) {
ul.innerHTML="";
 for (const eachUser of userList)
// verificacion de que los datos de cada usuario sean correctos
    if (eachUser && eachUser.picture && eachUser.picture.thumbnail && eachUser.name && eachUser.name.first && eachUser.location && eachUser.location.city && eachUser.login && eachUser.login.username) {
    ul.innerHTML +=    
   `<div>
    <li class="card">
    <img src="${eachUser.picture .thumbnail}"/> <h2>"${eachUser.name.first }"</h2><h4>"${eachUser.location.city }"</h4><h5>"${eachUser.login.username }"</h5>
    </li> </div>`;
    
}};
    
function getDataAPI() {
   
    fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
    userList=data.results; 
    renderList(userList);
    localStorage.setItem("userList", JSON.stringify(userList));
    /* addFriends();
    addListeners();
   getDataAPI(); */
    })};


const addFriends= (ev)=>{
/* ev.preventDefault(); */

    const liClikedId=ev.currentTarget.id;
    const liClikedUser= userList.find(
    //verifica si el usuario ya esta en la lista de ffav
    (item)=>item .name && item.name.username === liClikedId);
    /* const bestFriendClikedIndex=bestFriend.findIndex(
        (item)=> item.id === liClikedId); */
    //-1d si no se encuentra en fav
    if (liClikedUser){
  const bestFriendIndex=bestFriend.findIndex(
    (item)=> item.name.username ===liClikedId);

if (bestFriendIndex === -1) {
    bestFriend.push(liClikedUser);
    
    // si no esta lo añade
   
}else{
    bestFriend.splice(bestFriendIndex, 1);
}
console.log(bestFriend);
renderList(userList);
localStorage.setItem("bestFriend", JSON.stringify(bestFriend));
}
};
//se guardan los datos en el local storage

//funcion para añadir lintener a los usuarios para poder clicarlos y añadir a fAV
function addListeners() {
    const liList = document.querySelectorAll(".card");
    for (const li of liList) {
        li.addEventListener("click", addFriends);
    }
};


const init =()=>{
    userList=JSON.parse(localStorage.getItem("userList"))|| [];
    bestFriend=JSON.parse(localStorage.getItem("bestFriend"))|| [];
    renderList(userList);
    addListeners();
};
    
//dentro de la funcion manejadora tb aañadimos los diez primeros ususarios de la lista al hacer click en save 

function handleClick(event){
    const btnCliked=event.currentTarget;
/* event.preventDefault(); */
/* 
})};
/* const btnCliked=ev.currentTarget.id; */
/* const liClikedUserList=userList.find(
(item)=> item.id.name === btnCliked); */ 

if(btnCliked===btnsave) {
    
    fetch('https://randomuser.me/api/?results=10')
.then(response => response.json())
.then(data => {
userList=data.results;
addFriends();
renderList(userList);
addListeners();
});
    /* bestFriend.push(liClikedUserList);
    renderList(bestFriend);
    localStorage.setItem("bestFriend", JSON.stringify(bestFriend));
if(btnCliked === btnsave){
    getDataAPI(); */
}else if(btnCliked === btnrecover){
    bestFriend=JSON.parse(localStorage.getItem("bestFriend"))|| [];
    renderList(bestFriend);
   
}};



init();

/* recover.addEventListener("click", handleRecover); */
btnsave.addEventListener("click",handleClick);
btnrecover.addEventListener("click", handleClick);


