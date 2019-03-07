var First = document.querySelector("#first");
var Last = document.querySelector("#last");
var body = document.querySelector("body");

var theme = document.querySelector("#theme");
theme.onclick = function () {
    if (theme.innerHTML == "Dark Mode"){
    body.style.background = "black"
    body.style.color = "white"
    theme.innerHTML = "Light Mode"
    button.style.color = "white"
    
    }
    else{
    button.style.color = "black"
    body.style.background = "white"
    body.style.color = "black"
    console.log("theme");
    theme.innerHTML = "Dark Mode"
    }
};

var createRestaurant = function (name) {
  var data = "name=" + encodeURIComponent(name);

  fetch("http://localhost:8080/Athletes", {
    method: 'POST',
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    console.log("Athlete saved.");
    // load the new list of restaurants!
    getAthletes();
  });
};


var theButton = document.querySelector("#button");
theButton.onclick = function () {
    console.log(First.value)
    console.log(Last.value)


function getAthletes(){
    fetch("http://localhost:8080/athletes").then(function (response) {
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
getAthletes()
