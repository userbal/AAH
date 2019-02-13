var First = document.querySelector("#first");
var Last = document.querySelector("#last");
var body = document.querySelector("body");
var inputcolor = document.querySelector("input::placeholder")

var theme = document.querySelector("#theme");
theme.onclick = function () {
    if (theme.innerHTML == "Dark Mode"){
    body.style.background = "black"
    body.style.color = "white"
    theme.innerHTML = "Light Mode"
    button.style.color = "white"
    inputcolor.style.color = "white"
    
    }
    else{
    button.style.color = "black"
    body.style.background = "white"
    body.style.color = "black"
    console.log("theme");
    theme.innerHTML = "Dark Mode"
    inputcolor.style.color = "black"
    }
};

// let's make an event
var theButton = document.querySelector("#button");
theButton.onclick = function () {
    console.log(First.value)
    console.log(Last.value)
    if (First != "" && Last != ""){
  var data = "name=" + encodeURIComponent(First.value + Last.value);

  fetch("http://localhost:8080/Athletes", {
    method: 'POST',
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    console.log("student saved.");
    getStuff()
  });
  }
};

function getStuff(){
    fetch("http://localhost:8080/Athletes").then(function (response) {
      response.json().then(function (data) {
        // save all of the data into a global variable (to use later)
        IDs = data;

        // data is an array of string values
        var idList = document.querySelector("#idList");

        // add the restaurants to the suggestions list
          idList.innerHTML = "";
          data.forEach(function (id) { // for restaurant in data
          var newItem = document.createElement("li");
          newItem.innerHTML = id;
          newItem.className = "idList";
          idList.appendChild(newItem);
        });
      });
    });
}
getStuff()
