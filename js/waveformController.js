
    ///////////////////////////////////
    //GetData Function//////////////////////////
    ///////////////////////////////////
    /*
    d3.csv('data/PopResults.csv', function(data) {
    
        var tableHead = $('#tableHead');
        for (i = 40; i < 240;){
              tableHead.append("<th>" + i + "</th>");
            i += 5;
        };
        
        console.log(data);
        for (y = 1960; y < 2015; y++){
            var year = (y).toString();
            var thisYear = _.where(data, {Year: year});
            var durationValues = _.pluck(thisYear, 'Tempo');

            var durChunks = _.countBy(durationValues, function(num) {
                for (i = 40; i < 240;) {
                    if (num < i) {
                        return i;
                        break;
                    };
                    i += 5;
                };
            });
            console.log(durChunks);
            

            var dataTable = $('#dataTable');

            dataTable.append("<tr id ='" + year + "'></tr>");
            $("#" + year).append("<td>" + year + "</td>");

            dataTable
            for (i = 40; i < 240; i+=5){
                if(durChunks.hasOwnProperty(i)){
                    $("#" + year).append("<td>" + durChunks[i] + "</td>");

                    


                }else{
                    
                    $("#" + year).append("<td>" + 0 + "</td>");

                };
            };
        };
        
    
        
    });
*/

///////////////////////////////////
//PlotWav//////////////////////////
///////////////////////////////////

//Top Waves
$('#wave1').append('<div id="durationTop" class="waveform"></div>');
$('#wave1').append('<div id="loudnessTop" class="waveform"></div>');
$('#wave1').append('<div id="tempoTop" class="waveform"></div>');
$('#wave1').append('<div id="hotnessTop" class="waveform"></div>');

//Labels
$('#wave1').append('<div class="waveformLabel">Duration</div>');
$('#wave1').append('<div class="waveformLabel">Loudness</div>');
$('#wave1').append('<div class="waveformLabel">Tempo</div>');
$('#wave1').append('<div class="waveformLabel">Hotness</div>'); 

//Bottom Waves
$('#wave1').append('<div id="durationBottom" class="waveform"></div>');
$('#wave1').append('<div id="loudnessBottom" class="waveform"></div>');
$('#wave1').append('<div id="tempoBottom" class="waveform"></div>');
$('#wave1').append('<div id="hotnessBottom" class="waveform"></div>'); 

var durationTop = d3.select('#durationTop').append("svg").attr("width", "100%").attr("height", 200);
var loudnessTop = d3.select('#loudnessTop').append("svg").attr("width", "100%").attr("height", 200);
var tempoTop = d3.select('#tempoTop').append("svg").attr("width", "100%").attr("height", 200);
var hotnessTop = d3.select('#hotnessTop').append("svg").attr("width", "100%").attr("height", 200);
var durationBottom = d3.select('#durationBottom').append("svg").attr("width", "100%").attr("height", 200);
var loudnessBottom = d3.select('#loudnessBottom').append("svg").attr("width", "100%").attr("height", 200);
var tempoBottom = d3.select('#tempoBottom').append("svg").attr("width", "100%").attr("height", 200);
var hotnessBottom = d3.select('#hotnessBottom').append("svg").attr("width", "100%").attr("height", 200);




