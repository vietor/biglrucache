(function(root, factory) {
    "use strict";

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define('biglrucache', [], factory);
    } else {
        root.biglrucache = factory();
    }
})(typeof window === 'object' ? window : this, function() {
    "use strict";

    function LRUCache(capacity, notify) {
        if (!capacity)
            capacity = 100000;
        else if (capacity < 3)
            capacity = 3;

        function LRUEntry(key, value) {
            this.k = key;
            this.v = value;
            this.p = null;
            this.n = null;
        }

        var _count = 0;
        var _lru_head = null;
        var _lru_tail = null;
        var _lru_cache = {};

        function strip(entry) {
            if (entry.p)
                entry.p.n = entry.n;
            if (entry.n)
                entry.n.p = entry.p;
            if (_lru_head == entry)
                _lru_head = entry.n;
            if (_lru_tail == entry)
                _lru_tail = entry.p;
            entry.p = null;
            entry.n = null;
        }

        function append(entry) {
            if (!_lru_tail) {
                _lru_tail = entry;
                _lru_head = entry;
            } else {
                _lru_tail.n = entry;
                entry.p = _lru_tail;
                _lru_tail = entry;
            }
        }

        function refresh(entry) {
            if (entry !== _lru_tail) {
                strip(entry);
                append(entry);
            }
        }

        function remove(entry, action) {
            strip(entry);
            delete _lru_cache[entry.k];
            _count -= 1;
            if (action)
                action(entry.k, entry.v);
            entry.k = null;
            entry.v = null;
        }

        function shrink() {
            var entry = _lru_head;
            if (entry)
                remove(entry, notify);
        }

        this.has = function(key) {
            return _lru_cache.hasOwnProperty(key);
        };

        this.set = function(key, value) {
            var entry = _lru_cache[key];
            if (!entry) {
                entry = new LRUEntry(key, value);
                _count += 1;
                if (_count > capacity)
                    shrink();
                _lru_cache[key] = entry;
                append(entry);
            } else {
                entry.v = value;
                refresh(entry);
            }
        };

        this.get = function(key) {
            var entry = _lru_cache[key];
            if (!entry)
                return null;
            else {
                refresh(entry);
                return entry.v;
            }
        };

        this.del = function(key) {
            var entry = _lru_cache[key];
            if (entry)
                remove(entry);
        };

        this.hit = function(key) {
            var entry = _lru_cache[key];
            if (entry)
                refresh(entry);
        };

        function xeach(iteratee, predicate) {
            var entry = _lru_head;
            while (entry) {
                if (predicate && !predicate(entry.k, entry.v))
                    break;
                iteratee(entry);
                entry = entry.n;
            }
        }

        this.keys = function(predicate) {
            var keys = [];
            xeach(function(entry) {
                keys.push(entry.k);
            }, predicate);
            return keys;
        };

        this.values = function(predicate) {
            var values = [];
            xeach(function(entry) {
                values.push(entry.v);
            }, predicate);
            return values;
        };

        this.clear = function() {
            var entry;
            do {
                entry = _lru_head;
                if (entry)
                    remove(entry);
            } while (entry);
        };

        this.info = function() {
            return {
                length: _count,
                capacity: capacity
            };
        };

    }

    return function(capacity, notify) {
        return new LRUCache(capacity, notify);
    };
});
