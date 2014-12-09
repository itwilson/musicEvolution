/*d3.csv("data/location/pop.csv", function(data){
    
    for (i = 1960; i < 2015; i++){
        var year = '' + i + '';
        var thisYear = _.where(data, {Year:year});
        var continents = _.groupBy(thisYear, "Continent");

        var asia, oceania, caribbean, centralAsia, EasternEurope, MediteraneanEurope, MiddleEast, NorthAmerica, scandinavia, southAmerica, southeastAsia,
            southernAfrica, westernEurope;
        
        var canada = 0, mexico = 0 , west = 0, southWest = 0, midwest = 0, northEast = 0, southEast = 0;
        
        var northAmerica = continents["North America"];
        
        
        for (s = 0; s < northAmerica.length; s++){
            var state = northAmerica[s].State;
            
            if( northAmerica[s].Country == "Canada"){
                canada +=1;
            }else if( northAmerica[s].Country == "Mexico"){
                mexico +=1;   
            }else if( northAmerica[s].Country == "United States"){
                if(state == "Arizona" || state == "New Mexico" || state == "Texas" || state == "Oklahoma" ){
                    southWest +=1;   
                }else if(state == "Washington" || state == "Oregon" || state == "Nevada" || state == "California" || state == "Idaho" || state == "Montana" || state == "Wyoming" || state == "Utah" || state == "Colorado" || state == "Alaska" || state == "Hawaii" ){
                    west +=1;
                }else if(state == "North Dakota" || state == "South Dakota" || state == "Nebraska" || state == "Kansas" || state == "Minnesota" || state == "Iowa" || state == "Missouri" || state == "Wisconsin" || state == "Illinois" || state == "Michigan" || state == "Indiana" || state == "Ohio"  ){
                   midwest +=1;      
                }else if(state == "Maine" || state == "New Hampshire" || state == "Vermont" || state == "Massachusetts" || state == "Rhode Island" || state == "Connecticut" || state == "New Jersey" || state == "Delaware" || state == "New York" || state == "Pennsylvania" || state == "Maryland" || state == "District Of Columbia"){
                    northEast +=1;     
                }else if (state == "Arkansas" || state == "Louisiana" || state == "West Virginia" || state == "Virginia" || state == "Kentucky" || state == "Tennessee" || state == "North Carolina" || state == "South Carolina" || state == "Mississippi" || state == "Alabama" || state == "Georgia" || state == "Florida") {
                       southEast +=1;
                }else {
                    console.log(state);
                };
            };
            
        };
    

        
       
        
        $('#dataTable').append("<tr><td>" + year + "</td>" + "<td>" + canada + "</td>" + "<td>" + mexico + "</td>" + "<td>" + southWest + "</td>" + "<td>" + west + "</td>" + "<td>" + midwest + "</td>" + "<td>" + northEast + "</td>" + "<td>" + southEast + "</td>" +  "</tr>");     
};
});*/
        /*
        if (continents.Asia){
            asia = continents.Asia.length;
        }else {
            asia = 0;
        };
        
        if (continents["Australia/Oceania"]){
            oceania = continents["Australia/Oceania"].length;
        }else {
            oceania = 0;
        };
        
        if (continents.Caribbean){
            caribbean = continents.Caribbean.length;
        }else {
            caribbean = 0;
        };
        
        if (continents["Central Asia"]){
            centralAsia = continents["Central Asia"].length;
        }else {
            centralAsia = 0;
        };
        
        if (continents["Eastern Europe"]){
            EasternEurope = continents["Eastern Europe"].length;
        }else {
            EasternEurope = 0;
        };
        
        if (continents["Mediterranean Europe"]){
            MediteraneanEurope = continents["Mediterranean Europe"].length;
        }else {
            MediteraneanEurope = 0;
        };
        
        if (continents["Middle East"]){
            MiddleEast = continents["Middle East"].length;
        }else {
            MiddleEast = 0;
        };
        
        if (continents["North America"]){
            NorthAmerica = continents["North America"].length;
        }else {
            NorthAmerica = 0;
        };
        
        if (continents["Scandinavia"]){
            scandinavia = continents["Scandinavia"].length;
        }else {
            scandinavia = 0;
        };
        
        if (continents["South America"]){
            southAmerica = continents["South America"].length;
        }else {
            southAmerica = 0;
        };
        
        if (continents["Southeast Asia"]){
            southeastAsia = continents["Southeast Asia"].length;
        }else {
            southeastAsia = 0;
        };
        
        if (continents["Southern Africa"]){
            southernAfrica = continents["Southern Africa"].length;
        }else {
            southernAfrica = 0;
        };
        
        if (continents["Western Europe"]){
            westernEurope = continents["Western Europe"].length;
        }else {
            westernEurope = 0;
        };
       
        
        $('#dataTable').append("<tr>" + "<td>" + year + "</td>" + "<td>" + asia + "</td>" + "<td>" + oceania + "</td>"
                    + "<td>" + caribbean + "</td>" + "<td>" + centralAsia + "</td>" + "<td>" + EasternEurope + "</td>"  + "<td>" + MediteraneanEurope + 
                         "</td>" + "<td>" + MiddleEast + "</td>" + "<td>" + NorthAmerica + "</td>" + "<td>" + scandinavia + "</td>" + "<td>" + southAmerica + "</td>" + "<td>" + southeastAsia + "</td>" + "<td>" + southernAfrica + "</td>" + "<td>" + westernEurope + "</td>"
 + "</tr>");*/
