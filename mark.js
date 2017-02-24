!function(root, name, make) {
  if (typeof module != 'undefined' && module.exports) module.exports = make()
  else root[name] = make()
}(this, 'mark', function() {

  var stamp = Date.now()
  var count = incrementer(0)
  var model = mark.prototype

  function incrementer(uid) {
    return function() {
      return ++uid
    }
  }

  function set(object, key, details) {
    Object.defineProperty(object, key, details)
    return details.value
  }

  function has(object, key) {
    return object.hasOwnProperty(key)
  }

  function mark() {
    var instance = this instanceof mark ? this : new mark
    has(instance, 'uid') || set(instance, 'uid', {
      get: incrementer(0)
    })
    has(instance, 'key') || set(instance, 'key', {
      value: 'mark-' + stamp + '-instance-' + count()
    })
    return instance
  }

  function isMark(object) {
    return object instanceof mark
  }

  function isMarkable(object) {
    return object === Object(object)
  }

  model.marker = function(object) {
    if (!isMark(this)) throw new Error('this')
    return object[this.key]
  }

  model.mark = function(object) {
    if (!isMark(this)) throw new Error('this')
    if (!isMarkable(object)) throw new Error('unmarkable')
    return this.marker(object) || set(object, this.key, {
      configurable: true,
      value: this.uid
    })
  }

  model.unmark = function(object) {
    if (!isMark(this)) throw new Error('this')
    delete object[this.key]
  }

  return mark
});
