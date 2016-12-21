const DOMNodeCollection = require('./dom_node_collection.js');
const $DOMagic = require('./dom_manipulator');


$DOMagic(() => {
  $DOMagic.ajax({
    type: 'GET',
    url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
    success(data) {
      console.log("We have your weather!");
      console.log(data);
    },
    error() {
      console.error("An error occurred.");
    },
  });

  $DOMagic("li").on("click", function(e) {
    const targetText = $DOMagic(e.currentTarget).html();
    alert("You clicked " + targetText + ". Magic! (Also, checkout the AJAX request in the console!)");
  });

  $DOMagic(".hide-btn").on("click", function(e) {
    $DOMagic(".food-list").addClass("hidden");
  });

  $DOMagic(".show-btn").on("click", function(e) {
    $DOMagic(".food-list").removeClass("hidden");
  });

  $DOMagic(".append-btn").on("click", function(e) {
    const appendable = $DOMagic(".appendable");
    $DOMagic(".carbs").append(appendable);
  });

});
// Sample ajax request to run in chrome console to test ajax.
