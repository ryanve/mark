[marker](https://github.com/ryanve/marker)
======

safe simple tracking for elements / objects / functions


```
$ npm install mark
```

### usage

```js
marker(item)        // add/get marker ( returns integer uid, or undefined if untrackable )
marker(item, false) // delete marker
````

### trackable items

- **functions** ( marker uids get added as props )
- **objects**
  - DOM nodes that implement .getAttribute/.setAttribute
  - window | document | native prototypes ( handled safely, untouched )
  - other truthy objects ( marker uids get added as props )
