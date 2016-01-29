#!/usr/bin/env node

/*
Copyright 2016, Yahoo Inc.
Code licensed under the MIT License.
See LICENSE.txt
*/

var profiler = require('v8-profiler');
var path = require('path');
var Module = require('module');

process.argv.splice(1, 1);
var origExit = process.exit;
var exited = false;

function end(cb) {
    return function () {
        if (exited) return;
        exited = true;
        var profile = profiler.stopProfiling();
        var profileFileName = (process.env.CLI_PROFILE_NAME || 'profile') +
            + Date.now() + '.cpuprofile';
        profileFileName = path.join(process.cwd(), profileFileName);
        profile.export()
        .pipe(require('fs').createWriteStream(profileFileName))
        .on('finish', function(){
            profile.delete();
            if (typeof cb === 'function') {
                cb(arguments);
            }
        });
    };
}
process.exit = end(function(args){
    origExit.apply(process, args);
});
process.on('beforeExit', end());
profiler.startProfiling();
process.nextTick(Module.runMain);
