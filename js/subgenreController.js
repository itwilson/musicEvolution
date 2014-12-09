

//Function for getting the subgenres. DONE

/*d3.csv('data/subgenres/' + genre1Selected + '.csv', function(data) {

    
    for (y = 1960; y < 2015; y++){
        var currentYear = (y).toString();

        var yearData = _.where(data, {Year: currentYear});

        
        var subGenresValues = _.values(yearData[0]);
        var subGenresKeys = _.keys(yearData[0]);
        
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




var treemapPlot = function(){
    
    var margin = {top: 0, right: 10, bottom: 10, left: 10},
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
        

        

        d3.json("data/subgenres/" + genre1Selected + ".json", function(error, root) {
            
            $('#treemapLeft').empty();
            
            var div1 = d3.select("#treemapLeft").append("div")
            .style("position", "relative")
            .style("width", (width + margin.left + margin.right) + "px")
            .style("height", (height + margin.top + margin.bottom) + "px")
            .style("left", margin.left + "px")
            .style("top", margin.top + "px");
            
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


          var node = div1.datum(subGenreData).selectAll(".node")
              .data(treemap.nodes)
            .enter().append("div")
              .attr("class", "node")
              .call(position)
              .style("background", function(d) { return d.children ? "steelblue" : null; })
              .text(function(d) { return d.children ? null : d.name; });

          
        });

        function position() {
          this.style("left", function(d) { return d.x + "px"; })
              .style("top", function(d) { return d.y + "px"; })
              .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
              .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
        };
    
    /////////////////\\\\\\\\\\\\\
    //////THE RIGHT TREEMAP\\\\\\\
    /////////////////\\\\\\\\\\\\\
    
 
        
        
 

        
        d3.json("data/subgenres/" + genre2Selected + ".json", function(error, root) {
            //Clear out the treemap
            $('#treemapRight').empty();
            console.log(error);
            if (root.length !=0){
            
            var treemap2 = d3.layout.treemap()
                .size([width, height])
                .sticky(true)
                .value(function(d) { return d.size; });
        
            var div = d3.select("#treemapRight").append("div")
                .style("position", "relative")
                .style("width", (width + margin.left + margin.right) + "px")
                .style("height", (height + margin.top + margin.bottom) + "px")
                .style("left", margin.left + "px")
                .style("top", margin.top + "px");

            
            
            var bottomYear = $('#bottomCurrent').text();
            var data = root.children;


            thisYear = (_.where(data, {name: bottomYear}))[0];


            var subGenreData2 = 
                                {
                                 "name": "flare",
                                 "children": [
                                    thisYear
                                 ]
                                };


          var rightNode = div.datum(subGenreData2).selectAll(".node")
              .data(treemap2.nodes)
            .enter().append("div")
              .attr("class", "node")
              .call(position2)
              .style("background", function(d) { return d.children ? "green" : null; })
              .text(function(d) { return d.children ? null : d.name; });

            };
        });

        function position2() {
          this.style("left", function(d) { return (d.x + 0) + "px"; })
              .style("top", function(d) { return d.y + "px"; })
              .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
              .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
        };
        
};

treemapPlot();

//Update Values


