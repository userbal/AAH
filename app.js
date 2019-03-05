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

var createAthlete = function (name) {
  var data = "name=" + encodeURIComponent(name);

  fetch("http://localhost:8080/Athletes", {
    method: 'POST',
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    console.log("Athlete saved.");
    // refresh data
    getAthletes();
  });
};

var deleteAthlete = function (id) {
  fetch(`http://localhost:8080/Athletes/${id}`, {
    method: 'DELETE'
  }).then(function (response) {
    console.log("Athlete deleted.");
    // refresh data
    getAthletes()
  });
};

var theButton = document.querySelector("#button");
theButton.onclick = function () {
    var name = first.value;
    name += last.value;
  createAthlete(name);
};

var getAthletes = function () {
  idList.innerHTML = "";
  fetch("http://localhost:8080/Athletes").then(function (response) {
    response.json().then(function (data) {
      // save all of the data into a global variable (to use later)
      IDs = data;


      // add the athletes to the list
      data.forEach(function (athlete) { // for athletes in data
        var newItem = document.createElement("li");

        var nameDiv = document.createElement("div");
        nameDiv.innerHTML = athlete.name;
        nameDiv.className = "athlete-name";
        newItem.appendChild(nameDiv);
      
        idList.appendChild(newItem);
      });
   });
});
};

// load data
getAthletes()