/*    };
    
    
});*/



////////////////\\\\\\\\\\\\\\\\
///////THE MAP - LOCATIONS\\\\\\
////////////////\\\\\\\\\\\\\\\\

var width = 1000,
    height = 500;

var projection = d3.geo.mercator()
    .center([0, 0 ])
    .scale(150)
    .rotate([-180,0]);

var mapCanvas = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("margin-left", "0px");

var path = d3.geo.path()
    .projection(projection);

var g = mapCanvas.append("g");

// load and display the World
d3.json("world-110m2.json", function(error, topology) {
    g.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "lightgrey");
});



//Function for appending the dots
var mapDots = function(){
    d3.csv("data/location/" + genre2Selected + ".csv", function(error, data){
       
        
        //Get this year
        var topYear = $('#topCurrent').text();
        var bottomYear = $('#bottomCurrent').text();
        
        var topYearData = (_.where(data, {Year: topYear}))[0];
        var numSongsTop = parseInt($('#numSongs1').text());
        
        var bottomYearData = (_.where(data, {Year: bottomYear}))[0];
        var numSongsBottom = parseInt($('#numSongs2').text());
///GREEN DOTS
        
         //Asia Dot
        var asiaDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData.Asia / numSongsBottom)))
                        .attr("cx", 250)
                        .attr("cy", 160)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "asiaDotGreen");
        
        //Canada Dot
        var canadaDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData.Canada / numSongsBottom)))
                        .attr("cx", 690)
                        .attr("cy", 90)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "canadaDotGreen");
        
        //Caribbean Dot
        var caribbeanDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData.Caribbean / numSongsBottom)))
                        .attr("cx", 740)
                        .attr("cy", 190)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "caribbeanDot");
        
        //Central Asia Dot
        var centralAsiaDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["Central Asia"] / numSongsBottom)))
                        .attr("cx", 220)
                        .attr("cy", 160)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "centralAsiaDotGreen");
        
        //Eastern Europe Dot
        var easternEuropeDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["Eastern Europe"] / numSongsBottom)))
                        .attr("cx", 50)
                        .attr("cy", 110)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "easternEuropeDotGreen");
        
        //Mediterranean Europe Dot
        var mediterraneanDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData.Mediterranean / numSongsBottom)))
                        .attr("cx", 35)
                        .attr("cy", 120)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "mediterraneanDotGreen");
        
        //Mexico Dot
        var mexicoDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData.Mexico / numSongsBottom)))
                        .attr("cx", 690)
                        .attr("cy", 190)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "mexicoDotGreen");
        
        //Middle East Dot
        var middleEastDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["Middle East"] / numSongsBottom)))
                        .attr("cx", 110)
                        .attr("cy", 170)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "middleEastDotGreen");
        
        //Midwest Dot
        var midwestDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["Midwest"] / numSongsBottom))) 
                        .attr("cx", 710)
                        .attr("cy", 130)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "midwestDotGreen");
        
        //North East Dot
        var northEastDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["North East"] / numSongsBottom)))
                        .attr("cx", 750)
                        .attr("cy", 135)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "northEastDotGreen");
        
        //Oceania Dot
        var oceaniaDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["Oceania"] / numSongsBottom)))
                        .attr("cx", 440)
                        .attr("cy", 340)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "oceaniaDotGreen");
        
        //Scandinavia Dot
        var scandinaviaDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["Scandinavia"] / numSongsBottom)))
                        .attr("cx", 40)
                        .attr("cy", 40)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "scandinaviaDotGreen");
        
        //South America Dot
        var southAmericaDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["South America"] / numSongsBottom)))
                        .attr("cx", 780)
                        .attr("cy", 260)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "southAmericaDotGreen");
        
        //South East Dot
        var southEastDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["South East"] / numSongsBottom)))
                        .attr("cx", 730)
                        .attr("cy", 155)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "southEastDotGreen");
        
        //South West Dot
        var southWestDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["South West"] / numSongsBottom)))
                        .attr("cx", 660)
                        .attr("cy", 145)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "southWestDotGreen");
        
        //Southeast Asia Dot
        var southeastAsiaDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["Southeast Asia"] / numSongsBottom)))
                        .attr("cx", 300)
                        .attr("cy", 200)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "southeastAsiaDotGreen");
        
        //Southern Africa Dot
        var southernAfricaDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["Southern Africa"] / numSongsBottom)))
                        .attr("cx", 65)
                        .attr("cy", 330)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "southernAfricaDotGreen");
        
        //West Dot
        var westDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["West"] / numSongsBottom)))
                        .attr("cx", 630)
                        .attr("cy", 130)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "westDotGreen");
        
        //Western Europe Dot
        var westernEuropeDotGreen = mapCanvas.append("circle")
                        .attr("r", (250 * (bottomYearData["Western Europe"] / numSongsBottom)))
                        .attr("cx", 940)
                        .attr("cy", 90)
                        .attr("fill", "rgba(0, 128, 0, 0.5)")
                        .attr("id", "westernEuropeDotGreen");
        
    }); 
    
    
    d3.csv("data/location/" + genre1Selected + ".csv", function(error, data){
       
        
        //Get this year
        var topYear = $('#topCurrent').text();
        var bottomYear = $('#bottomCurrent').text();
        
        var topYearData = (_.where(data, {Year: topYear}))[0];
        var numSongsTop = parseInt($('#numSongs1').text());
        
        var bottomYearData = (_.where(data, {Year: bottomYear}))[0];
        var numSongsBottom = parseInt($('#numSongs2').text());
        
        
        //Asia Dot
        var asiaDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData.Asia / numSongsTop)))
                        .attr("cx", 250)
                        .attr("cy", 160)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "asiaDot");
        
        //Canada Dot
        var canadaDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData.Canada / numSongsTop)))
                        .attr("cx", 690)
                        .attr("cy", 90)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "canadaDot");
        
        //Caribbean Dot
        var caribbeanDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData.Caribbean / numSongsTop)))
                        .attr("cx", 740)
                        .attr("cy", 190)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "caribbeanDot");
        
        //Central Asia Dot
        var centralAsiaDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["Central Asia"] / numSongsTop)))
                        .attr("cx", 220)
                        .attr("cy", 160)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "centralAsiaDot");
        
        //Eastern Europe Dot
        var easternEuropeDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["Eastern Europe"] / numSongsTop)))
                        .attr("cx", 50)
                        .attr("cy", 110)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "easternEuropeDot");
        
        //Mediterranean Europe Dot
        var mediterraneanDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData.Mediterranean / numSongsTop)))
                        .attr("cx", 35)
                        .attr("cy", 120)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "mediterraneanDot");
        
        //Mexico Dot
        var mexicoDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData.Mexico / numSongsTop)))
                        .attr("cx", 690)
                        .attr("cy", 190)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "mexicoDot");
        
        //Middle East Dot
        var middleEastDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["Middle East"] / numSongsTop)))
                        .attr("cx", 110)
                        .attr("cy", 170)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "middleEastDot");
        
        //Midwest Dot
        var midwestDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["Midwest"] / numSongsTop))) 
                        .attr("cx", 710)
                        .attr("cy", 130)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "midwestDot");
        
        //North East Dot
        var northEastDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["North East"] / numSongsTop)))
                        .attr("cx", 750)
                        .attr("cy", 135)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "northEastDot");
        
        //Oceania Dot
        var oceaniaDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["Oceania"] / numSongsTop)))
                        .attr("cx", 440)
                        .attr("cy", 340)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "oceaniaDot");
        
        //Scandinavia Dot
        var scandinaviaDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["Scandinavia"] / numSongsTop)))
                        .attr("cx", 40)
                        .attr("cy", 40)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "scandinaviaDot");
        
        //South America Dot
        var southAmericaDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["South America"] / numSongsTop)))
                        .attr("cx", 780)
                        .attr("cy", 260)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "southAmericaDot");
        
        //South East Dot
        var southEastDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["South East"] / numSongsTop)))
                        .attr("cx", 730)
                        .attr("cy", 155)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "southEastDot");
        
        //South West Dot
        var southWestDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["South West"] / numSongsTop)))
                        .attr("cx", 660)
                        .attr("cy", 145)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "southWestDot");
        
        //Southeast Asia Dot
        var southeastAsiaDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["Southeast Asia"] / numSongsTop)))
                        .attr("cx", 300)
                        .attr("cy", 200)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "southeastAsiaDot");
        
        //Southern Africa Dot
        var southernAfricaDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["Southern Africa"] / numSongsTop)))
                        .attr("cx", 65)
                        .attr("cy", 330)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "southernAfricaDot");
        
        //West Dot
        var westDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["West"] / numSongsTop)))
                        .attr("cx", 630)
                        .attr("cy", 130)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "westDot");
        
        //Western Europe Dot
        var westernEuropeDot = mapCanvas.append("circle")
                        .attr("r", (250 * (topYearData["Western Europe"] / numSongsTop)))
                        .attr("cx", 940)
                        .attr("cy", 90)
                        .attr("fill", "rgba(70, 130, 180, 0.5)")
                        .attr("id", "westernEuropeDot");
        
    });
    
};

