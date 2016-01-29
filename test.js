var test = require('pitesti')();
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var output = require('child_process').execSync('node index.js `which npm` ls').toString();
var cpuprofile, filename;
fs.readdirSync(process.cwd()).forEach(function(file){
    if (/cpuprofile/.test(file)) {
        filename = path.join(process.cwd(), file);
        cpuprofile = JSON.parse(fs.readFileSync(filename));
    }
});

test('output is correct', function () {
    assert(output.indexOf('└─┬ v8-profiler@') > -1);
});

test('cpuprofile is there', function () {
    var keys = [
        'typeId',
        'uid',
        'title',
        'head',
        'startTime',
        'endTime',
        'samples',
        'timestamps'
    ];
    assert.deepEqual(keys, Object.keys(cpuprofile));
    fs.unlinkSync(filename);
});

test();
