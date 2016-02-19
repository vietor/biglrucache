"use strict";

var should = require('should');
var BigLRUCache = require('../biglrucache');

describe('BigLRUCache', function() {
    it('BigLRUCache()', function() {
        var cache = BigLRUCache(3);
        should(cache.info().length).be.equal(0);
        should(cache.info().capacity).be.equal(3);

        cache.set('a', 'a');
        should(cache.info().length).be.equal(1);
        should(cache.keys()).be.eql(['a']);
        should(cache.get('a')).be.equal('a');
        should(cache.has('a')).be.equal(true);

        cache.set('b', 'b');
        cache.set('c', 'c');
        should(cache.info().length).be.equal(3);
        should(cache.keys()).be.eql(['a', 'b', 'c']);

        cache.set('d', 'd');
        should(cache.info().length).be.equal(3);
        should(cache.keys()).be.eql(['b', 'c', 'd']);

        cache.get('b');
        cache.set('e', 'e');
        should(cache.info().length).be.equal(3);
        should(cache.keys()).be.eql(['d', 'b', 'e']);

        cache.del('e');
        should(cache.info().length).be.equal(2);
        should(cache.keys()).be.eql(['d', 'b']);

        cache.clear();
        should(cache.info().length).be.equal(0);
    });
});
