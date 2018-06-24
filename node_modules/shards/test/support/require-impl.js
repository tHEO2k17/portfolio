var path = require('path');
var cwd = process.cwd();

global.requireImpl = function(implPath){
    return require(path.join(cwd, implPath));
};

global.requireImpl.relativePath = function(implPath, dirname){
    return path.relative(dirname, path.join(cwd, implPath));
};