// When importing we don't need .js at the end of the path, we need it here only
// because of system.js
// We always importing references!!!

/*========================================================
================== importing =============================
=============  3 possible imports =======================*/

// == Modules are always in Strict Mode (no need to define "use strict")
// == Modules don't have a shared, global Scope. Instead each Module has its own Scope

// import { testVariable, testFunc } from './modules/test-module.js';
// console.log(testVariable);
// testFunc();

// == import default, no need brackets, can be different name
// import AB from './modules/1-external.js'
// console.log(AB);

// == also we can use aliases
// import { exportFromTest as testMe } from './modules/1-testExport.js'
// console.log(testMe);
