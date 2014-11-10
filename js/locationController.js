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