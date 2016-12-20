const DOMNodeCollection = require('./dom_node_collection.js');

const _callbacks = [];
window.$s = function (argument) {

  if (typeof argument === "string") {

    const nodeList = document.querySelectorAll(argument);
    const nodeArray = Array.from(nodeList);
    return new DOMNodeCollection(nodeArray);

  } else if (argument instanceof HTMLElement) {
    return new DOMNodeCollection([argument]);

  } else if (argument instanceof Function) {

    if(document.readyState === 'complete') {
      argument();
    } else {
      _callbacks.push(argument);
      if (_callbacks.length === 1) {
        document.addEventListener("DOMContentLoaded", () => {
          _callbacks.forEach(callback => callback());
        });
      }
    }
  }

};

window.$s.extend = function (...objs) {
  const firstObj = objs.shift();
  objs.forEach((obj) => {
    for(let prop in obj){
      firstObj[prop] = obj[prop];
    }
  });
  return firstObj;
};

window.$s.ajax = function (options) {
  const xhr = new XMLHttpRequest();
  const defaults = {
    method: 'GET',
    url: "",
    success: function() {},
    error: function (error) {},
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  options = $s.extend(defaults, options);
  options.method = options.method.toUpperCase();

  xhr.open(options.method, options.url);
  xhr.setRequestHeader("Content-type", options.contentType);

  xhr.onload = function () {
    if(xhr.status === 200) {
      options.success(xhr.response);
    } else {
      options.error(xhr.response);
    }
  };

  xhr.send(JSON.stringify(options.data));
};


// Sample ajax request to run in chrome console to test ajax.
// $s.ajax({
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
