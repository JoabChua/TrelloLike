var http = new XMLHttpRequest();

function httpGet(url, callback)
{
    http.open('GET', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
    }
    http.send(null);

    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.onreadystatechange = function() { 
    //     if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    //         callback(xmlHttp.responseText);
    // }
    // xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    // xmlHttp.send(null);
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

function httpDelete(url, callback) {
    // var xhr = new XMLHttpRequest();
    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //         callback();
    //     }
    // });
    // xhr.open("DELETE", url);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // xhr.send(null);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("DELETE", url, true); // true for asynchronous 
    xmlHttp.send(null);
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

// function openModal(){
//     var modal = document.getElementById('myModal');

//     // Get the button that opens the modal
//     var btn = document.getElementById("myBtn");

//     // Get the <span> element that closes the modal
//     var span = document.getElementsByClassName("close")[0];

//     // When the user clicks on the button, open the modal 
//     btn.onclick = function() {
//         modal.style.display = "block";
//     }

//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function() {
//         modal.style.display = "none";
//     }

//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }
// }