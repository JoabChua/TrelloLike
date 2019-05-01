var ColIdForNewCard;
var editCardObj;

// Http GET method to fetch data from db.json file
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
// Http POST method to add data from db.json file
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
// Http PUT method to update data from db.json file
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
// Http PATCH method to update data from db.json file
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
// Http DELETE method to delete data from db.json file
function httpDelete(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200)
            callback(xhr.responseText);
    }
    xhr.open("DELETE", url, true); // true for asynchronous 
    xhr.send(null);
}
// method to resize the columns based on device window height
function alertSize() {
    var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    }
        document.getElementsByClassName("canvas")[0].style.height = myHeight - 80 + 'px';
}
// method to toggle add another list input
function toggleInput() {
    var x = document.getElementById("togggleList");
    if (x.style.display === "none") {
        x.style.display = "grid";
    } else {
        x.style.display = "none";
    }
}
// method to toggle card content
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
// get column data from db.json
function getJSONCol() {
    httpGet('http://localhost:3000/columns', function(response) {
        col = JSON.parse(response);
        getJSONCard();
    });
}
// get card data from db.json
function getJSONCard() {
    httpGet('http://localhost:3000/cards', function(response) {
        cards = JSON.parse(response);
        setColCards();
    });
}
// delete selected card from db.json
function deleteCard(ev){
    httpDelete('http://localhost:3000/cards/' + ev, function(response) {
        getJSONCol();
    });
}
// edit selected card from db.json
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
// adding new card into db.json
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
        let numb = ColIdForNewCard;
        var data = `title=${title}&description=${description}&columnId=${numb}`;
        httpPost('http://localhost:3000/cards', data, function(response){
            getJSONCol();
            closeModal();
        })
    }
}
// adding new column to db.json
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
// deleting column from db.sjon
function deleteCol(ev){
    httpDelete('http://localhost:3000/columns/' + ev, function(response) {
        getJSONCol();
    });
}
// edit column data from db.json
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
// allow drop event for draggerable object
function allowDrop(ev) {
    ev.preventDefault();
}
// method to capture drag event when user drag a draggerable object
function drag(ev, id) {
    let idx = cards.findIndex(p => p.id == id);
    cardShift = cards[idx];
    dragDiff = ev.screenX;
}
// method to capture drop event when user drops draggable object
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
        // nth happens when distance between 2 columns are smaller than Math.abs(250)
    }
}
// intializing modal
function initModal() {
    var createModal = document.getElementById('createModal');
    var closeBtn = document.getElementsByClassName('closeBtn')[0];
    var closeBtn2 = document.getElementsByClassName('closeBtn2')[0];
    var editModal = document.getElementById('editModal');
    // add listener to modal 
    closeBtn.addEventListener('click', closeModal);
    closeBtn2.addEventListener('click', closeModal);
    window.addEventListener('click', clickOutside);
};

// opens create modal
function openModal(ev){
    ColIdForNewCard = ev;
    createModal.style.display = 'block';
}
// closes both create and edit modals
function closeModal(){
    createModal.style.display = 'none';
    editModal.style.display = 'none';
    document.getElementById('newCardTitle').value = "";
    document.getElementById('newCardDesc').value = "";
}
// method to capture click outside modal event to close modal.
function clickOutside(e){
    if (e.target == createModal || e.target == editModal){
        createModal.style.display = 'none';
        editModal.style.display = 'none';
    }
}
// open edit modal
function openEditModal(id){
    let idx = cards.findIndex(p => p.id == id);
    editCardObj = cards[idx];
    document.getElementById('editCardTitle').value = editCardObj.title;
    document.getElementById('editCardDesc').value = editCardObj.description;
    editModal.style.display = 'block';
}