mapDots();

var mapDotsUpdate = function() {
    //Get this year
    var topYear = $('#topCurrent').text();
    var bottomYear = $('#bottomCurrent').text();

    
    d3.csv("data/location/" + genre2Selected + ".csv", function(error, data){
    
        
        var bottomYearData = (_.where(data, {Year: bottomYear}))[0];
        var numSongsBottom = parseInt($('#numSongs2').text());
        //Update the dots////////////////////////////
        //Asia Dot
        d3.select("#asiaDotGreen")
                    .transition()
                    .duration(200)
                    .attr("r", (250 * (bottomYearData.Asia / numSongsBottom)));
                  
        //Canada Dot
        d3.select("#canadaDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData.Canada / numSongsBottom)));
        
        //Caribbean Dot
        d3.select("#caribbeanDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData.Caribbean / numSongsBottom)));
        
        //Central Asia Dot
        d3.select("#centralAsiaDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["Central Asia"] / numSongsBottom)));
        
        //Eastern Europe Dot
        d3.select("#easternEuropeDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["Eastern Europe"] / numSongsBottom)));
        
        //Mediterranean Europe Dot
        d3.select("#mediterraneanDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData.Mediterranean / numSongsBottom)));
        
        //Mexico Dot
        d3.select("#mexicoDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData.Mexico / numSongsBottom)));
        
        //Middle East Dot
        d3.select("#middleEastDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["Middle East"] / numSongsBottom)));
        
        //Midwest Dot
        d3.select("#midwestDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["Midwest"] / numSongsBottom)));
        
        //North East Dot
        d3.select("#northEastDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["North East"] / numSongsBottom)));
        
        //Oceania Dot
        d3.select("#oceaniaDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["Oceania"] / numSongsBottom)));
        
        //Scandinavia Dot
        d3.select("#scandinaviaDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["Scandinavia"] / numSongsBottom)));
        
        //South America Dot
        d3.select("#southAmericaDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["South America"] / numSongsBottom)));
        
        //South East Dot
        d3.select("#southEastDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["South East"] / numSongsBottom)));
        
        //South West Dot
        d3.select("#southWestDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["South West"] / numSongsBottom)));
        
        //Southeast Asia Dot
        d3.select("#southeastAsiaDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["Southeast Asia"] / numSongsBottom)));
        
        //Southern Africa Dot
        d3.select("#southernAfricaDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["Southern Africa"] / numSongsBottom)));
        
        //West Dot
        d3.select("#westDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["West"] / numSongsBottom)));
        
        //Western Europe Dot
        d3.select("#westernEuropeDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (bottomYearData["Western Europe"] / numSongsBottom)));

    });
    
    //////Blue Parties  
    d3.csv("data/location/" + genre1Selected + ".csv", function(error, data){
    
        var topYearData = (_.where(data, {Year: topYear}))[0];
        var numSongsTop = parseInt($('#numSongs1').text());
        
        
        //Update the dots////////////////////////////
        //Asia Dot
  
            //Asia Dot
            d3.select("#asiaDotGreen")
                        .transition()
                        .duration(200)
                        .attr("r", (250 * (topYearData.Asia / numSongsTop)));

            //Canada Dot
            d3.select("#canadaDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData.Canada / numSongsTop)));

            //Caribbean Dot
            d3.select("#caribbeanDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData.Caribbean / numSongsTop)));

            //Central Asia Dot
            d3.select("#centralAsiaDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["Central Asia"] / numSongsTop)));

            //Eastern Europe Dot
            d3.select("#easternEuropeDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["Eastern Europe"] / numSongsTop)));

            //Mediterranean Europe Dot
            d3.select("#mediterraneanDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData.Mediterranean / numSongsTop)));

            //Mexico Dot
            d3.select("#mexicoDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData.Mexico / numSongsTop)));

            //Middle East Dot
            d3.select("#middleEastDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["Middle East"] / numSongsTop)));

            //Midwest Dot
            d3.select("#midwestDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["Midwest"] / numSongsTop)));

            //North East Dot
            d3.select("#northEastDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["North East"] / numSongsTop)));

            //Oceania Dot
            d3.select("#oceaniaDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["Oceania"] / numSongsTop)));

            //Scandinavia Dot
            d3.select("#scandinaviaDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["Scandinavia"] / numSongsTop)));

            //South America Dot
            d3.select("#southAmericaDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["South America"] / numSongsTop)));

            //South East Dot
            d3.select("#southEastDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["South East"] / numSongsTop)));

            //South West Dot
            d3.select("#southWestDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["South West"] / numSongsTop)));

            //Southeast Asia Dot
            d3.select("#southeastAsiaDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["Southeast Asia"] / numSongsTop)));

            //Southern Africa Dot
            d3.select("#southernAfricaDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["Southern Africa"] / numSongsTop)));

            //West Dot
            d3.select("#westDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["West"] / numSongsTop)));

            //Western Europe Dot
            d3.select("#westernEuropeDot")
                            .transition()
                            .duration(200)
                            .attr("r", (250 * (topYearData["Western Europe"] / numSongsTop)));
        
        
        
    });
};







