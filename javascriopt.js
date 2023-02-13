let list=[];
const listParent=document.getElementById("task-list") 
window.addEventListener("load",loadList);
function loadList(){
    list=JSON.parse(localStorage.getItem("list"));
    console.log(list);
    if(list!=undefined){
        list.forEach(function(element){
            makeElement(element);
        });
    }else{
        list=[];
   
    }
}

