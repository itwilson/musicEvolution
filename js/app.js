	// create the module and name it for the EPILOG
	var infovisApp = angular.module('infovisApp', ['ngRoute']);

	// configure routes
	infovisApp.config(function($routeProvider) {
		$routeProvider

			// home (splash screen)
			.when('/', {
				templateUrl : 'partial/home.html',
				controller  : 'mainController'
			})

			// people main page
			.when('/meta', {
				templateUrl : 'partial/meta.html',
				controller  : 'metaController'
			})

			// schedule page
			.when('/location', {
				templateUrl : 'partial/location.html',
				controller  : 'locationController'
			})
        
            // applications main page
			.when('/lyrics', {
				templateUrl : 'partial/lyrics.html',
				controller  : 'lyricsController'
			})
        
            // settings page
			.when('/subgenres', {
				templateUrl : 'partial/subgenres.html',
				controller  : 'subgenresController'
			});
	});

	// create the controller and inject Angular's $scope
	infovisApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Home is where the heart is';
	});

	infovisApp.controller('metaController', function($scope) {
		$scope.message = 'On the Meta Page';
        
        d3.csv('data2.csv', function(data) {
            data.forEach(function(d){ d['Innovation'] = +d['Innovation']; }); 
            
            //Set number of songs
            var numSongs = data.length;
            $('#numSongs').text(numSongs + " songs");
            
            
            //Pluck
            var dataArray = _.pluck(data, 'Innovation');
            var dataArray2 = _.pluck(data, 'ICT');
            var dataArray3 = _.pluck(data, 'KEI');
            
            //Average
            $('#average').text(d3.mean(dataArray));
            
            //Min
            var dataMin = d3.min(dataArray);
            var dataMinSongIs = (_.findWhere(data, {Innovation: dataMin})).Country;
            $('#shortSong').text(dataMin + "-" + dataMinSongIs);
            
            //Min
            var dataMax = d3.max(dataArray);
            var dataMaxSongIs = (_.findWhere(data, {Innovation: dataMax})).Country;
            $('#longSong').text(dataMax + "-" + dataMaxSongIs);
            
            //StDev
            // Require simple statistics
            var stDev = ss.standard_deviation(dataArray)
            $('#stDev').text(stDev);

            ///////////////////////////////////
            //PlotWav//////////////////////////
            ///////////////////////////////////
            
            
            
            var waveSection = function(metric, chunk, index) {
                //Create array of values for metric from argument
                var dataArray = _.pluck(data, metric);
                
                //Create an array of objects for how many values are in each chunk for bars
                var sortData = _.countBy(dataArray, function(num) {
                    for (i = 1; i < 11;) {
                        if (num < i) {
                            return i - 1;
                            break;
                        };
                        i += chunk;
                    };
                });
                
                
               
              
                //Pluck the values for bars
                var sortedValues = _.values(sortData);
                
               
                
                //Pluck the keys for popover used later
                var sortedKeys = _.keys(sortData);
                
                //Create a canvas
                canvas = d3.select('#chart').append("svg").attr("width", 350).attr("height", 200).attr('id', index);
                
                
                if (index < 5) {
                    var area = d3.svg.area()
                        .interpolate("basis")
                        .x(function(d, i) { return (7 * i);})
                        .y0(200)
                        .y1(function(d) { return 200 - (d * 10);});
                    
                    
                    canvas.append("path")
                        .datum(sortedValues)
                        .attr("class", "area")
                        .attr("d", area);
                    
                    //Append our bars on the top
                    canvas.selectAll('bars').data(sortedValues)
                        .enter()
                        .append('rect')
                        .attr("x", function(d, i) { return 7 * i;})
                        .attr("y", function(d) { return 200 - (d * 10);})
                        .attr("height", function(d) { return d * 15;})
                        .attr("width", 5)
                        .style('fill', 'steelblue');
                    
                    
                    
                } else {
                    var area = d3.svg.area()
                        .interpolate("basis")
                        .x(function(d, i) { return (7 * i);})
                        .y0(0)
                        .y1(function(d) { return d * 15;});
                    
                    
                    canvas.append("path")
                        .datum(sortedValues)
                        .attr("class", "area")
                        .attr("d", area);
                    
                    
                    //Append our bars on the bottom
                    canvas.selectAll('bars').data(sortedValues)
                    .enter()
                    .append('rect')
                    .attr("x", function(d, i) { return 7 * i;})
                    .attr("y", function(d) { return 0;})
                    .attr("height", function(d) { return d * 15;})
                    .attr("width", 5)
                    .style('fill', 'darkgreen');
                };
            };
                
            
            
            
            waveSection('Innovation', .2, 1);
            waveSection('Education', .2, 2);
            waveSection('KEI', .2, 3);
            waveSection('ICT', .2, 4);
            waveSection('Business', .2, 5);
            waveSection('KI', .2, 6);
            waveSection('Economic', .2, 7);
            waveSection('Education', .2, 7);
            
            
            
            
            /*
            var sortData = _.countBy(dataArray, function(num) {
                for (i = 1; i < 11;) {
                    if (num < i) {
                        return i - 1;
                        break;
                    };
                    i += .2;
                };
                
              
            });
            
            var sortData2 = _.countBy(dataArray2, function(num) {
                for (i = 1; i < 11;) {
                    if (num < i) {
                        return i - 1;
                        break;
                    };
                    i += .2;
                };
                
              
            });
            
            var sortData3 = _.countBy(dataArray3, function(num) {
                for (i = 1; i < 11;) {
                    if (num < i) {
                        return i - 1;
                        break;
                    };
                    i += .2;
                };
                
              
            });
            
            console.log(sortData);
            var sortedValues = _.values(sortData);
            var sortedKeys = _.keys(sortData);
            
    
            canvas = d3.select('#chart').append("svg").attr("width", 500).attr("height", 200);
            
            canvas.selectAll('bars').data(sortedValues)
                    .enter()
                    .append('rect')
                    .attr("x", function(d, i) { return 7 * i;})
                    .attr("y", function(d) { return 200 - (d * 10);})
                    .attr("height", function(d) { return d * 15;})
                    .attr("width", 5)
                    .style('fill', 'steelblue');
                    
            var sortedValues2 = _.values(sortData2);
            var sortedKeys2 = _.keys(sortData2);
            
    
            canvas2 = d3.select('#chart').append("svg").attr("width", 500).attr("height", 200).style("display", "inline-block");
            
            canvas2.selectAll('bars').data(sortedValues2)
                    .enter()
                    .append('rect')
                    .attr("x", function(d, i) { return 7 * i;})
                    .attr("y", function(d) { return 0;})
                    .attr("height", function(d) { return d * 15;})
                    .attr("width", 5)
                    .style('fill', 'darkgreen');
            
            

            var sortedValues3 = _.values(sortData3);
            var sortedKeys3 = _.keys(sortData3);
            
    
            canvas3 = d3.select('#chart').append("svg").attr("width", 500).attr("height", 200).style("display", "inline-block");
            
            canvas3.selectAll('bars').data(sortedValues3)
                    .enter()
                    .append('rect')
                    .attr("x", function(d, i) { return 7 * i;})
                    .attr("y", function(d) { return 0;})
                    .attr("height", function(d) { return d * 15;})
                    .attr("width", 5)
                    .style('fill', 'darkgreen');
            */
            
        });
	});

	infovisApp.controller('locationController', function($scope) {
		$scope.message = 'On the Locations page';
	});

    infovisApp.controller('lyricsController', function($scope) {
		$scope.message = 'On the Lyrics page';
	});

    infovisApp.controller('subgenresController', function($scope) {
		$scope.message = 'On the SubGenres page';
	});