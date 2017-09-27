'use strict'
var fs = require('fs');
var path = require('path');
var q = require('q');
var csv = require('fast-csv');

var graphLib = require('graph-data-structure');

var stopData = [];
var edgeData = [];

var graph = new graphLib();

createStops()
.then(function() {
	for (let i=0;i<stopData.length;i++)
		graph.addNode(stopData[i].id);
	
	fs.writeFileSync("./stops.json", JSON.stringify(stopData));
	return createEdges();
})
.then(function() {
	fs.writeFileSync("./routes.json", JSON.stringify(edgeData));
})
.then(function() {
	var serialized = graph.serialize();
	fs.writeFileSync("./graph.json", JSON.stringify(serialized));
})
.catch(function(err) {
	console.error(err.message);
	console.error(err.stack);
});



function createStops() {
	var deferred = q.defer();

	readCSV(path.resolve("./stops.csv"))
	.progress(function(data) {

		stopData.push({
			id: data.stop_id,
			name: data.stop_name,
			desc: data.stop_desc,
			lat: data.stop_lat,
			lon: data.stop_lon
		})
	})
	.then(deferred.resolve)
	.catch(deferred.reject)
	;

	return deferred.promise;
}


/**
 * Reads a stop_times.csv from the CapMetro data set, linking stops
 * @returns {promise}
 */

function createEdges() {
	var deferred = q.defer();

	var trips = {};

	readCSV(path.resolve("./stop_times.csv"))
	.progress(function(data) {
		if (!trips[data.trip_id])
			trips[data.trip_id] = [];

		trips[data.trip_id][parseInt(data.stop_sequence)-1] = {
			stop: data.stop_id,
			arrival: data.arrival_time,
			departure: data.departure_time
		};
	})
	.then(function() {

		var edges = {};

		for (var trip_id in trips) {
			var trip = trips[trip_id];
			for (let i=1;i<trip.length;i++) {
				var prev = trip[i-1];
				var curr = trip[i];

				if (!edges[prev.stop])
					edges[prev.stop] = [];
				if (edges[prev.stop].indexOf(curr.stop) === -1) {
					edges[prev.stop].push(curr.stop);

					var weight = 0;

					weight = Math.floor((new Date("1/1/2000 " + curr.arrival) - new Date("1/1/2000 " + prev.departure)) / 1000);
					graph.addEdge(prev.stop, curr.stop, weight);
					edgeData.push({source: prev.stop, target: curr.stop, weight: weight});
				}


			}
		}

		deferred.resolve();
	})
	.catch(deferred.reject);


	return deferred.promise;
}

function OldcreateEdges() {
	var deferred = q.defer();

	var trips = {};


	readCSV(path.resolve("./stop_times.csv"))
	.progress(function(data) {
		if (!trips[data.trip_id])
			trips[data.trip_id] = [];
		trips[data.trip_id][parseInt(data.stop_sequence)-1] = data.stop_id;
	})
	.then(function() {
		console.log(trips);
		for (var trip_id in trips) {
			var data = trips[trip_id];
			for (let i=1;i<data.length;i++) {


				var adjacent = graph.adjacent(data[i-1]);		

				if (adjacent.indexOf(data[i]) === -1) {
					//graph.addEdge(data[i-1], data[i]);
					//var diff = Math.floor((new Date("1/1/2000 " + data[i].arrival_time) - new Date("1/1/2000 " + data[i-1].departure_time))/1000);
					edgeData.push({source: data[i-1], target: data[i], weight: diff});
					graph.addEdge(data[i-1], data[i], diff);
				}
			}
		}
		deferred.resolve();
	})
	.catch(deferred.reject)
	;

	return deferred.promise;
}



/*
 * Reads a CSV file, emitting a promise progress event when a new item is read.
 * @param {string} file - The path to the file to be read
 * @returns {promise}
 */
function readCSV(file) {
	var deferred = q.defer();

	var fileStream = fs.createReadStream(file, 'utf-8');
	var csvStream = csv({
		objectMode: true,
		headers: true
	})
	.on("data", deferred.notify)
	.on("end", deferred.resolve)
	.on('error', deferred.reject);

	fileStream.pipe(csvStream);

	return deferred.promise;
}