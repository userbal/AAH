
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
  console.log("started delete");
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
        nameDiv.className = "listItem";
        newItem.appendChild(nameDiv);
      
        var deleteButton = document.createElement("button");
        deleteButton.className = "listButton";
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function () {
          var proceed = confirm(`Do you want to delete ${athlete.name}?`);
          if (proceed) {
            deleteAthlete(athlete.id);
          }
        };
        newItem.appendChild(deleteButton);
          
        idList.appendChild(newItem);
      });
   });
});
};

// load data
getAthletes()
