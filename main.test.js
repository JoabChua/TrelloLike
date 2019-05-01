var mockData = {
    "columns": [
      {
        "title": "Column 1",
        "id": 1
      },
      {
        "title": "Column 2",
        "id": 2
      }
    ],
    "cards": [
      {
        "id": 1,
        "title": "Card 1",
        "description": "Nulla porttitor erat a sollicitudin volutpat.",
        "columnId": "1"
      },
      {
        "id": 2,
        "title": "Card 2",
        "description": "Quisque id scelerisque felis, sit amet scelerisque nunc.",
        "columnId": "2"
      },
      {
        "id": 3,
        "title": "Card 3",
        "description": "Quisque id scelerisque felis, sit amet scelerisque nunc.",
        "columnId": "2"
      }
    ]
  };
// Http GET method to fetch data from db.json file
function httpGet(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function (responseText) {
        return this.responseText;
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
    var modalBtn = document.getElementById('modalBtn');
    var closeBtn = document.getElementsByClassName('closeBtn')[0];
    var closeBtn2 = document.getElementsByClassName('closeBtn2')[0];
    var editModal = document.getElementById('editModal');
    // add listener to modal 
    modalBtn.addEventListener('click', openModal);
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
// dummy test for jest
function testJest(x){
    return x;
}
// method to resize the columns based on device window height
function alertSize() {
    var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    }
        return myHeight - 80 + 'px';
}
// adding new card into db.json
function newCard(inputTitle,desc,colId){
    if (inputTitle == ""){
        return null
    } else {
        var data = `title=${inputTitle}&description=${desc}&columnId=${colId}`;
        return data;
    }
}
// edit selected card from db.json
function editCard(editedTitle, desc, colId){
    if (editedTitle == ""){
        return null;
    } else {
        var data = `title=${editedTitle}&description=${desc}&columnId=${colId}`;
        return data;
    }
}
// adding new column to db.json
function newCol(listTitle){
        if (listTitle == "") {
            return null;
        } else {
            let data = `title=${listTitle}`;
            return data;
        }
}
// edit column data from db.json
function editCol(editTitle,colId){
    if (editTitle == ""){
        return null;
    } else {
        let data = `title=${editTitle}id=${colId}`;
        return data;
    }
}
// get column data from mockData.
function getJSONCol() {
    let colData = mockData.columns;
    return colData;
}
// deleting column from db.sjon
function deleteCol(){
    let colData = mockData.columns;
    colData = colData.slice(0, colData.length-1)
    return colData;
}
// get card data from db.json
function getJSONCard() {
    let cardData = mockData.cards;
    return cardData;
}
// delete selected card from db.json
function deleteCard(){
    let cardData = mockData.cards;
    cardData = cardData.slice(0, cardData.length-1)
    return cardData;
}

/***********************************************************/
/********************* JEST TEST CASES *********************/
/***********************************************************/
test('test if jest is working', () => {
    const id = 8;
    expect(testJest(id)).toEqual(8);
});
test('if HttpGet fns exists', () => {
    expect(typeof httpGet).toEqual('function');
});
test('test alertsize function works!', () => {
    let height = window.innerHeight;
    height = height - 80 + 'px';
    expect(alertSize()).toEqual(height);
});
test('test newCard function works!', () => {
    const title = "testingtitle";
    const description = "testingdesc"
    const colId = 1;
    let expectData = `title=${title}&description=${description}&columnId=${colId}`;
    expect(newCard(title,description,colId)).toEqual(expectData);
});
test('test newCard Error works!', () => {
    const title = "";
    const description = "testingdesc"
    const colId = 1;
    let expectData = null;
    expect(newCard(title,description,colId)).toEqual(expectData);
});
test('test editCard function works!', () => {
    const title = "testingtitle";
    const description = "testingdesc"
    const colId = 1;
    let expectData = `title=${title}&description=${description}&columnId=${colId}`;
    expect(editCard(title,description,colId)).toEqual(expectData);
});
test('test editCard Error works!', () => {
    const title = "";
    const description = "testingdesc"
    const colId = 1;
    let expectData = null;
    expect(editCard(title,description,colId)).toEqual(expectData);
});
test('test newList function works!', () => {
    const title = "testingtitle";
    let expectData = `title=${title}`;
    expect(newCol(title)).toEqual(expectData);
});
test('test newList Error works!', () => {
    const title = "";
    let expectData = null;
    expect(newCol(title)).toEqual(expectData);
});
test('test editList function works!', () => {
    const title = "testingtitle";
    const colId = 1;
    let expectData = `title=${title}id=${colId}`;
    expect(editCol(title,colId)).toEqual(expectData);
});
test('test editList Error works!', () => {
    const title = "";
    const colId = 1;
    let expectData = null;
    expect(editCol(title,colId)).toEqual(expectData);
});
test('test getJSONCol function works!', () => {
    expect(getJSONCol().length).toEqual(2);
});
test('test getJSONCard function works!', () => {
    expect(getJSONCard().length).toEqual(3);
});
test('test deleteCol function works!', () => {
    expect(deleteCol().length).toEqual(1);
});
test('test deleteCard function works!', () => {
    expect(deleteCard().length).toEqual(2);
});
