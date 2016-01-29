# cli-profile

`cli-profile` is a simple wrapper around [`v8-profiler`](https://www.npmjs.com/package/v8-profiler), making it easy to use for CLI tools in node.

## Usage

Invoke it as if it's `node`. For example, to profile an npm install:

```
$ cli-profile `which npm` install
```

All the arguments are passed to program you're profiling. This will then generate a timestamped `.cpuprofile` file in the current directory, which you can then load up into Chrome Dev Tools, or use [`flamegraph`](https://www.npmjs.com/package/flamegraph).

To generate a flamegraph from a cpu profile:

```
$ npm i -g flamegraph
$ cat *.cpuprofile | flamegraph -t cpuprofile > graph.svg
```

The profile will run from the time the program starts until either `process.exit` is called or the `beforeExit` event is emitted on `process`. This corresponds to the lifetime of the program being profiled.

## License

MIT. See LICENSE.txt
