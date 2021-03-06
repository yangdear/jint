/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-9-6.js
 * @description Array.prototype.filter visits deleted element in array after the call when same index is also present in prototype
 */


function testcase() { 
 
  function callbackfn(val, idx, obj)
  {
    delete srcArr[2];
    delete srcArr[4];
    if(val > 0)
      return true;
    else
      return false;
   }

  Array.prototype[4] = 5;
  var srcArr = [1,2,3,4,5];
  var resArr = srcArr.filter(callbackfn);
  delete Array.prototype[4];
  if(resArr.length === 4 && resArr[0] === 1 && resArr[3] == 5)    // only one element deleted
      return true;  
  
 }
runTestCase(testcase);
