/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(elements) {
	    this.elements = elements;
	  }

	  html(string) {
	    if(typeof string === "string") {
	      this.elements.forEach((element) => {
	        element.innerHTML = string;
	      });
	    } else {
	      return this.elements[0].innerHTML;
	    }
	  }

	  empty() {
	    this.html("");
	  }

	  append(arg) {
	    if(arg instanceof DOMNodeCollection) {
	      this.elements.forEach((element) => {
	        arg.elements.forEach((child) => {
	          element.appendChild(child.cloneNode(true));
	        });
	      });
	    } else if (arg instanceof HTMLElement) {
	      this.elements.forEach((element) => {
	        element.appendChild(arg.cloneNode(true));
	      });
	    } else if (typeof arg === "string") {
	      this.elements.forEach((element) => {
	        element.innerHTML += arg;
	      });
	    }
	  }

	  attr(name, value) {
	    if(typeof value === "string") {
	      this.elements.forEach((element) => {
	        element.setAttribute(name, value);
	      });
	    } else {
	      return this.elements[0].getAttribute(name);
	    }
	  }

	  addClass(newClass) {
	    this.elements.forEach((element) => {
	      if (!element.className.split(" ").includes(newClass)) {
	        element.className += ` ${newClass}`;
	      }
	    });
	  }

	  removeClass(className) {
	    this.elements.forEach((element) => {
	      const currentClasses = element.className.split(" ");
	      const updatedClasses = [];

	      currentClasses.forEach((currentClass) => {
	        if (className !== currentClass ){
	          updatedClasses.push(currentClass);
	        }
	      });
	      element.className = updatedClasses.join(" ");
	    });
	  }

	  children() {
	    const childArray = [];
	    this.elements.forEach((element) => {
	      const children = Array.from(element.children);
	      childArray.push(...children);
	    });
	    return new DOMNodeCollection(childArray);
	  }

	  parent() {
	    const parents = [];
	    this.elements.forEach((element) => {
	      if(element.parentNode && !parents.includes(element.parentNode)) {
	        parents.push(element.parentNode);
	      }
	    });
	    return new DOMNodeCollection(parents);
	  }

	  find(selector) {
	    const allFound = [];
	    this.elements.forEach((element) => {
	      const found = element.querySelectorAll(selector);
	      allFound.push(...found);
	    });
	    return new DOMNodeCollection(allFound);
	  }

	  remove() {
	    this.elements.forEach((element) =>{
	      element.remove();
	    });

	    this.elements = [];
	  }

	  on(eventType, callback) {
	    this.elements.forEach((element) => {
	      element.addEventListener(eventType, callback);
	    });
	  }

	  off(eventType, callback) {
	    this.elements.forEach((element) => {
	      element.removeEventListener(eventType, callback);
	    });
	  }


	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);