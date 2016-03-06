var path = require('path');
var fs = require('fs');
var argv = require('yargs').argv;
var paths = {};

paths.root 					= path.join(__dirname, '../..');
paths.bitmaps_reference     = paths.root + '/bitmaps_reference';
paths.bitmaps_test          = paths.root + '/bitmaps_test';
paths.comparePath           = paths.root + '/compare';
paths.compareConfigFileName = paths.bitmaps_test + '/compare.json';
paths.serverPidFile         = paths.root + '/server.pid';
paths.report 				= ["CLI", "browser"];
paths.compareReportURL 		= 'http://localhost:3001/compare/';

module.exports = paths;