

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

    
    
var margin = {top: 40, right: 10, bottom: 10, left: 10},
 width = 500 - margin.left - margin.right,
 height = 500 - margin.top - margin.bottom;

var color = {"Rock":"steelblue", "Pop":"rgb(0, 100, 0)"};

var treemap = d3.layout.treemap()
    .size([800, height])
    .sticky(true)
    .value(function(d) { return d.size; });

/*var treemapUpdate = function(){
    
    $('#treemap').empty();
    
    var div = d3.select("#treemap").append("div")
            .style("position", "relative")
            .style("display", "block")
            .style("width", "100%")
            .style("height", (height + margin.top + margin.bottom) + "px")
            .style("left", margin.left + "px")
            .style("top", margin.top + "px");
    
    d3.json("/data/tree.json", function(error, data){
        
        //Get the current year
        var topYear = $('#topCurrent').text();
        var bottomYear = $('#bottomCurrent').text();
        
        //This Years Data
        var subGenreData = _.where(data.children, {name:topYear});
        
        
        

        var node = div.datum(subGenreData).selectAll(".node")
              .data(treemap.nodes)
                .enter().append("div")
                .attr("class", "node")
                .call(position)
                .style("background", function(d) { return d.children ? color[d.name] : null;})
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


        function position() {
          this.style("left", function(d) { return d.x + "px"; })
              .style("top", function(d) { return d.y + "px"; })
              .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
              .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
        };


    });
};*/

//treemapUpdate();

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


