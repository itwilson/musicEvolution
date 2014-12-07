

//Function for getting the subgenres. DONE

/*d3.csv('data/rock4.csv', function(data) {

    
    for (y = 1960; y < 2015; y++){
        var currentYear = (y).toString();

        var yearData = _.where(data, {Year: currentYear});
        var subGenres = _.pluck(yearData, 'Sub Genre');
        var subGenresChunked = _.countBy(subGenres);

        var subGenresValues = _.values(subGenresChunked);
        var subGenresKeys = _.keys(subGenresChunked);

        var dataTable = $('#dataTable');

        dataTable.append("<div>" + "{" +"</div>");
        dataTable.append("<div>"+ '"name": ' + '"' + currentYear + '",' + "</div>");
        dataTable.append("<div>"+ '"children"' + ": " + '[' +  "</div>");

        for (i = 0; i < subGenresValues.length; i++){
            dataTable.append("<div>" + "{" + '"name": ' + '"' + subGenresKeys[i] + '"' + ", " + '"size": ' +  subGenresValues[i] + "}," + "</div>");   
        };

        dataTable.append("<div>" + ']' +  "</div>");
        dataTable.append("<div>" + "}," +"</div>");
    };
    
    
});*/

var previousYear = 0;


var treemapPlot = function(){
    
    var margin = {top: 40, right: 10, bottom: 10, left: 10},
        width = 300 - margin.left - margin.right,
        height = 500;

    var color = d3.scale.category20c();

    var treemap = d3.layout.treemap()
        .size([width, height])
        .sticky(true)
        .value(function(d) { return d.size; });

    //Get the current year
            var topYear = $('#topCurrent').text();
            var bottomYear = $('#bottomCurrent').text();
    
    if (topYear == previousYear){
        //Dont do anything
    }else{
        //Clear out the treemap
        $('#treemapLeft').empty();
        
        previousYear = topYear;

        var div = d3.select("#treemapLeft").append("div")
            .style("position", "relative")
            .style("width", (width + margin.left + margin.right) + "px")
            .style("height", (height + margin.top + margin.bottom) + "px")
            .style("left", margin.left + "px")
            .style("top", margin.top + "px");

        d3.json("tree.json", function(error, root) {
            var topYear = $('#topCurrent').text();
            var data = root.children;


            thisYear = (_.where(data, {name: topYear}))[0];


            var subGenreData = 
                                {
                                 "name": "flare",
                                 "children": [
                                    thisYear
                                 ]
                                };

            console.log(subGenreData);

          var node = div.datum(subGenreData).selectAll(".node")
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
                .duration(1)
                .call(position);
          });
        });

        function position() {
          this.style("left", function(d) { return d.x + "px"; })
              .style("top", function(d) { return d.y + "px"; })
              .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
              .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
        };
    };
};
treemapPlot();

//Update Values


