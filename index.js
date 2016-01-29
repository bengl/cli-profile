#!/usr/bin/env node

/*
Copyright 2016, Yahoo Inc.
Code licensed under the MIT License.
See LICENSE.txt
*/

var profiler = require('v8-profiler');
var path = require('path');
var Module = require('module');
var onExit = require('signal-exit');

var prefix = process.env.CLI_PROFILE_NAME || 'profile';

process.argv.splice(1, 1);
onExit(function end () {
    var profile = profiler.stopProfiling();
    var file = path.join(process.cwd(), prefix + Date.now() + '.cpuprofile');
    require('fs').writeFileSync(file, JSON.stringify(profile));
    profile.delete();
});
profiler.startProfiling();
process.nextTick(Module.runMain);
