'use stric';

const btnsave=document.querySelector(".js_btn-save");
const recover=document.querySelector(".js_btn-recover");
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
    <img src="${eachUser.picture.thumbnail}"/> <h2>"${eachUser.name.first}"</h2><h4>"${eachUser.location.city}"</h4><h5>"${eachUser.login.username}"</h5>
    </li>
    </div>`;};

const addFriends= (bestFriend)=>{
    const liClikedId= ev.currentTarget.id;
    const liCliked= userList[liClikedId];
    //verifica si el usuario ya esta en la lista de ffav
 const friend= liCliked.find(
    (item)=> item.id === liClikedId);
    //-1d si no se encuentra en fav
if (friend=== -1){
    userList.push(friend);
    // si no esta lo añade
}else{
    userList.splice(friend,1);
}
console.log(bestFriend);
renderList(userList);
localStorage.setItem("userList", JSON.stringify(userList));
//se guardan los datos en el local storage
};

//funcion que obtiene los datos de la api y los guarda en una variable
function getDataAPI() {
    fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
    userList=data.results; 
    });
    
};      
   getDataAPI();


//dentro de la funcion manejadora tb aañadimos los diez primeros ususarios de la lista al hacer click en save 

function handleClick(event){
event.preventDefault();

   const btnCliked=event.currentTarget;

    if (btnCliked === btnsave){    
    fetch('https://randomuser.me/api/?results=10')
   .then(response => response.json())
    .then(data => {
        //agrega los 10 primeros usuarios a la lista
        userList=data.results;
// renderiza la lista con los 10 usuarios aleatorios
    renderList(userList);
    });
      
    }
    else if (btnCliked === recover)
        ul.innerHTML="";
    
    else {
        console.log("error");
    }

};
  getDataAPI();

btnsave.addEventListener("click",handleClick);
