/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-7-b-7.js
 * @description Array.prototype.forEach - properties can be added to prototype after current position are visited on an Array
 */


function testcase() {

        var testResult = false;

        function callbackfn(val, idx, obj) {
            if (idx === 1 && val === 6.99) {
                testResult = true;
            }
        }

        var arr = [0, , 2];

        Object.defineProperty(arr, "0", {
            get: function () {
                Object.defineProperty(Array.prototype, "1", {
                    get: function () {
                        return 6.99;
                    },
                    configurable: true
                });
                return 0;
            },
            configurable: true
        });

        try {
            arr.forEach(callbackfn);
            return testResult;
        } finally {
            delete Array.prototype[1];
        }
    }
runTestCase(testcase);
