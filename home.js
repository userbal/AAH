var theButton = document.querySelector("#button");
theButton.onclick = function () {
    var search = document.querySelector("#search");
    search = search.value;
  getAthletesSearch(search);
};

var getAthletesSearch = function (search) {
  idList.innerHTML = "";
  fetch(`http://localhost:8080/Search/${search}`).then(function (response) {
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
