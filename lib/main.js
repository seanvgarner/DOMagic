const DOMNodeCollection = require('./dom_node_collection.js');

const callbacks = [];
window.$l = function (arg) {

  if (typeof arg === "string") {

    const nodeList = document.querySelectorAll(arg);
    const nodeArray = Array.from(nodeList);
    return new DOMNodeCollection(nodeArray);

  } else if (arg instanceof HTMLElement) {

    return new DOMNodeCollection([arg]);

  } else if (arg instanceof Function) {

    if(document.readyState === 'complete') {
      arg();
    } else {
      callbacks.push(arg);
      if (callbacks.length === 1) {
        document.addEventListener("DOMContentLoaded", () => {
          callbacks.forEach(callback => callback());
        });
      }
    }
  }

};

window.$l.extend = function (...objs) {
  const firstObj = objs.shift();
  objs.forEach((obj) => {
    for(let prop in obj) {
      firstObj[prop] = obj[prop];
    }
  });
  return firstObj;
};

window.$l.ajax = function (options) {
  const defaults = {
    method: 'GET',
    url: window.location.href,
    success: function(response) {
      console.log(response);
    },
    error: function (error) {
      console.error(error);
    },
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  $l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(defaults.method, defaults.url);
  xhr.setRequestHeader("Content-type", defaults.contentType);

  xhr.onload = function () {
    if(xhr.status === 200) {
      defaults.success(JSON.parse(xhr.response));
    } else {
      defaults.error(xhr.response);
    }
  };

  xhr.send(defaults.data);
};

// $.ajax({
//   type: 'GET',
//   url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
//   success(data) {
//     console.log("We have your weather!")
//     console.log(data);
//   },
//   error() {
//     console.error("An error occurred.");
//   },
// });

// $l(function() {
//   console.log("first callback");
// });
//
// $l(function() {
//   console.log("second callback");
// });
//
// $l(function() {
//   console.log("YAY");
// });
