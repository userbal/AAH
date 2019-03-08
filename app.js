
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

var updateAthlete = function (id, firstname, lastname, phone, creationDate, entries) {
  var data = "firstname=" + encodeURIComponent(firstname);
  data += "&lastname=" + encodeURIComponent(lastname);
  data += "&phone=" + encodeURIComponent(phone);
  data += "&creationDate=" + encodeURIComponent(phone);
  data += "&entries=" + encodeURIComponent(phone);

  fetch(`http://localhost:8080/Athletes/${id}`, {
    method: 'PUT',
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    console.log("Athlete Updated.");
    // refresh data
    getAthletes();
  });
};

var theButton = document.querySelector("#createAthleteButton");
theButton.onclick = function () {
    var firstname = first.value;
    var lastname = last.value;
    var phonenumber = phone.value;
  createAthlete(firstname, lastname, phonenumber);
};


var getAthletes = function () {
  fetch("http://localhost:8080/Athletes").then(function (response) {
    response.json().then(function (data) {

      AthleteList.innerHTML = "";

      data.forEach(function (athlete) { 
        // parent child structure: 
        // AthleteList -> AthleteListEntry -> infoBox -> infoBoxItem 
        //                                 -> buttonsBox -> buttonsBoxItem
        var AthleteListEntry = document.createElement("li");
        AthleteListEntry.className = "AthleteListEntry";
        var infoBox = document.createElement("div");
        infoBox.className = "infoBox";
        var buttonsBox = document.createElement("div");
        buttonsBox.className = "buttonsBox";

        //firstname
        var firstname = document.createElement("div");
        firstname.innerHTML = "FIRST: " + athlete.firstname;
        firstname.className = "infoBoxItem";
        infoBox.appendChild(firstname);

        //lastname
        var lastname = document.createElement("div");
        lastname.innerHTML = "LAST: " + athlete.lastname;
        lastname.className = "infoBoxItem";
        infoBox.appendChild(lastname);

        //phone
        var phone = document.createElement("div");
        phone.innerHTML = "PHONE: " + athlete.phone;
        phone.className = "infoBoxItem";
        infoBox.appendChild(phone);

        //entries
        var entries = document.createElement("div");
        entries.innerHTML = "ENTRIES: " + athlete.entries;
        entries.className = "infoBoxItem";
        infoBox.appendChild(entries);

        AthleteListEntry.appendChild(infoBox);


        var deleteButton = document.createElement("button");
        deleteButton.className = "buttonsBoxItem";
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function () {
          var proceed = confirm(`Do you want to delete ${athlete.name}?`);
          if (proceed) {
            deleteAthlete(athlete.id);
          }
        };
        buttonsBox.appendChild(deleteButton);

        var updateButton = document.createElement("button");
        updateButton.className = "buttonsBoxItem";
        updateButton.innerHTML = "Edit";

        updateButton.onclick = function () {
            //create
            var editFirstname = document.createElement("input"); 
            var editLastname = document.createElement("input"); 
            var editPhone = document.createElement("input"); 
            var editCreationDate = document.createElement("div"); 
            var editEntries = document.createElement("div"); 
            var updateBox = document.createElement("div"); 
            //add class
            editFirstname.className = "updateMembers";
            editLastname.className = "updateMembers";
            editPhone.className = "updateMembers";
            editCreationDate.className = "updateMembers";
            editEntries.className = "updateMembers";
            updateBox.className = "updateBox";
            //store values
            updateButton.innerHTML = "Save"
            editFirstname.value = athlete.firstname;
            editLastname.value = athlete.lastname;
            editPhone.value = athlete.phone;
            editCreationDate.innerHTML = athlete.creationDate;
            editEntries.innerHTML = athlete.entries;
            //append
            updateBox.appendChild(editFirstname);
            updateBox.appendChild(editLastname);
            updateBox.appendChild(editPhone);
            updateBox.appendChild(editCreationDate);
            updateBox.appendChild(editEntries);
            AthleteListEntry.appendChild(updateBox);

            updateButton.onclick = function () {
                AthleteListEntry.removeChild(updateBox);
                updateAthlete(athlete.id, editFirstname.value, editLastname.value, editPhone.value);
                //updateButton.innerHTML = "Edit"
            };
      };
        buttonsBox.appendChild(updateButton);

        AthleteListEntry.appendChild(buttonsBox);
         
        AthleteList.appendChild(AthleteListEntry);
   });
});
});
};

getAthletes()
