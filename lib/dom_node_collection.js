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
