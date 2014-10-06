var fs = require('fs'),
    path = require('path');

var config = {};

config.rootPath = path.resolve(__dirname+'/..');
var dir = config.rootPath +'/config';

var extend = function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            if(typeof source[prop] == 'object') {
                extend(target[prop], source[prop]);
            } else {
                target[prop] = source[prop];
            }
        }
    });
    return target;
};

// Update/merge new config
config.update = function(newConfig) {
    for(var i in newConfig) {
        // Exclude methods
        // TODO: better way to exclude methods
        if(i != 'load' && i != 'update' && i != 'save') {
            this[i] = newConfig[i];
        }
    }
};

// Load config file sync, used when the script starts
config.loadSync = function() {
    var configData = {};

    // Read default config file
    try {
        // Default config
        var data = fs.readFileSync(dir +'/default.json', 'utf8');
        configData = JSON.parse(data);

        try {
            // Custom config
            data = fs.readFileSync(dir +'/custom.json', 'utf8');
            extend(configData, JSON.parse(data));

        // Custom config file not found
        } catch (e) {
            console.log('Cannot load custom config file : ');
            console.log(e);
        }

        this.update(configData);
        return true;
    // Default config file not found
    } catch(e) {
        console.log(e);
        return false;
    }
    
};

module.exports = config;