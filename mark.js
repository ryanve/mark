/*!
 * mark 0.6.0+201309221926
 * https://github.com/ryanve/marker
 * MIT License 2013 Ryan Van Etten
 */

!function(root, name, make) {
    if (typeof module != 'undefined' && module['exports']) module['exports'] = make.call(root);
    else root[name] = make.call(root);
}(this, 'marker', function() {

    var root = this
      , win = window
      , OP = Object.prototype
      , owns = OP.hasOwnProperty
      , uid = 10; // unique id

    /**
     * @param  {string}  name  is a unique identifier for the marker system
     * @return {Function|undefined}
     */
    function markerRemix(name) {
        // Keep `uid` outside this closure so that if someone attempts to
        // remix marker with a name that has already been used, then it 
        // won't break the previous one, rather it will return a fresh 
        // copy of marker for accessing the previous system.
        var key;
        if (!name || typeof name != 'string') return;
        name = name.toLowerCase();
        key = 'data-uid-' + name;
        name = '_uid-' + name;
        
        /**
         * @param  {*}          item
         * @param  {boolean=}   op
         * @return {number|undefined}
         */
        function marker(item, op) {
            var id, type, isOb = typeof item == 'object';
            if (!item || !isOb && typeof item != 'function') return;
            type = item.nodeType;
            
            // DESTROY marker:
            if (op === false) {
                if (isOb && type > 0) item.removeAttribute && item.removeAttribute(key);
                else void 0 === item[name] || (delete (item[name])) || (item[name] = void 0);
                return;
            }

            // ADD/GET marker:
            if (isOb && type > 0) {
                if (9 === type) return type;
                if (item.getAttribute && item.setAttribute) {
                    id = item.getAttribute(key);
                    id || item.setAttribute(key, ( id = uid++ ));
                    return id; // integer
                }
            } else {
                if (item[name] && owns.call(item, name)) return item[name];
                if (item === root) return 2;
                if (item === win) return 3;
                if (isOb && owns.call(item, 'constructor')) {
                    // protect against modifying (native) prototypes
                    id = marker(item.constructor);
                    if (id > 0) return -id;
                }
                return (item[name] = uid++); // add prop
            }
        }
        marker['remix'] = markerRemix;
        return marker;
    }
    return markerRemix('marker');
});