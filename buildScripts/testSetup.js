//This file isn't transpiled, so it must use CommonJS and ES5

//Register babel to transpile tests before they run
require('babel-register')();

//Disable webpack features that Mocha doesn't understand
require.extensions['.css'] = function() {};
