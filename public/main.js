var http = new XMLHttpRequest();
var newCardColId;
var editCardObj;

function httpGet(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function (responseText) {
        if (this.readyState === 4) {
            callback(this.responseText);
        }
    });
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(null);
}

function httpPost(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function (responseText) {
        if (this.readyState === 4) {
            callback(JSON.parse(this.responseText));
        }
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
}

function httpPut(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function (responseText) {
        if (this.readyState === 4) {
            callback(JSON.parse(this.responseText));
        }
    });

    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
}

function httpPatch(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function (responseText) {
        if (this.readyState === 4) {
            callback(JSON.parse(this.responseText));
        }
    });

    xhr.open("PATCH", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
}

function httpDelete(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200)
            callback(xhr.responseText);
    }
    xhr.open("DELETE", url, true); // true for asynchronous 
    xhr.send(null);
}

function alertSize() {
    var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    }
        document.getElementsByClassName("canvas")[0].style.height = myHeight - 80 + 'px';
}

function toggleInput() {
    var x = document.getElementById("togggleList");
    if (x.style.display === "none") {
        x.style.display = "grid";
    } else {
        x.style.display = "none";
    }
}

function dropdownContent(){
    var acc = document.getElementsByClassName("card-title");
    var i;
    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
    });
    }
}

function getJSONCol() {
    httpGet('http://localhost:3000/columns', function(response) {
        col = JSON.parse(response);
        getJSONCard();
    });
}

function getJSONCard() {
    httpGet('http://localhost:3000/cards', function(response) {
        cards = JSON.parse(response);
        setColCards();
    });
}

function deleteCard(ev){
    httpDelete('http://localhost:3000/cards/' + ev, function(response) {
        getJSONCol();
    });
}

function editCard(){
    let title = document.getElementById('editCardTitle').value;
    let description = document.getElementById('editCardDesc').value;
    if (title == ""){
        alert("Error! Please do not leave title blank");
    } else {
        let numb = editCardObj.columnId;
        var data = `title=${title}&description=${description}&columnId=${numb}`;
        httpPut('http://localhost:3000/cards/' + editCardObj.id, data, function(response){
            getJSONCol();
            closeModal();
        })
    }
}
function newCard(){
    let title = document.getElementById('newCardTitle').value;
    let description = document.getElementById('newCardDesc').value;
    let checkDuplicateTitle = false;
    for (var i = 0 ; i < cards.length; i++){
        if (title == cards[i].title){
            checkDuplicateTitle = true;
        }
    }
    if (title == ""){
        alert("Error! Please do not leave title blank");
    } else if (checkDuplicateTitle) {
        alert("Error! Duplicate Card Title");
    } else {
        let numb = newCardColId;
        var data = `title=${title}&description=${description}&columnId=${numb}`;
        httpPost('http://localhost:3000/cards', data, function(response){
            getJSONCol();
            closeModal();
        })
    }
}

function newList(ev){
    if (ev.keyCode === 13 || ev.type == "click") {
        var title = document.getElementById('newlist').value;
        let checkDuplicateTitle = false;
        for( var i = 0; i < col.length; i++){
            if(title == col[i].title){
                checkDuplicateTitle = true;
            }
        }
        if (title == "") {
            alert('Title cannot be empty string!');
        } else if (checkDuplicateTitle) {
            alert('Error! Duplicate Column title!');
        } else {
            var data = `title=${title}`;
            httpPost('http://localhost:3000/columns', data, function(response){
                getJSONCol();
            })
        }
    }
}

function deleteCol(ev){
    httpDelete('http://localhost:3000/columns/' + ev, function(response) {
        getJSONCol();
    });
}

function editCol(ev){
    var title = prompt("Edit Column Name:",col[ev-1].title);
    if (title == null){
        // nth happens
    } else {
        let numb = ev
        var data = `title=${title}`;
        httpPut('http://localhost:3000/columns/' + ev, data, function(response){
            getJSONCol();
        })
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, id) {
    let idx = cards.findIndex(p => p.id == id);
    cardShift = cards[idx];
    dragDiff = ev.screenX;
}

function drop(ev) {
    dropDiff = ev.screenX;
    let diff = (dragDiff - dropDiff);
    let numOfCol = Math.round(Math.abs(dragDiff - dropDiff) / 300)
    if (diff > 250){
        finalCol = (parseInt(cardShift.columnId) - numOfCol).toString();
        cardId = cardShift.id;
        var data = `columnId=${finalCol}`;
        httpPatch('http://localhost:3000/cards/' + cardId, data, function(response){
            getJSONCol();
        });
    } else if (diff < -250){
        finalCol = (parseInt(cardShift.columnId) + numOfCol).toString();
        cardId = cardShift.id;
        var data = `columnId=${finalCol}`;
        httpPatch('http://localhost:3000/cards/' + cardId, data, function(response){
            getJSONCol();
        });
    } else {
        // nth happens
    }
}

var createModal = document.getElementById('createModal');
var modalBtn = document.getElementById('modalBtn');
var closeBtn = document.getElementsByClassName('closeBtn')[0];
var closeBtn2 = document.getElementsByClassName('closeBtn2')[0];
var editModal = document.getElementById('editModal');

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
closeBtn2.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside);

function openModal(ev){
    newCardColId = ev;
    createModal.style.display = 'block';
}

function closeModal(){
    createModal.style.display = 'none';
    editModal.style.display = 'none';
    document.getElementById('newCardTitle').value = "";
    document.getElementById('newCardDesc').value = "";
}

function clickOutside(e){
    if (e.target == createModal || e.target == editModal){
        createModal.style.display = 'none';
        editModal.style.display = 'none';
    }
}

function openEditModal(id){
    let idx = cards.findIndex(p => p.id == id);
    editCardObj = cards[idx];
    document.getElementById('editCardTitle').value = editCardObj.title;
    document.getElementById('editCardDesc').value = editCardObj.description;
    editModal.style.display = 'block';
}