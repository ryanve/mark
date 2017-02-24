!function(root) {
  var common = typeof module != 'undefined' && !!module.exports
  var mark = common ? require('./') : root.mark
  var doc = typeof document != 'undefined' && document
  var sole = typeof console != 'undefined' && console
  var docElem = doc.documentElement
  var plain = {}
  var array = []
  var noop = function() {}
  var ctor = Object
  var boxed = ctor(false)
  var proto = ctor.prototype
  var subjects = [plain, array, mark, noop, arguments, ctor, boxed, proto]
  doc && subjects.push(doc, docElem, doc.createTextNode(''), doc.createElement('a'))

  function status(message) {
    if (doc && doc.querySelector) doc.querySelector('[data-status]').innerHTML = message
  }

  function ok(name, test) {
    if (!test) {
      status('Failure @ ' + name)
      throw new Error('Fail: ' + name)
    } else if (sole) {
      sole.log('Ok: ' + name)
    }
  }

  ok('instance', mark() instanceof mark && mark() !== mark())
  ok('key', mark().key !== mark().key)
  ok('keys-instance', Object.keys(mark()).length === 0)
  ok('keys-static', Object.keys(mark).length === 0)

  ok('uid', function() {
    var instance = mark()
    return instance.uid === 1 && instance.uid === 2
  })

  ok('mark.mark', subjects.every(function(o) {
    return this.mark(o) > 0
  }, mark()))

  ok('mark.mark', subjects.every(function(o) {
    return this.mark(o) > 0
  }, mark()))

  ok('unobtrusive', subjects.every(function(o) {
    this.mark(o)
    return !o.propertyIsEnumerable(this.key)
  }, mark()))

  ok('mark.unmark', subjects.every(function(o) {
    this.mark(o)
    this.unmark(o)
    return !this.marker(o) && !o.hasOwnProperty(this.key)
  }, mark()))

  ok('mark.marker',  subjects.every(function(o) {
    var n = this.marker(o) || this.mark(o)
    return n === this.marker(o) && n === this.mark(o)
  }, mark()))

  status('Passing :)')
  if (sole) sole.log('All tests passed =)')
  if (doc && sole && sole.dir) sole.dir(mark)
}(this);
