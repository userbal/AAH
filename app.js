
var createAthlete = function (firstname, lastname, phone) {
  var data = "firstname=" + encodeURIComponent(firstname);
  data += "&lastname=" + encodeURIComponent(lastname);
  data += "&phone=" + encodeURIComponent(phone);

  fetch("http://localhost:8080/Athletes", {
    method: 'POST',
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    console.log("Athlete saved.");
    // refresh data
  });
  getAthletes();
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

var updateAthlete = function (id, firstname, lastname, phone) {
  var data = "firstname=" + encodeURIComponent(firstname);
  var data = "lastname=" + encodeURIComponent(lastname);
  var data = "phone=" + encodeURIComponent(phone);

  fetch("http://localhost:8080/Athletes", {
    method: 'PUT',
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

var theButton = document.querySelector("#button");
theButton.onclick = function () {
    var firstname = first.value;
    var lastname = last.value;
    var phonenumber = phone.value;
  createAthlete(firstname, lastname, phonenumber);
};

var getAthletes = function () {
  idList.innerHTML = "";
  fetch("http://localhost:8080/Athletes").then(function (response) {
    response.json().then(function (data) {
      // save all of the data into a global variable (to use later)
      IDs = data;


      // add the athletes to the list
      data.forEach(function (athlete) { // for athletes in data
        var AthleteList = document.createElement("li");
        AthleteList.className = "AthleteList";
        var infoBox = document.createElement("div");
        infoBox.className = "infoBox";

        var nameDiv = document.createElement("div");
        nameDiv.innerHTML = athlete.firstname;
        nameDiv.className = "listItem";
        infoBox.appendChild(nameDiv);

        var nameDiv = document.createElement("div");
        nameDiv.innerHTML = athlete.lastname;
        nameDiv.className = "listItem";
        infoBox.appendChild(nameDiv);

        var nameDiv = document.createElement("div");
        nameDiv.innerHTML = athlete.phone;
        nameDiv.className = "listItem";
        infoBox.appendChild(nameDiv);

        AthleteList.appendChild(infoBox);

        var buttonsBox = document.createElement("div");
        buttonsBox.className = "buttonsBox";

        var deleteButton = document.createElement("button");
        deleteButton.className = "listButton";
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function () {
          var proceed = confirm(`Do you want to delete ${athlete.name}?`);
          if (proceed) {
            deleteAthlete(athlete.id);
          }
        };
        buttonsBox.appendChild(deleteButton);

        var updateButton = document.createElement("button");
        updateButton.className = "listButton";
        updateButton.innerHTML = "Edit";
        updateButton.onclick = function () {
        updateAthlete(athlete.id, firstname, lastname, phone);
        };
        buttonsBox.appendChild(updateButton);

        AthleteList.appendChild(buttonsBox);
      
          
        idList.appendChild(AthleteList);
      });
   });
});
};

// load data
getAthletes()
