//base
var contacts = [
    {
        name:"Aer",
        surname: "Userson",
        birthday: "2000-12-01",
    },
    {
        name:"Cohan",
        surname: "Andersson",
        birthday: "1956-09-17",
    },
    {
        name:"Btina",
        surname: "Tina",
        birthday: "2004-11-16"
    }
];
var contactDiv = document.getElementById("contact-information"); 
var sortType = document.getElementById("sort-text");

writeContacts();



//functions

function writeContacts(){

    contactDiv.innerHTML = "";
     
    for (let i = 0; i < contacts.length; i++) {
        const div = document.createElement("div");
        contactDiv.appendChild(div);
        div.classList.add("contact")
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        div.appendChild(p1);
        div.appendChild(p2);
        p1.innerText = contacts[i].name + " " + contacts[i].surname;
        p2.innerText = "Birthday: " + contacts[i].birthday;

        contacts[i].element = div;
    }
 }

 var contactClass = document.getElementsByClassName("contact");
 console.log(contactClass);

for (let i = 0; i < contactClass.length; i++) {
    const element = contactClass[i];

    element.addEventListener(`contextmenu`, function(event)
    {
        remove(event, element);
    })
}

function remove(event, contactElement){
    event.preventDefault();
    console.log(contactClass)

    for (let i = 0; i < contacts.length; i++) {
        if (contactElement === contacts[i].element) {
            contacts.splice(i, 1);
        }
    }
    contactElement.remove();
}


function addContact(){
    var popUp = document.getElementById("popUp");
    popUp.setAttribute("style", "display: block");
}

var birthdayInput = document.getElementById("birthdayInput");

function submit(){

    var nameInput = document.getElementById("nameInput");
    var surnameInput = document.getElementById("surnameInput");

    var object ={
        name: nameInput.value,
        surname: surnameInput.value,
        birthday: birthdayInput.value
    }

    contacts.push(object)
    
    sort(sortType)

}


let showing = false;

function dropDown() {

    svg = document.getElementById("svg");
    path = document.getElementById("path");
    dropDownId = document.getElementById("drop-down");
 
    if (!showing) {
       dropDownId.classList.add("show")
       showing = true;
       svg.classList.remove("bi-arrow-up-short");
       svg.classList.add("bi-arrow-down-short");
       path.setAttribute("d", "M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4")
    }else{
       dropDownId.classList.remove("show")
       showing = false;
       svg.classList.remove("bi-arrow-down-short");
       svg.classList.add("bi-arrow-up-short");
       path.setAttribute("d", "M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5");
    }
 }



 function sort(sortType){
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
    }else if(sortType.innerText === "Age"){
        const date = new Date();

        let sorted = false;

        while(!sorted){
            sorted = true;

            for (let i = 0; i < contacts.length - 1; i++){

                const contact1 = new Date(contacts[i].birthday)
                const contact2 = new Date(contacts[i + 1].birthday)

                const difference1 = date.getFullYear() - contact1.getFullYear() + "" + (date.getMonth() - contact1.getMonth()) + "" + (date.getDate() - contact1.getDate())
                const difference2 = date.getFullYear() - contact2.getFullYear() + "" + (date.getMonth() - contact2.getMonth()) + "" + (date.getDate() - contact2.getDate())


                if(difference1 < difference2){
                    [contacts[i], contacts[i + 1]] = [contacts[i + 1], contacts[i]]
                    
                    sorted = false;
                }
            }
        }
    }else if(sortType.innerText === "Birthday"){

        let sorted = false;

        while (!sorted) {
            sorted = true;
    
            for (let i = 0; i < contacts.length - 1; i++) {
                const contact1 = new Date(contacts[i].birthday);
                const contact2 = new Date(contacts[i + 1].birthday);
    
                const daysUntil1 = daysTilBD(contact1);
                const daysUntil2 = daysTilBD(contact2);
    
                if (daysUntil1 > daysUntil2) {
                    [contacts[i], contacts[i + 1]] = [contacts[i + 1], contacts[i]];
                    sorted = false;
                }
            }
        }
    }

    writeContacts();
}


function daysTilBD(birthday){

    const today = new Date();
    const currentYear = today.getFullYear();
    let nextBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());

    if (nextBirthday < today) {
        nextBirthday.setFullYear(currentYear + 1);
    }

    const timeDifference = nextBirthday - today;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
}

var notifyIndex = [];
var notifyLength = 0; 

function notify(){

    for (let i = 0; i < contacts.length; i++) {
        const time = new Date(contacts[i].birthday)

        const timeLeft = daysTilBD(time);

        if(timeLeft < 12 && !notifyIndex.includes(contacts[i].name + contacts[i].surname + contacts[i].birthday)){
            console.log(contacts[i].name)

            alert(contacts[i].name + "-" + contacts[i].surname + "s birthday is in: " + timeLeft + " days")
            notifyIndex[notifyLength] = contacts[i].name + contacts[i].surname + contacts[i].birthday;
            notifyLength++;

        }
    }
}


setInterval(notify, 1000);


