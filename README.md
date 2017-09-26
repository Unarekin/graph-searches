# Graph-Searches
Implementation of several common graph searching algorithms.  Graph structure is implemented via [graph-data-structure](https://www.npmjs.com/package/graph-data-structure).

You can find a Google Maps-enabled visualization of these on [plunkr](http://run.plnkr.co/PnS9tigHMmrRxak8/);

## Data
The graph is built from a list of stops and stop times taken from the Capital Metro GTFS (General Transit Feed Specification) data set, available here:
https://data.texas.gov/Transportation/GTFS/r4v4-vz24
The stops and stop_times files are reproduced here, with their file extensions changed from .txt to .csv, but their contents unchanged.

The graph used in this set of tests is built from this data -- the nodes are stop IDs, and the stop_times are used to determine edges.

The graph should fairly faithfully represent all of the bus stops in the Austin, TX area and their connections to each other.


## Breadth-First
Simple implementation of a breadth-first search.

## Depth-First
## Bellman-Ford
## Dijkstra
## A*


## Testing
Tests are written in mocha and may require this library be installed.

ex:

```sh
sudo npm install -g mocha
```

Otherwise, ```npm run test ``` will execute the tests.

## History
 
Version 1.0 (2017-09-25) - Initial setup
 
## License
 
The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
