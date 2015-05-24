"use strict";

var Tools = {
    equal:      function (obj1, obj2) {
        var equal = (obj1 === obj2);
        if (!equal && (typeof(obj1) == 'object' && typeof(obj2) == 'object')) {
            equal = true;
            var obj = Object.keys(obj1).length > Object.keys(obj2).length ? obj1 : obj2;
            for (var prop in obj) {
                equal = equal && this.equal(obj1[prop], obj2[prop]);
            }
        }

        return equal;
    },
    capitalize: function (str) {
        return str.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
            return p1 + p2.toUpperCase();
        });
    }
};