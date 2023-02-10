// var list =[
//     {
//         id: 1,
//         label: "Food",
//         statu: false
//     },
//     {
//         id: 2,
//         label: "Water",
//         statu: false
//     },
//     {
//         id: 3,
//         label: "Code",
//         statu: false
//     },
//     {
//         id: 4,
//         label: "Sleep",
//         statu: false
//     }
// ];

// localStorage.setItem("list",JSON.stringify(list));
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

function removeList(){
    let listItems=document.querySelectorAll("li");
    listItems.forEach(function(element){
        element.remove();
    })
}

function makeElement(element){
    let listItem=document.createElement("li");
    let spanElement=document.createElement("span");
    let checkBox=document.createElement("input");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("value",element.id);
    checkBox.setAttribute("onclick",`check(${element.id})`);
    if(element.statu){
        checkBox.checked=true;
        listItem.setAttribute("class","checkedList");
    }
    let del=document.createElement("button");
    del.innerHTML="X";
    del.setAttribute("class","delete");
    del.setAttribute("value",element.id);
    spanElement.appendChild(checkBox);
    spanElement.appendChild(del);
    listItem.innerHTML=element.label;
    listItem.appendChild(spanElement);
    listParent.appendChild(listItem);
}

function onKeyPress(){
    var key=window.event.key;
    if(key === 'Enter'){
        
        let text=document.getElementById("text-box");
        console.log(text) ;
        if(text.value==""){
            console.log("empty");
        }else{
            let val=text.value;
            console.log(val);
            var obj={};
            if(list.length!=0){
                obj.id=list[list.length-1].id+1;
            }else{
                obj.id=1;
            }
            obj.label=val;
            obj.statu=false;
            list.push(obj);
            listRefresh();
            console.log(list);
        }
    }
}

function listRefresh(){
    console.log(list);
    localStorage.setItem("list",JSON.stringify(list));
    removeList();
    list.forEach(element=>{
        makeElement(element);
    })
}




function removeAllChar(){
    var key=window.event.key;
    if(key === 'Enter'){
        let text=document.getElementById("text-box");
        text.value="";
    }
}


function check(element){
    for(var i=0;i<list.length;++i){
        if(element==list[i].id){
            list[i].statu=!(list[i].statu);
        }
    }
    localStorage.setItem("list",JSON.stringify(list));
    listRefresh();
}