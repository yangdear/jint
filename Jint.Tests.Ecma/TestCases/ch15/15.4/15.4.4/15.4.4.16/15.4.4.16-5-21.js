/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-5-21.js
 * @description Array.prototype.every - the global object can be used as thisArg
 */


function testcase() {

        var accessed = false;

        function callbackfn(val, idx, obj) {
            accessed = true;
            return this === fnGlobalObject();
        }

        return [11].every(callbackfn, fnGlobalObject()) && accessed;
    }
runTestCase(testcase);
