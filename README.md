# mark
#### Safe unobtrusive JavaScript tracking system

```
npm install mark --save
```

## Usage

```js
var mark = require('mark')
var instance = mark() // Create instance
instance.mark(object) // Set uid
instance.marker(object) // Get uid
instance.unmark(object) // Delete uid
```

## Trackables
Any object or function can be tracked.

## Compatibility
Works in Node.js and modern (ES5) web browsers

## License
MIT
