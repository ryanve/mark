!function(root) {
  var common = typeof module != 'undefined' && !!module.exports
  var mark = common ? require('./') : root.mark
  var doc = typeof document != 'undefined' && document
  var sole = typeof console != 'undefined' && console
  var docElem = doc.documentElement
  var globe = this
  var plain = {}
  var array = []
  var noop = function() {}
  var ctor = Object
  var boxed = ctor(false)
  var proto = ctor.prototype
  var subjects = [root, plain, array, mark, noop, arguments, ctor, boxed, proto]
  doc && subjects.push(doc, docElem, doc.createTextNode(''), doc.createElement('a'))

  function status(message) {
    if (doc && doc.querySelector) doc.querySelector('[data-status]').innerHTML = message
  }

  function enums(o) {
    var k
    var r = []
    for (k in o) r.push(k)
    return r
  }

  function diff(o, fn, scope, args) {
    var before = enums(o).join()
    fn.apply(scope, args || [])
    return enums(o).join() !== before
  }

  function every(stack, fn, scope) {
    var l = stack.length
    var i = 0
    while (i < l) if (!fn.call(scope, stack[i], i++, stack)) return false
    return true
  }

  function ok(name, test) {
    if (!test) {
      status('Failure @ ' + name)
      throw new Error('Fail: ' + name)
    } else if (sole) {
      sole.log('Ok: ' + name)
    }
  }

  ok('mark.mark', every(subjects, function(o) {
    mark.unmark(o)
    return !mark.marker(o) && mark.mark(o)
  }))

  ok('mark.unmark', every(subjects, function(o) {
    mark.mark(o)
    mark.unmark(o)
    return !mark.marker(o)
  }))

  ok('mark.marker', every(subjects, function(o) {
    var n = mark.marker(o) || mark.mark(o)
    return n === mark.marker(o) && n === mark.mark(o)
  }))

  ok('instance', mark() instanceof mark)

  ok('integer', every(subjects, function(o) {
    var n = mark.mark(o)
    return n === (n >> 0)
  }))

  ok('unobtrusive', every(subjects, function(o) {
    mark.unmark(o)
    return !mark.marker(o) && !diff(o, mark.mark)
  }))

  ok('scope', !globe || !diff(globe, mark.prototype.mark, globe, [plain]))

  status('Passing :)')
  if (sole) sole.log('All tests passed =)')
  if (doc && sole && sole.dir) sole.dir(mark)
}(this);
