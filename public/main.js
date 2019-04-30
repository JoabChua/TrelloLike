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
    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
    }
    // data = JSON.stringify(data);
    http.send(data);
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
