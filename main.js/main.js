'use stric';

const btnsave=document.querySelector(".js_btn-save");
const btnrecover=document.querySelector(".js_btn-recover");
const div=document.querySelector(".js_user");
const ul=document.querySelector(".ulList");

let userList=[];
let bestFriend=[];
//funcion que renderiza el listado de los datos de la api.pintando una  cadena html con los datos que queremos obtener de cada usuario al azar 


function renderList(userList) {
ul.innerHTML= "";
    
 for (const eachUser of userList){
    const isFavorite= bestFriend.includes(eachUser);
        ul.innerHTML +=
    `<div>
    <li class=card>
    <img src="${eachUser.picture.thumbnail}"/> <h2>"${eachUser.name.first}"</h2><h4>"${eachUser.location.city}"</h4><h5>"${eachUser.login.username}"</h5>
    </li>
    </div>
    <div class="div-js_user""$"{color}">
    <li class="favorite" id="${userList.indexOf(eachUser)}" onclick="addFriends(event)">Favorite</li></div>`;};

const addFriends= (ev)=>{
    const liClikedId= ev.currentTarget.id;
    const clikedUser= userList[liClikedId];
    //verifica si el usuario ya esta en la lista de ffav
 const friendIndex = bestFriend.indexOf(clikedUser);
    
    //-1d si no se encuentra en fav
if (friendIndex=== -1){
    bestFriend.push(clikedUser);
    // si no esta lo añade
    
    // añado la clase para que cambie el color de fondo
    ev.currentTarget.classList.add("favorite");
}else{
    bestFriend.splice(friendIndex,1);
    ev.currentTarget.classList.remove("favorite");
    // si esta lo elimina
}
// renderiza xa ver los cambios 
renderList(userList);

localStorage.setItem("bestFriend", JSON.stringify(bestFriend));
//se guardan los datos en el local storage
}};

//funcion que obtiene los datos de la api y los guarda en una variable
function getDataAPI() {
    fetch('https://randomuser.me/api/?results=10')
    .then(response => response.json())
    .then(data => {
    userList=data.results;
     renderList(userList);
     
    });


};

//dentro de la funcion manejadora tb aañadimos los diez primeros ususarios de la lista al hacer click en save 

function handleClick(event){
  event.preventDefault();
    const btnCliked=event.currentTarget;

    if (btnCliked.classList.contains("js_btn-save")){
          
        fetch('https://randomuser.me/api/?results=10')
       .then(response => response.json())
        .then(data => {
            //agrega los 10 primeros usuarios a la lista
            userList=data.results;
            renderList(userList);
            localStorage.setItem("userList", JSON.stringify(userList));
           
        });
        
     }else if(btnCliked.classList.contains ("js_btn-recover")) {
           const storeUsers= /* userList= */JSON.parse(localStorage.getItem("userList"));
           if(storeUsers){
            userList=storeUsers;
            renderList(userList);
           }else{
            console.log("no hay nada en el local storage");
           }
            
            //recupera los datos del local storage
        }

     
     
    
 };
// renderiza la lista con los 10 usuarios aleatorios
   
  getDataAPI();
ul.addEventListener("click",handleClick);

btnsave.addEventListener("click",handleClick);
btnrecover.addEventListener("click", handleClick);