var wavePlot = function() {

    
    
    
    
    //Plot the duration values for top
    d3.csv('data/waveform/' + genre1Selected +'/duration.csv', function(data) {
        //Get the data for the years
        var numSongsTop = parseInt($('#numSongs1').text());
        var topYear = $('#topCurrent').text();
        var durData = _.where(data, {Year: topYear});
        delete durData[0]["Year"];
        
        
        var durValues = _.values(durData[0]);
        
        
        
        durationTop.selectAll('rect').data(durValues)
            .enter()
            .append('rect')
            .attr("x", function(d, i) { return 4 * i;})
            .attr("y", function(d) { return 200 - ((d/numSongsTop) * 1600);})
            .attr("height", function(d) { return (d/numSongsTop) * 1600;})
            .attr("width", 3.75)
            .style('fill', '#113757')
            .attr("class", "topBars");
        
        //Update Functions
        $('#start, #end').click(function() {
            d3.csv('data/waveform/' + genre1Selected + '/duration.csv', function(data) {
                var numSongsTop = parseInt($('#numSongs1').text());
                var topYear = $('#topCurrent').text();

                var durData = _.where(data, {Year: topYear});
                delete durData[0]["Year"];

                var durValues = _.values(durData[0]);
                //Update all rects
                        durationTop.selectAll("rect")
                                .data(durValues)
                                    .transition()
                                    .duration(2000)
                                    .attr("y", function(d) { return 200 - ((d/numSongsTop) * 1600);})
                                    .attr("height", function(d) { return (d/numSongsTop) * 1600;});
            });
        });
    });
    
    //Plot the duration values for Bottom
    d3.csv('data/waveform/' + genre2Selected + '/duration.csv', function(data) {
        //Get the data for the years
        var numSongsBottom = parseInt($('#numSongs2').text());
        var bottomYear = $('#bottomCurrent').text();
        var durData = _.where(data, {Year: bottomYear});
        delete durData[0]["Year"];
        
        
        var durValues = _.values(durData[0]);
        
        
        
        durationBottom.selectAll('rect').data(durValues)
            .enter()
            .append('rect')
            .attr("x", function(d, i) { return 4 * i;})
            .attr("y", 0)
            .attr("height", function(d) { return (d/numSongsBottom) * 1600;})
            .attr("width", 3.75)
            .style('fill', '#1e5711')
            .attr("class", "bottomBars");
        
        //Update Functions
        $('#start, #end').click(function() {
            d3.csv('data/waveform/' + genre2Selected + '/duration.csv', function(data) {
                var numSongsBottom = parseInt($('#numSongs2').text());
                var bottomYear = $('#bottomCurrent').text();

                var durData = _.where(data, {Year: bottomYear});
            

                var durValues = _.values(durData[0]);
                //Update all rects
                        durationBottom.selectAll("rect")
                                .data(durValues)
                                    .transition()
                                    .duration(2000)
                                    .attr("height", function(d) { return (d/numSongsBottom) * 1600;});
            });
        });
    });
    

    
    //Plot the loudness values for top
    d3.csv('data/waveform/' + genre1Selected + '/loudness.csv', function(data) {
        var numSongsTop = parseInt($('#numSongs1').text());
        var topYear = $('#topCurrent').text();
        var loudData = _.where(data, {Year: topYear});
        delete loudData[0]["Year"];
        
        
        var loudValues = _.values(loudData[0]);
        

        
        loudnessTop.selectAll('bars').data(loudValues)
            .enter()
            .append('rect')
            .attr("x", function(d, i) { return 4 * i;})
            .attr("y", function(d) { return 200 - ((d/numSongsTop) * 1600);})
            .attr("height", function(d) { return (d/numSongsTop) *1600;})
            .attr("width", 3.74)
            .style('fill', 'rgb(42, 83, 118)')
            .attr("class", "topBars");
        
        //Update Functions
        $('#start, #end').click(function() {
            var numSongsTop = parseInt($('#numSongs1').text());
            d3.csv('data/waveform/' + genre1Selected  + '/loudness.csv', function(data) {
                var topYear = $('#topCurrent').text();

                var loudData = _.where(data, {Year: topYear});
                


                var loudValues = _.values(loudData[0]);
                //Update all rects
                        loudnessTop.selectAll("rect")
                                .data(loudValues)
                                    .transition()
                                    .duration(2000)
                                    .attr("y", function(d) { return 200 - ((d/numSongsTop) * 1600);})
                                    .attr("height", function(d) { return (d/numSongsTop) * 1600;});
            });
        });
        
    });
    
    //Plot the loudness values for Bottom
    d3.csv('data/waveform/' + genre2Selected + '/loudness.csv', function(data) {
        var numSongsBottom = parseInt($('#numSongs2').text());
        var bottomYear = $('#bottomCurrent').text();
        var loudData = _.where(data, {Year: bottomYear});
        delete loudData[0]["Year"];
        
        
        var loudValues = _.values(loudData[0]);
        

        
        loudnessBottom.selectAll('bars').data(loudValues)
            .enter()
            .append('rect')
            .attr("x", function(d, i) { return 4 * i;})
            .attr("y", 0)
            .attr("height", function(d) { return (d/numSongsBottom) *1600;})
            .attr("width", 3.74)
            .style('fill', '#3b762e')
            .attr("class", "topBars");
        
        //Update Functions
        $('#start, #end').click(function() {
            var numSongsBottom = parseInt($('#numSongs2').text());
            d3.csv('data/waveform/' + genre2Selected + '/loudness.csv', function(data) {
                var bottomYear = $('#bottomCurrent').text();

                var loudData = _.where(data, {Year: bottomYear});
                delete loudData[0]["Year"];


                var loudValues = _.values(loudData[0]);
                //Update all rects
                        loudnessBottom.selectAll("rect")
                                .data(loudValues)
                                    .transition()
                                    .duration(2000)
                                    .attr("y", 0)
                                    .attr("height", function(d) { return (d/numSongsBottom) * 1600;});
            });
        });
        
    });
    
    //Plot the tempo values for top
    d3.csv('data/waveform/' + genre1Selected + '/tempo.csv', function(data) {
        var numSongsTop = parseInt($('#numSongs1').text());
        var topYear = $('#topCurrent').text();
        var tempoData = _.where(data, {Year: topYear});
        delete tempoData[0]["Year"];
        
        var tempoValues = _.values(tempoData[0]);
        
        tempoTop.selectAll('bars').data(tempoValues)
            .enter()
            .append('rect')
            .attr("x", function(d, i) { return 4 * i;})
            .attr("y", function(d) { return 200 - ((d/numSongsTop) * 1600);})
            .attr("height", function(d) { return (d/numSongsTop) * 1600;})
            .attr("width", 3.75)
            .style('fill', 'rgb(80, 117, 150)')
            .attr("class", "topBars");
        
        //Update Functions
        $('#start, #end').click(function() {
            var numSongsTop = parseInt($('#numSongs1').text());
            d3.csv('data/waveform/' + genre1Selected + '/tempo.csv', function(data) {
                var topYear = $('#topCurrent').text();

                var tempoData = _.where(data, {Year: topYear});
                delete tempoData[0]["Year"];


                var tempoValues = _.values(tempoData[0]);
                //Update all rects
                        tempoTop.selectAll("rect")
                                .data(tempoValues)
                                    .transition()
                                    .duration(2000)
                                    .attr("y", function(d) { return 200 - ((d/numSongsTop) * 1600);})
                                    .attr("height", function(d) { return (d/numSongsTop) * 1600;});
            });
        });
        
    });
    
    //Plot the tempo values for bottom
    d3.csv('data/waveform/' + genre2Selected + '/tempo.csv', function(data) {
        var numSongsBottom = parseInt($('#numSongs2').text());
        var bottomYear = $('#bottomCurrent').text();
        var tempoData = _.where(data, {Year: bottomYear});
        delete tempoData[0]["Year"];
        
        var tempoValues = _.values(tempoData[0]);
        
        tempoBottom.selectAll('bars').data(tempoValues)
            .enter()
            .append('rect')
            .attr("x", function(d, i) { return 4 * i;})
            .attr("y", 0)
            .attr("height", function(d) { return (d/numSongsBottom) * 1600;})
            .attr("width", 3.75)
            .style('fill', 'rgb(64, 134, 72)')
            .attr("class", "topBars");
        
        //Update Functions
        $('#start, #end').click(function() {
            var numSongsBottom = parseInt($('#numSongs2').text());
            d3.csv('data/waveform/'+ genre2Selected + '/tempo.csv', function(data) {
                var bottomYear = $('#bottomCurrent').text();

                var tempoData = _.where(data, {Year: bottomYear});
                delete tempoData[0]["Year"];


                var tempoValues = _.values(tempoData[0]);
                //Update all rects
                        tempoBottom.selectAll("rect")
                                .data(tempoValues)
                                    .transition()
                                    .duration(2000)
                                    .attr("y", 0)
                                    .attr("height", function(d) { return (d/numSongsBottom) * 1600;});
            });
        });
        
    });
    
    //Plot the hotness values for top
    d3.csv('data/waveform/' + genre1Selected + '/hotness.csv', function(data) {
        var numSongsTop = parseInt($('#numSongs1').text());
        var topYear = $('#topCurrent').text();
        var hotnessData = _.where(data, {Year: topYear});
        delete hotnessData[0]["Year"];
        
        
        var hotnessValues = _.values(hotnessData[0]);
        
        hotnessTop.selectAll('bars').data(hotnessValues)
            .enter()
            .append('rect')
            .attr("x", function(d, i) { return 4 * i;})
            .attr("y", function(d) { return 200 - ((d/numSongsTop) * 1600);})
            .attr("height", function(d) { return (d/numSongsTop) * 1600;})
            .attr("width", 3.75)
            .style('fill', 'rgb(101, 138, 172)')
            .attr("class", "topBars");
        
        //Update Functions
        $('#start, #end').click(function() {
            var numSongsTop = parseInt($('#numSongs1').text());
            d3.csv('data/waveform/' + genre1Selected + '/hotness.csv', function(data) {
                var topYear = $('#topCurrent').text();

                var hotnessData = _.where(data, {Year: topYear});
                delete hotnessData[0]["Year"];


                var hotnessValues = _.values(hotnessData[0]);
                //Update all rects
                        hotnessTop.selectAll("rect")
                                .data(hotnessValues)
                                    .transition()
                                    .duration(2000)
                                    .attr("y", function(d) { return 200 - ((d/numSongsTop) * 1600);})
                                    .attr("height", function(d) { return (d/numSongsTop) * 1600;});
            });
        });
        
    });
    
    //Plot the hotness values for Bottom
    d3.csv('data/waveform/' + genre2Selected + '/hotness.csv', function(data) {
        var numSongsBottom = parseInt($('#numSongs2').text());
        var bottomYear = $('#bottomCurrent').text();
        var hotnessData = _.where(data, {Year: bottomYear});
        delete hotnessData[0]["Year"];
        
        
        var hotnessValues = _.values(hotnessData[0]);
        
        hotnessBottom.selectAll('bars').data(hotnessValues)
            .enter()
            .append('rect')
            .attr("x", function(d, i) { return 4 * i;})
            .attr("y", 0)
            .attr("height", function(d) { return (d/numSongsBottom) * 1600;})
            .attr("width", 3.75)
            .style('fill', '#549a45')
            .attr("class", "topBars");
        
        //Update Functions
        $('#start, #end').click(function() {
            var numSongsBottom = parseInt($('#numSongs2').text());
            d3.csv('data/waveform/' + genre2Selected + '/hotness.csv', function(data) {
                var bottomYear = $('#bottomCurrent').text();

                var hotnessData = _.where(data, {Year: bottomYear});
                delete hotnessData[0]["Year"];


                var hotnessValues = _.values(hotnessData[0]);
                //Update all rects
                        hotnessBottom.selectAll("rect")
                                .data(hotnessValues)
                                    .transition()
                                    .duration(2000)
                                    .attr("y", 0)
                                    .attr("height", function(d) { return (d/numSongsBottom) * 1600;});
            });
        });
        
    });
    
    

    
    
    

    
};


