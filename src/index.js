!function(root, name, make) {
    if (typeof module != 'undefined' && module['exports']) module['exports'] = make.call(root);
    else root[name] = make.call(root);
}(this, 'mark', function() {
    
    var key = 'key', instances = 0;

    /**
     * @this {Mark}
     * @param {*=} needle
     * @return {number}
     */
    function search(needle) {
        if (needle && 1 === needle.nodeType) return +needle.getAttribute(this[key]) || 0;
        // Search in reverse to speed access to recent items.
        // Stop iterations at index [1] because [0] is unused.
        for (var i = this.length; 0 < i--;) if (i in this && needle === this[i]) return i;
        return 0;
    }

    /**
     * @this {Mark}
     * @param {*=} o
     * @return {number}
     */
    function admit(o) {
        var i = search.call(this, o);
        if (i) return i;
        if (o && 1 === o.nodeType) o.setAttribute(this[key], i=this.length++); // Skip index.
        else if (o === o) this[i=this.length++] = o; // Search only finds reflexive items.
        return i;
    }

    /**
     * @this {Mark}
     * @param {*=} o
     * @return {undefined}
     */
    function remit(o) {
        var i;
        if (o && 1 === o.nodeType) o.removeAttribute(this[key]);
        else if (i = search.call(this, o)) delete this[i];
    }

    /**
     * @constructor
     */
    function Mark() {
        this.length = 1; // Index 0 stays sparse.
        this[key] = 'data-marker-' + instances++;
    }

    /**
     * @param {*=} o
     * @return {Mark}
     */
    function mark(o) {
        return o instanceof Mark ? o : new Mark;
    }
    
    mark.prototype = Mark.prototype;
    Mark.prototype['mark'] = admit;
    Mark.prototype['unmark'] = remit;
    Mark.prototype['marker'] = search;
    
    (function(instance) {
        function bind(fn, scope) {
            return function() {
                return fn.apply(scope, arguments);
            };
        }
        mark['mark'] = bind(admit, instance);
        mark['unmark'] = bind(remit, instance);
        mark['marker'] = bind(search, instance);
    }(mark()));

    return mark;
});