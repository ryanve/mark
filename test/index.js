(function(root) {
    var common = typeof module != 'undefined' && !!module.exports
      , mark = common ? require('../src') : root.mark
      , aok = common ? require('../node_modules/aok') : root.aok
      , doc = typeof document != 'undefined' && document
      , docElem = doc.documentElement
      , plain = {}
      , array = []
      , noop = function() {}
      , ctor = Object
      , boxed = ctor(false)
      , proto = ctor.prototype
      , subjects = [root, plain, array, mark, noop, arguments, ctor, boxed, proto];

    doc && subjects.push(doc, docElem, doc.createTextNode(''), doc.createElement('a'));
    aok.prototype.express.force = true;

    function enums(o) {
        var k, r = [];
        for (k in o) r.push(k);
        return r;
    }
    
    function diff(o, fn, scope) {
        var before = enums(o).join();
        fn.call(scope);
        return enums(o).join() !== before;
    }
    
    function every(stack, fn, scope) {
        var l = stack.length, i = 0;
        while (i < l) if (!fn.call(scope, stack[i], i++, stack)) return false;
        return true;
    }

    every([{
        id:'mark.mark', 
        test:every(subjects, function(o) {
            mark.unmark(o);
            return !mark.marker(o) && mark.mark(o);
        })
    }, {
        id:'mark.unmark', 
        test:every(subjects, function(o) {
            mark.mark(o);
            mark.unmark(o);
            return !mark.marker(o);
        })
    }, {
        id:'mark.marker', 
        test:every(subjects, function(o) {
            var n = mark.marker(o) || mark.mark(o);
            return n === mark.marker(o) && n === mark.mark(o);
        })
      }, {
        id:'instance', 
        test:mark() instanceof mark
      }, {
        id:'integer', 
        test:every(subjects, function(o) {
            var n = mark.mark(o);
            return n === (n>>0);
        })
      }, {
        id:'unobtrusive', 
        test:every(subjects, function(o) {
            mark.unmark(o);
            return !mark.marker(o) && !diff(o, mark.mark);
        })
      }], aok);
}(this));