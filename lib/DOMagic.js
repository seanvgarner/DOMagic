/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);
	const $DOMagic = __webpack_require__(2);
	
	
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
	
	  append(content) {
	    if(content instanceof DOMNodeCollection) {
	      this.elements.forEach((element) => {
	        content.elements.forEach((child) => {
	          element.appendChild(child.cloneNode(true));
	        });
	      });
	    } else if (content instanceof HTMLElement) {
	      this.elements.forEach((element) => {
	        element.appendChild(content.cloneNode(true));
	      });
	    } else if (typeof content === "string") {
	      this.elements.forEach((element) => {
	        element.innerHTML += content;
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
	      const eventKey = `SQueryEvents-${eventType}`;
	      if (typeof element[eventKey] === "undefined") {
	        element[eventKey] = [];
	      }
	      element[eventKey].push(callback);
	    });
	  }
	
	  off(eventType) {
	    this.elements.forEach((element) => {
	      const eventKey = `SQueryEvents-${eventType}`;
	
	      if (element[eventKey]) {
	        element[eventKey].forEach(callback => {
	          element.removeEventListener(eventType, callback);
	        });
	      }
	
	      element[eventKey] = [];
	    });
	  }
	
	
	}
	
	module.exports = DOMNodeCollection;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=DOMagic.js.map