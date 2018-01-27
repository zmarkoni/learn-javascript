// When importing we don't need .js at the end of the path, we need it here only
// because of system.js
// We always importing references!!!

/*========================================================
================== importing ==============================
=============  3 possible imports ====================================*/

import {testVariable, testFunc} from './modules/external.js';

console.log(testVariable);
testFunc();


// import default, no need brackets, can be different name
import Ab from './modules/external.js'
console.log(Ab);

// also we can use aliases
import {exportFromTest as testMe} from './modules/testExport.js'
console.log(testMe);





