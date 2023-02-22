// let list=[
//     {
//         id:1,
//         label: "test",
//         status:false
//     },
//     {
//         id:2,
//         label: "test2",
//         status:false
//     },
//     {
//         id:3,
//         label: "test3",
//         status:false
//     }
// ]

// localStorage.setItem("list",JSON.stringify(list));

let list=[];
let popUp = document.getElementById("StringEmptyPopup");
let blurScreen = document.getElementById("blurFilm");
let popUpButton = document.getElementById("popup-button");

console.log(popUpButton);

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

function makeElement(element){
    let liToInsert = document.createElement("li");
    liToInsert.setAttribute("id",element.id);
    // liToInsert.innerHTML = element.label;
    
    let divWithText = document.createElement("div");
    divWithText.classList.add("text");
    divWithText.innerHTML = element.label;

    liToInsert.appendChild(divWithText);

    let pencile = document.createElement("button");
    let img=document.createElement("img");

    
    img.setAttribute("src","./Image/pen.png");
    img.classList.add("pencile");
    pencile.setAttribute("onclick",`rename(${element.id})`);
    pencile.appendChild(img);

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("onclick",`checkBox(${element.id})`)
    // console.log(checkBox);
    checkBox.checked = element.status;
    
    if(element.status == true){
        liToInsert.classList.add("checkedList");
    }

    // liToInsert.appendChild(checkBox);

    let button = document.createElement("button");
    button.setAttribute("class","delete");
    button.innerHTML = "X";
    button.setAttribute("onclick",`del(${element.id})`);
    // liToInsert.appendChild(button);

    let divElement = document.createElement("div");
    divElement.classList.add("buttonDivContainer");
    divElement.appendChild(pencile);
    divElement.appendChild(checkBox);
    divElement.appendChild(button);
    
    liToInsert.appendChild(divElement);

    listParent.insertAdjacentElement("beforebegin",liToInsert);
}


function addElement(text){
    text = text.trim();
    if(text == ""){
        console.log("visible");
        visiblePopUp();
        popUp.focus();
        return ;
    }
    let obj={}; 
    obj.id=0;
    if(list.length == 0){
        obj.id = 1;
    }else{
        obj.id = list[list.length-1].id+1;
    }
    obj.label = text;
    obj.status = false;
    list.push(obj);

    makeElement(list[list.length-1]);
    localStorage.setItem("list",JSON.stringify(list));

}

function onKeyPress(){
    let key = window.event.key;
    if(key == "Enter"){
        let textArea = document.getElementById("text-box");
        addElement(textArea.value);
        console.log(textArea.value);
        textArea.value="";
    }
}

function removeAllChar(){
    let textArea = document.getElementById("text-box");
    if( window.event.key=="Enter"){
        textArea.value = "";
    }
}


function del(id){
    console.log(id);
    list=list.filter(function(element){
        if(element.id == id){
            return false;
        }
        return true;
    });

    document.getElementById(id).remove();
    console.log(list);
    localStorage.setItem("list",JSON.stringify(list));
}

function checkBox(id){
    let status;
    list.forEach(function(element){
        if(element.id == id){
            status = element.status;
            element.status = !element.status;
            console.log(element.status);
        }
    })
    localStorage.setItem("list",JSON.stringify(list));
    
    if(status == false){
        document.getElementById(id).classList.add("checkedList");
    }else{
        document.getElementById(id).classList.remove("checkedList");
    }
}


function rename(id){
    var liItem = document.getElementById(id);
    var textArea = liItem.getElementsByClassName("text")[0];
    console.log(textArea);
    var oldString = textArea.innerText;
    console.log(oldString);
    textArea.innerHTML = `<input id={${id+"input"}} type="text" onkeydown='renameInputFun(${id},"${oldString}")'>`;
    var inputBox = textArea.getElementsByTagName("input")[0];
    inputBox.focus();
    console.log(inputBox);
}

function renameInputFun(id,oldString){
    console.log(oldString);
    var key = window.event.key;
    if(key=="Enter"){
        setName(id,oldString);
    }
}

function setName(id,oldString){
    var liItem = document.getElementById(id);
    var textArea = liItem.getElementsByClassName("text")[0];
    var newName = textArea.getElementsByTagName("input")[0];
    var text = newName.value;
    text = text.trim();
    if(text != ""){
        console.log(text);
    }else{
        text =  oldString;
        console.log(text);    
    }
    
    textArea.innerHTML = `${text}`;

    list.forEach(function(element){
        if(element.id ==id){
            element.label = text;
        }
    })


    localStorage.setItem("list",JSON.stringify(list));
}


function visiblePopUp(){
    popUp.classList.remove("visibility-collapse");
    blurScreen.classList.remove("visibility-collapse");
    console.log(popUp.classList);
    document.activeElement.blur();
}

function removePopUp(){
    popUp.classList.add("visibility-collapse");
    blurScreen.classList.add("visibility-collapse");
}