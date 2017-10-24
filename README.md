# Graph-Searches
Implementation of several common graph searching algorithms.  Graph structure is implemented via [graph-data-structure](https://www.npmjs.com/package/graph-data-structure).

You can find a Google Maps-enabled visualization of these on [plunkr](http://plnkr.co/edit/j5mHAMUp8SsSpnoRbZe1?p=info);

## Data
The graph is built from a list of stops and stop times taken from the Capital Metro GTFS (General Transit Feed Specification) data set, available here:
https://data.texas.gov/Transportation/GTFS/r4v4-vz24
The stops and stop_times files are reproduced here, with their file extensions changed from .txt to .csv, but their contents unchanged.

The graph used in this set of tests is built from this data -- the nodes are stop IDs, and the stop_times are used to determine edges.

The graph should fairly faithfully represent all of the bus stops in the Austin, TX area and their connections to each other.


## Breadth-First
Simple implementation of a breadth-first search.
https://en.wikipedia.org/wiki/Breadth-first_search

## Depth-First
Simple implementation of a depth-first search.
https://en.wikipedia.org/wiki/Depth-first_search

## Bellman-Ford
Bellman-Ford shortest path finding algorithm.
https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm

## Dijkstra
Dijkstra's shortest-path finding algorithm.  This implementation uses a heap data type to ease sorting a list of nodes by edge weight (https://www.npmjs.com/package/heap).
https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm

## A*
An update of Dijkstra's algorithm, adding in a heuristic to try and estimate distance from nodes to the target.  The heuristic implemented in this repository is one based on [great circle distance]great-circle distance](https://en.wikipedia.org/wiki/Great-circle_distance), as the data available for stops includes latitude and longitude.
https://en.wikipedia.org/wiki/A*_search_algorithm

## Testing
Tests are written in mocha and may require this library be installed.

ex:

```sh
sudo npm install -g mocha
```

Otherwise, ```npm run test ``` will execute the tests.

## License
 
The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
