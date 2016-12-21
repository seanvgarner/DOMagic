const DOMNodeCollection = require('./dom_node_collection');

const _callbacks = [];
const $DOMagic = function (argument) {
  if (argument === window ) {
    return new DOMNodeCollection([window]);
  }

  if (argument instanceof Function) {

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
  } else if (typeof argument === "string") {

    const nodeList = document.querySelectorAll(argument);
    const nodeArray = Array.from(nodeList);
    return new DOMNodeCollection(nodeArray);

  } else if (argument instanceof HTMLElement) {
    return new DOMNodeCollection([argument]);

  }

};

$DOMagic.extend = function (...objs) {
  const firstObj = objs.shift();
  objs.forEach((obj) => {
    for(let prop in obj){
      firstObj[prop] = obj[prop];
    }
  });
  return firstObj;
};

$DOMagic.ajax = function (options) {
  const xhr = new XMLHttpRequest();
  const defaults = {
    method: 'GET',
    url: "",
    success: function() {},
    error: function (error) {},
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  options = $DOMagic.extend(defaults, options);
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

module.exports = $DOMagic;
