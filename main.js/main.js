'use stric';

const btnsave=document.querySelector(".js_btn-save");
const recover=document.querySelector(".js_btn-recover");
const div=document.querySelector(".js_user");
const ul=document.querySelector(".ulList");

let userList=[];

function renderList(userList) {
    
    for (eachUser of userList){
        ul.innerHTML += 
    `<li class=card> <h4>"${eachUser.name.first}"</h4><h3>"${eachUser.city}"</h3><h5>"${eachUser.username}"</h5>
    <img src="${eachUser.picture.thumbnail}"/></li>`;}
};

function getDataAPI() {
    fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
    userList=data.results;
     renderList(userList);
    
    });
     
};
     
        getDataAPI();

function handleClick(event){
  event.preventDefault();
    const btnCliked=event.currentTarget;
    if (btnCliked === btnsave){
        getDataAPI();
    }
    else if (btnCliked === recover){
        ul.innerHTML="";
    }
    else {
        console.log("error");
    }

};

  
btnsave.addEventListener("click",handleClick);
