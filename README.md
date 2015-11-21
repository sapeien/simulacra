# Simulacra.js

[![Build Status](https://img.shields.io/travis/0x8890/simulacra/master.svg?style=flat-square)](https://travis-ci.org/0x8890/simulacra)
[![npm Version](https://img.shields.io/npm/v/simulacra.svg?style=flat-square)](https://www.npmjs.com/package/simulacra)
[![License](https://img.shields.io/npm/l/simulacra.svg?style=flat-square)](https://raw.githubusercontent.com/0x8890/simulacra/master/LICENSE)

Simulacra.js provides one-way data binding from plain JavaScript objects to the DOM. Its size is roughly ~160 LOC, or 1.4 KB (min+gz). Get it from `npm`:

```sh
$ npm install simulacra --save
```


## Usage

Here's a sample template, note that it's just a `<template>` tag without any data-binding attributes, it's just plain HTML:

```html
<template id="product">
  <h1 class="name"></h1>
  <ul class="details">
    <li>Size: <span class="size"></span></li>
    <li>Vendor: <span class="vendor"></span></li>
  </ul>
</template>
```

In the above template, there are no iteration mechanisms, because Simulacra.js will automatically clone DOM elements based on the data. Here's some sample data:

```js
var data = {
  name: 'Pumpkin Spice Latte',
  details: {
    size: [ 'Tall', 'Grande', 'Venti' ],
    vendor: 'Starbucks'
  }
}
```

Simulacra.js exports only a single function, which does different things based on the types of the arguments. There are 3 use cases: defining mount/unmount functions for an element, defining nested bindings for an element, and defining a binding for a data object.

```js
var σ = require('simulacra')
var τ = function (s) { return fragment.querySelector(s) }

var fragment = document.getElementById('#product').content
var bindings = σ(fragment, {
  name: σ(τ('.name'), function (node, value) {
    node.textContent = value + '!'
  }),
  details: σ(τ('.details'), {
    size: σ(τ('.size')),
    color: σ(τ('.color'))
  })
})

document.appendChild(σ(data, bindings))
```

The DOM will update if any of the bound data keys are assigned. All mount functions are "offline" operations, they mutate elements which exist only in memory.


## How it Works

On initialization, Simulacra.js removes bound elements from the document and replaces them with a empty text node (marker) for memoizing its position. Based on a key value, it clones template elements and applies the DOM operations on the cloned elements, and appends them next to the marker.


## Caveats

The DOM will update *if and only if* there is an assignment on the object, since it uses a property setter under the hood. This means that using the `delete` keyword will not trigger a DOM update. Also, arrays need to be assigned after a mutation, even if it is mutated in place.


## Under the Hood

This library is written in ES5 syntactically, and makes use of:

- Object property getters & setters (ES5)
- WeakMap (ES6)
- DocumentFragment (DOM Level 1)
- TreeWalker (DOM Level 2)
- Node.isEqualNode (DOM Level 3)
- Node.contains (DOM Living Standard)

No polyfills are included.


## License

This software is licensed under the MIT License.
