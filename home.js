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
        nameDiv.innerHTML = athlete.firstname;
        nameDiv.className = "listItem";
        newItem.appendChild(nameDiv);
      
        var nameDiv = document.createElement("div");
        nameDiv.innerHTML = athlete.lastname;
        nameDiv.className = "listItem";
        newItem.appendChild(nameDiv);
          
        var nameDiv = document.createElement("div");
        nameDiv.innerHTML = athlete.phone;
        nameDiv.className = "listItem";
        newItem.appendChild(nameDiv);

        idList.appendChild(newItem);
      });
   });
});
};
