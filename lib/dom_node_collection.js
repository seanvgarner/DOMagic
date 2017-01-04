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
      element.classList.add(newClass);
    });
  }

  removeClass(className) {
    this.elements.forEach((element) => {
      element.classList.remove(className);
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
      const eventKey = `DOMagicEvents-${eventType}`;
      if (typeof element[eventKey] === "undefined") {
        element[eventKey] = [];
      }
      element[eventKey].push(callback);
    });
  }

  off(eventType) {
    this.elements.forEach((element) => {
      const eventKey = `DOMagicEvents-${eventType}`;

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
