var lunchPlaces = null;

// let's make an event
var theButton = document.querySelector("#the-button");
console.log("the button is", theButton);
theButton.onclick = function () {
  // add an item to the list when the button is clicked
  var theList = document.querySelector("#the-list");
  console.log("the list is", theList);

  var nameInput = document.querySelector("#name");
  var lunchVenueInput = document.querySelector("#lunch-venue");
  console.log("the input is", lunchVenueInput);

  var newItem = document.createElement("li");
  newItem.innerHTML = nameInput.value + " wants to eat at " + lunchVenueInput.value;
  theList.appendChild(newItem);
};

fetch("https://api.myjson.com/bins/z1lsc").then(function (response) {
  response.json().then(function (data) {
    // save all of the data into a global variable (to use later)
    lunchPlaces = data;

    // data is an array of string values
    var suggestionsList = document.querySelector("#suggestions");

    // add the restaurants to the suggestions list
    data.forEach(function (restaurant) { // for restaurant in data
      var newItem = document.createElement("li");
      newItem.innerHTML = restaurant;
      newItem.className = "restaurant";
      suggestionsList.appendChild(newItem);
    });
  });
});

