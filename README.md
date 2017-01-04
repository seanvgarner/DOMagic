## DOMagic

This wizardry is an original take on a classic DOM
manipulation library. Features include event handling, node manipulation, a
document ready queue, and AJAX requests.

### How to Test

Click this [link]('http://sean-garner.co/DOMagic') to a very simple demonstration of DOMagic. From there you can see simple examples of $DOMagic methods put to use. For more info on available methods, see below:

### Methods

#### $DOMagic
#####   - Retrieves DOM nodes from the page
#####   - Queues functions to be executed once the document is ready

```javascript

// $DOMagic('tag') or $DOMagic('.class')  (CSS selectors) will gather all of the matching nodes on the DOM and create a new DOMNodeCollection object, employing Javascript's native querySelectorAll() function. Once these nodes are wrapped in a DOMNodeCollection object, they gain access to some built in methods.

  const $foodUl = $DOMagic(".food-list");

// If the argument passed to $DOMagic is a function, will push the callback function into a queue to be executed on when the document is fully loaded.

$DOMagic( () => {
  const $hideBtn = $DOMagic(".hide-btn");
  $hideBtn.on("click", function(){
    $DOMagic(".food-list").addClass("hidden");
  });

});

```

### Methods for DOM manipulation

#### html()
  * Takes an optional argument of a string.
  * If there is an argument, then the method makes that string the `innerHTML` of each node.
  * If there is no argument, then the method returns the innerHTML of the first node.

  ```javascript

  $DOMagic("h4").html(`A New Title`);

  ```

#### empty()
  * Sets all of the nodes in the collection to have an empty innerHTML.

#### append()
  * Adds the `outerHTML` of each element in argument to `innerHTML` of each element in the node collection

#### attr()
  * Takes one or two arguments
  * If one argument, the method returns the value of that attribute for the first node in the collection
  * If two arguments, the method sets the attribute (the first argument) to the value (second argument) for every node in the collection.

#### addClass(args)
  * Takes a class as an argument and adds that class to each node in the collection if it does not already exist.

#### removeClass(args)
  * Takes a class as an argument and removes that class to each node in the collection.

### Additional functionality:

#### Event Handling:
##### on()

Takes an event type ('click', 'keydown', etc) as a string as its first argument and a callback, and adds a listener for that type of event on each node in the DOMNodeCollection, employing  Javascript's native `addEventListener` function.

```javascript
  const $li = $DOMagic("li");
  $li.on("click", function(e) {
    const targetText = $DOMagic(e.currentTarget).html();
    alert("You clicked on " + targetText );
  });
```

##### off()

Takes an event type as a string, and removes that event listener from each node in the DOMNodeCollection, employing  Javascript's native `removeEventListener` function.

#### AJAX Requests:

AJAX method takes an options hash (set of key/value pairs) and uses
the XMLHttpRequest API to send and receive data from a server.
