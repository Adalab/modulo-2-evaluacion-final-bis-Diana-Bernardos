'use stric';

const btnsave=document.querySelector(".js_btn-save");
const btnrecover=document.querySelector(".js_btn-recover");
const div=document.querySelector(".js_user");
const ul=document.querySelector(".ulList");
const div1=document.querySelector(".js-save");
const div2=document.querySelector(".js-recover");

let userList=[];
let bestFriend=[];
//funcion que renderiza el listado de los datos de la api.pintando una  cadena html con los datos que queremos obtener de cada usuario al azar 


function renderList(userList) {
ul.innerHTML= "";

 for (const user of userList){
    const userColors =user.Color ? getUserColors(user.Colors):"";
    const isFavorite=  bestFriend.findIndex(user=>userList.id===userList.id);
    /* const liCLass = isFavorite === -1 ?  " ":"pink"; */
ul.innerHTML +=
`<li class="ulList" ${isFavorite}" id= ${user.id}">
<img src="${user.picture.thumbnail}"/> <h2>"${user.name.first}"</h2><h4>"${user.location.city}"</h4><h5>"${user.login.username}"</h5>
${userColors}
</li>`;
/* let userColors="";
if(user.Color){
    if(user.Color&& Array.isArray(user.color)){
 */
function getUserColors(colors){
    let userColorshtml="";
for(const color of colors){
    userColors+=`<li class = "addFriend"
    style="background-color:#${color}"></li>
    <li class = "isuser"
    style="background-color:#${color}"></li>`;
}
return userColorshtml;
}}};

function getDataAPI() {
    fetch('https://randomuser.me/api/?results=10')
    .then(response => response.json())
    .then(data => {
      userList=data.results;
      renderList(userList);
    })};
/* document.addEventListener("DOMContentLoaded", getDataAPI); */



//funcion que agrega o elimina usuarios de la lista de amigos
const addFriends= (ev)=>{
    const userId=ev.currentTarget.id;
  const liClikedId= ev.currentTarget.id;
    const clikedUser= userList.find(user=>user.id===userId);
    //verifica si el usuario ya esta en la lista de ffav
 const friendIndex = bestFriend.findIndex(user=>userList.id===userList.id);
    
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
renderBestFriend(bestFriend);
// renderiza xa ver los cambios 

localStorage.setItem("bestFriend", JSON.stringify(bestFriend));
/* renderList(userList);  */
//se guardan los datos en el local storage
};

const recoverSaveUsers=()=>{
    const storeFriends= JSON.parse(localStorage.getItem("bestFriend"));
    
    if (storeFriends){
        bestFriend=storeFriends
        renderList(userList);
    }else 
    console.log("no hay datos");
};
//funcion que obtiene los datos de la api y los guarda en una variable
/* function getDataAPI() {
    fetch('https://randomuser.me/api/?results=10')
    .then(response => response.json())
    .then(data => {
      userList=data.results;
      renderList(userList);
    });


}; */

//dentro de la funcion manejadora tb aañadimos los diez primeros ususarios de la lista al hacer click en save 
const renderBestFriend= (array)=>{
    ul.innerHTML="";
    for (const eachUser of array){
        ul.innerHTML += renderList(userList);
    }
    const BestFriendLi= document.querySelectorAll(".js-save");
    for (const eachLi of BestFriendLi){
        ul.addEventListener("click",addFriends);
    }
};


    
function handleClick(event){
  event.preventDefault();
    const btnCliked=event.currentTarget;

    if (btnCliked.classList.contains("js_btn-save")){
        getDataAPI();
        /* fetch('https://randomuser.me/api/?results=10')
       .then(response => response.json())
        .then(data => {
            //agrega los 10 primeros usuarios a la lista
            userList=data.results;
            renderList(userList); */
            localStorage.setItem("userList", JSON.stringify(userList));
            //guarda los datos en el local storage
        
        }else if (btnCliked.classList.contains ("js_btn-recover")){
            recoverSaveUsers();
        }

        /* const btnCliked=event.currentTarget;

        }else if(btnCliked.classList.contains ("js_btn-recover")){
            const storeFriends= bestFriend= JSON.parse(localStorage.getItem  ("bestFriend"));
            renderList(storeFriends);
            console.log("no hay nada en el local storage");
           } */
         } ;
        document.addEventListener("DOMContentLoaded", getDataAPI);

ul.addEventListener("click",(event)=>{
    if (event.target.classList.contains("ulList")){
        addFriends(event);
    }
});

     
    

// renderiza la lista con los 10 usuarios aleatorios
 
getDataAPI()

ul.addEventListener("click", addFriends);
btnsave.addEventListener("click",handleClick);
btnrecover.addEventListener("click", handleClick);