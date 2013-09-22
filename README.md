[mark](../../)
======

Safe simple tracking for elements / objects / functions.

```
$ npm install mark
```

## Usage

```js
marker(item) // Add/get marker (returns integer uid, or undefined if untrackable)
marker(item, false) // delete marker
```

## Trackable Items

- DOM nodes that implement .getAttribute/.setAttribute
- window | document | native prototypes (handled safely, untouched)
- Functions | Objects | Arrays (marker uid gets added as prop)

## [MIT License](http://en.wikipedia.org/wiki/MIT_License)

Copyright (C) 2013 by [Ryan Van Etten](https://github.com/ryanve)