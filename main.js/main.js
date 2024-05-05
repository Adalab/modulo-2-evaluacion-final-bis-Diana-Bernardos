'use stric';

const btnsave=document.querySelector(".js_btn-save");
const btnrecover=document.querySelector(".js_btn-recover");
const div=document.querySelector(".js_user");
const ul=document.querySelector(".ulList");

let userList=[];
let bestFriend=[];
//funcion que renderiza el listado de los datos de la api.pintando una  cadena html con los datos que queremos obtener de cada usuario al azar 

function renderList(userList) {

 for (const eachUser of userList)
        ul.innerHTML +=
    `<div>
    <li class=card>
    <img src="${eachUser.picture.thumbnail}"/> <h2>"${eachUser.name.first}"</h2><h4>"${eachUser.location.city}"</h4><h5>"${eachUser.login.username}"</h5><h6>"${eachUser.id.name}"</h6>
    </li>
    </div>`;};

const addFriends= (bestFriend)=>{
    ev.preventDefault();

    const liClikedId= ev.currentTarget.id;
    const liClikedUserList= userList.find(
    //verifica si el usuario ya esta en la lista de ffav
    (item)=> item.id === liClikedId);
    const bestFriendClikedIndex=bestFriend.findIndex(
        (item)=> item.id === liClikedId);
    //-1d si no se encuentra en fav
if (bestFriendClikedIndex=== -1){
    userList.push(liClikedUserList);
    // si no esta lo añade
}else{
    bestFriend.splice(bestFriendClikedIndex,1);
}


localStorage.setItem("bestFriend", JSON.stringify(bestFriend));

//se guardan los datos en el local storage
};

//funcion que obtiene los datos de la api y los guarda en una variable
function getDataAPI() {
   
    fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
    userList=data.results; 
    renderList(userList);
   
    })};
 
    
//dentro de la funcion manejadora tb aañadimos los diez primeros ususarios de la lista al hacer click en save 

function handleClick(event){
event.preventDefault();

const btnCliked=event.currentTarget;
if(btnCliked === btnsave){
fetch('https://randomuser.me/api/?results=10')
.then(response => response.json())
.then(data => {
userList=data.results;
renderList(userList);
});


}else if(btnCliked === btnrecover){
    bestFriend=JSON.parse(localStorage.getItem("bestFriend"));
    renderList(bestFriend);
   
}
};

/* recover.addEventListener("click", handleRecover); */
btnsave.addEventListener("click",handleClick);
btnrecover.addEventListener("click", handleClick);