wavePlot();

        
var waveUpdate = function(){
    
 
    
    d3.csv('data/waveform/' + genre1Selected + '/duration.csv', function(data) {

        var numSongsTop = parseInt($('#numSongs1').text());
        var topYear = $('#topCurrent').text();
        
        var durData = _.where(data, {Year: topYear});
        delete durData[0]["Year"];
        
        var durValues = _.values(durData[0]);
        var durationTop = d3.select('#durationTop');
        var numSongsTop = parseInt($('#numSongs1').text());
        //Update all rects
        durationTop.selectAll("rect")
                .data(durValues)
                    .transition()
                    .duration(200)
                    .attr("y", function(d) { return 200 - ((d/numSongsTop) * 1600);})
                    .attr("height", function(d) { return (d/numSongsTop) * 1600;});
        
        
    });
    
    d3.csv('data/waveform/' + genre2Selected + '/duration.csv', function(data) {

        var numSongsBottom = parseInt($('#numSongs2').text());
        var bottomYear = $('#bottomCurrent').text();
        
        var durData = _.where(data, {Year: bottomYear});
        delete durData[0]["Year"];
        
        var durValues = _.values(durData[0]);
        var durationBottom = d3.select('#durationBottom');
        var numSongsBottom = parseInt($('#numSongs2').text());
        //Update all rects
        durationBottom.selectAll("rect")
                .data(durValues)
                    .transition()
                    .duration(200)
                    .attr("height", function(d) { return (d/numSongsBottom) * 1600;});
        
        
    });
    
    d3.csv('data/waveform/' + genre1Selected + '/loudness.csv', function(data) {
        var topYear = $('#topCurrent').text();
        
        var loudData = _.where(data, {Year: topYear});
        delete loudData[0]["Year"];
        
        var loudValues = _.values(loudData[0]);
        var loudTop = d3.select('#loudnessTop');
        var numSongsTop = parseInt($('#numSongs1').text());
        //Update all rects
        loudTop.selectAll("rect")
                .data(loudValues)
                    .transition()
                    .duration(200)
                    .attr("y", function(d) { return 200 - ((d/numSongsTop) * 1600);})
                    .attr("height", function(d) { return (d/numSongsTop) * 1600;});
        
        
    });
    
    d3.csv('data/waveform/' + genre2Selected + '/loudness.csv', function(data) {
        var bottomYear = $('#bottomCurrent').text();
        
        var loudData = _.where(data, {Year: bottomYear});
        delete loudData[0]["Year"];
        
        var loudValues = _.values(loudData[0]);
        var loudBottom = d3.select('#loudnessBottom');
        var numSongsBottom = parseInt($('#numSongs2').text());
        //Update all rects
        loudBottom.selectAll("rect")
                .data(loudValues)
                    .transition()
                    .duration(200)
                    .attr("y", 0)
                    .attr("height", function(d) { return (d/numSongsBottom) * 1600;});
        
        
    });
    
    d3.csv('data/waveform/' + genre1Selected + '/tempo.csv', function(data) {
        var topYear = $('#topCurrent').text();
        
        var tempoData = _.where(data, {Year: topYear});
        delete tempoData[0]["Year"];
        
        var tempoValues = _.values(tempoData[0]);
        var tempoTop = d3.select('#tempoTop');
        var numSongsTop = parseInt($('#numSongs1').text());
        //Update all rects
        tempoTop.selectAll("rect")
                .data(tempoValues)
                    .transition()
                    .duration(200)
                    .attr("y", function(d) { return 200 - ((d/numSongsTop) * 1600);})
                    .attr("height", function(d) { return (d/numSongsTop) * 1600;});
        
        
    });
    
    d3.csv('data/waveform/' + genre2Selected + '/tempo.csv', function(data) {
        var bottomYear = $('#bottomCurrent').text();
        
        var tempoData = _.where(data, {Year: bottomYear});
        delete tempoData[0]["Year"];
        
        var tempoValues = _.values(tempoData[0]);
        var tempoBottom = d3.select('#tempoBottom');
        var numSongsBottom = parseInt($('#numSongs2').text());
        //Update all rects
        tempoBottom.selectAll("rect")
                .data(tempoValues)
                    .transition()
                    .duration(200)
                    .attr("y", 0)
                    .attr("height", function(d) { return (d/numSongsBottom) * 1600;});
        
        
    });
    
    d3.csv('data/waveform/' + genre1Selected +'/hotness.csv', function(data) {
        var topYear = $('#topCurrent').text();
        
        var hotnessData = _.where(data, {Year: topYear});
        delete hotnessData[0]["Year"];
        
        var hotnessValues = _.values(hotnessData[0]);
        var hotnessTop = d3.select('#hotnessTop');
        var numSongsTop = parseInt($('#numSongs1').text());
        //Update all rects
        hotnessTop.selectAll("rect")
                .data(hotnessValues)
                    .transition()
                    .duration(200)
                    .attr("y", function(d) { return 200 - ((d/numSongsTop) * 1600);})
                    .attr("height", function(d) { return (d/numSongsTop) * 1600;});
        
        
    });
    
    d3.csv('data/waveform/' + genre2Selected + '/hotness.csv', function(data) {
        var bottomYear = $('#bottomCurrent').text();
        
        var hotnessData = _.where(data, {Year: bottomYear});
        delete hotnessData[0]["Year"];
        
        var hotnessValues = _.values(hotnessData[0]);
        var hotnessBottom = d3.select('#hotnessBottom');
        var numSongsBottom = parseInt($('#numSongs2').text());
        //Update all rects
        hotnessBottom.selectAll("rect")
                .data(hotnessValues)
                    .transition()
                    .duration(200)
                    .attr("y", 0)
                    .attr("height", function(d) { return (d/numSongsBottom) * 1600;});
        
        
    });
    
};







