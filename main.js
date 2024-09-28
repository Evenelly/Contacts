//base
var contacts = [
    {
        name:"Aer",
        surname: "Userson",
        birthday: "2000-12-01"
    },
    {
        name:"Cohan",
        surname: "Andersson",
        birthday: "1956-09-17"
    },
    {
        name:"Btina",
        surname: "Tina",
        birthday: "2004-11-16"
    }
];

var contactDiv = document.getElementById("contact-information"); 
var sortType = document.getElementById("sort-text");

WriteContacts();


//functions

function WriteContacts(){

    contactDiv.innerHTML = "";
     
    for (let i = 0; i < contacts.length; i++) {
        div = document.createElement("div");
        contactDiv.appendChild(div);
        div.classList.add("contact")
        p1 = document.createElement("p");
        p2 = document.createElement("p");
        div.appendChild(p1);
        div.appendChild(p2);
        p1.innerText = contacts[i].name + " " + contacts[i].surname;
        p2.innerText = "Birthday: " + contacts[i].birthday;
    }
 }


function AddContact(){
    var popUp = document.getElementById("popUp");
    popUp.setAttribute("style", "display: block");
}



function submit(){

    var nameInput = document.getElementById("nameInput");
    var surnameInput = document.getElementById("surnameInput");
    var birthdayInput = document.getElementById("birthdayInput");

    var object ={
        name: nameInput.value,
        surname: surnameInput.value,
        birthday: birthdayInput.value
    }

    contacts.push(object)
    
    Sort(sortType)

}


let showing = false;

function DropDown() {

    svg = document.getElementById("svg");
    path = document.getElementById("path");
    dropDown = document.getElementById("drop-down");
 
    if (!showing) {
       dropDown.classList.add("show")
       showing = true;
       svg.classList.remove("bi-arrow-up-short");
       svg.classList.add("bi-arrow-down-short");
       path.setAttribute("d", "M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4")
    }else{
       dropDown.classList.remove("show")
       showing = false;
       svg.classList.remove("bi-arrow-down-short");
       svg.classList.add("bi-arrow-up-short");
       path.setAttribute("d", "M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5");
    }
 }



 function Sort(sortType){
    text = document.getElementById("sort-text");
    text.innerText = sortType.innerText;

    if(sortType.innerText === "A-Z"){

        let sorted = false;

        while(!sorted){
            sorted = true;

            for (let i = 0; i < contacts.length - 1; i++) {
                if(contacts[i].name[0].toLowerCase() > contacts[i + 1].name[0].toLowerCase()){
                    [contacts[i], contacts[i + 1]] = [contacts[i + 1], contacts[i]]
                    
                    sorted = false;
                }
            }
        }
    }else if(sortType.innerText === "Birthday"){

    }

    WriteContacts();
 }
