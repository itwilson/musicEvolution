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
            
            
            
            
            
        });
	});

	infovisApp.controller('locationController', function($scope) {
		$scope.message = 'On the Locations page';
        
        var width = 960,
            height = 500;

        var projection = d3.geo.mercator()
            .center([0, 5 ])
            .scale(150)
            .rotate([-180,0]);

        var svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height);

        var path = d3.geo.path()
            .projection(projection);

        var g = svg.append("g");

        // load and display the World
        d3.json("world-110m2.json", function(error, topology) {
            g.selectAll("path")
              .data(topojson.object(topology, topology.objects.countries)
                  .geometries)
            .enter()
              .append("path")
              .attr("d", path)
        });
	});

    infovisApp.controller('lyricsController', function($scope) {
		$scope.message = 'On the Lyrics page';
        
            var fill = d3.scale.category20();
          d3.layout.cloud().size([300, 300])
              .words([
                "Hello", "world", "normally", "you", "want", "more", "words",
                "than", "this"].map(function(d) {
                return {text: d, size: 10 + Math.random() * 90};
              }))
              .padding(5)
              .rotate(function() { return ~~(Math.random() * 2) * 90; })
              .font("Impact")
              .fontSize(function(d) { return d.size; })
              .on("end", draw)
              .start();
        
          function draw(words) {
            d3.select("#genre1cloud").append("svg")
                .attr("width", 300)
                .attr("height", 300)
              .append("g")
                .attr("transform", "translate(150,150)")
              .selectAll("text")
                .data(words)
              .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
          };
        
    
          d3.layout.cloud().size([300, 300])
              .words([
                "Hello", "world", "normally", "you", "want", "more", "words",
                "than", "this"].map(function(d) {
                return {text: d, size: 10 + Math.random() * 90};
              }))
              .padding(5)
              .rotate(function() { return ~~(Math.random() * 2) * 90; })
              .font("Impact")
              .fontSize(function(d) { return d.size; })
              .on("end", draw2)
              .start();
        
          function draw2(words) {
            d3.select("#genre2cloud").append("svg")
                .attr("width", 300)
                .attr("height", 300)
              .append("g")
                .attr("transform", "translate(150,150)")
              .selectAll("text")
                .data(words)
              .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
          };
        
    
        
        
        
	});

    infovisApp.controller('subgenresController', function($scope) {
		$scope.message = 'On the SubGenres page';
        var margin = {top: 40, right: 10, bottom: 10, left: 10},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var color = d3.scale.category20c();

        var treemap = d3.layout.treemap()
            .size([width, height])
            .sticky(true)
            .value(function(d) { return d.size; });

        var div = d3.select("#treemap").append("div")
            .style("position", "relative")
            .style("width", (width + margin.left + margin.right) + "px")
            .style("height", (height + margin.top + margin.bottom) + "px")
            .style("left", margin.left + "px")
            .style("top", margin.top + "px");

        d3.json("tree.json", function(error, root) {
          var node = div.datum(root).selectAll(".node")
              .data(treemap.nodes)
            .enter().append("div")
              .attr("class", "node")
              .call(position)
              .style("background", function(d) { return d.children ? color(d.name) : null; })
              .text(function(d) { return d.children ? null : d.name; });

          d3.selectAll("input").on("change", function change() {
            var value = this.value === "count"
                ? function() { return 1; }
                : function(d) { return d.size; };

            node
                .data(treemap.value(value).nodes)
              .transition()
                .duration(1500)
                .call(position);
          });
        });

        function position() {
          this.style("left", function(d) { return d.x + "px"; })
              .style("top", function(d) { return d.y + "px"; })
              .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
              .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
        }

	});