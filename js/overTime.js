var overtimeGraphs = function() {
    $('#durationTime').empty();
    $('#loudnessTime').empty();
    $('#tempoTime').empty();
    $('#hotnessTime').empty();
    $('#durationTime').text('Duration');
    $('#loudnessTime').text('Loudness');
    $('#tempoTime').text('Tempo');
    $('#hotnessTime').text('Hotness');
    
    //Append the canvas'
    var durationCanvas = d3.select('#durationTime').append('svg')
                                        .attr("width", "300px")
                                        .attr("id", "durCanvas")
                                        .attr("height", "200px")
                                        .style("display", "block");


    var loudnessCanvas = d3.select('#loudnessTime').append('svg')
                                        .attr("width", "300px")
                                        .attr("id", "loudCanvas")
                                        .attr("height", "200px")
                                        .style("display", "block");   

    var tempoCanvas = d3.select('#tempoTime').append('svg')
                                        .attr("width", "300px")
                                        .attr("id", "tempoCanvas")
                                        .attr("height", "200px")
                                        .style("display", "block");

    var hotnessCanvas = d3.select('#hotnessTime').append('svg')
                                        .attr("width", "300px")
                                        .attr("id", "hotCanvas")
                                        .attr("height", "200px")
                                        .style("display", "block");

    //Append a line for each year Top
    d3.csv('data/overTime/' + genre1Selected +'.csv', function(error, data) {

        //Get the data in the right formats
        //Duration
        var durationData = _.pluck(data, "Duration");
        var durLine = [];
        for (i = 0; i < durationData.length; i++){
            durationData[i] = durationData[i].split(":");
            durationData[i] = parseInt(durationData[i][0] * 60) + parseInt(durationData[i][1]);
            durLine.push({'x':i, 'y':durationData[i]});
        };


        //Loudness
        var loudnessData = _.pluck(data, "Loudness");
        var loudLine = [];
        for (i = 0; i < loudnessData.length; i++){
            loudnessData[i] = parseFloat(loudnessData[i]);
            loudLine.push({'x':i, 'y':loudnessData[i]});
        };

        //Tempo
        var tempoData = _.pluck(data, "Tempo");
        var tempoLine = [];
        for (i = 0; i < tempoData.length; i++){
            tempoData[i] = parseFloat(tempoData[i]);
            tempoLine.push({'x':i, 'y':tempoData[i]});
        };



        //Hotness
        var hotnessData = _.pluck(data, "Hotness");
        var hotLine = [];
        for (i = 0; i < hotnessData.length; i++){
            hotnessData[i] = parseFloat(hotnessData[i]);
            hotLine.push({'x':i, 'y':hotnessData[i]});
        };


        //Plot decades
        for (dec = 0; dec < 7; dec++){
            durationCanvas.append("rect")
                            .attr("width", 50)
                            .attr("height", 200)
                            .attr("x", dec * 50)
                            .attr("fill", function(){
                                    if (dec % 2 != 0){
                                        return "white";   
                                    }else{
                                        return "lightgrey";
                                    };
            });

            loudnessCanvas.append("rect")
                            .attr("width", 50)
                            .attr("height", 200)
                            .attr("x", dec * 50)
                            .attr("fill", function(){
                                    if (dec % 2 != 0){
                                        return "white";   
                                    }else{
                                        return "lightgrey";
                                    };
            });

            tempoCanvas.append("rect")
                            .attr("width", 50)
                            .attr("height", 200)
                            .attr("x", dec * 50)
                            .attr("fill", function(){
                                    if (dec % 2 != 0){
                                        return "white";   
                                    }else{
                                        return "lightgrey";
                                    };
            });

            hotnessCanvas.append("rect")
                            .attr("width", 50)
                            .attr("height", 200)
                            .attr("x", dec * 50)
                            .attr("fill", function(){
                                    if (dec % 2 != 0){
                                        return "white";   
                                    }else{
                                        return "lightgrey";
                                    };
            });
        };


        //Duration Graph
        var durLineFunction = d3.svg.line()
                            .x(function(d) { return (d.x) * 5; })
                            .y(function(d) { return 200 - ((d.y) / 2); })
                            .interpolate("linear");

        var durLineGraph = durationCanvas.append("path")
                                .attr("d", durLineFunction(durLine))
                                .attr("stroke", "steelblue")
                                .attr("stroke-width", 2)
                                .attr("fill", "none");

        //Loudness Graph
        var loudLineFunction = d3.svg.line()
                            .x(function(d) { return (d.x) * 5; })
                            .y(function(d) { return 10 * (Math.abs(d.y)); })
                            .interpolate("linear");

        var loudLineGraph = loudnessCanvas.append("path")
                                .attr("d", loudLineFunction(loudLine))
                                .attr("stroke", "steelblue")
                                .attr("stroke-width", 2)
                                .attr("fill", "none");

        //Tempo Graph
        var tempoLineFunction = d3.svg.line()
                            .x(function(d) { return (d.x) * 5; })
                            .y(function(d) { return (d.y) / 2; })
                            .interpolate("linear");

        var tempoLineGraph = tempoCanvas.append("path")
                                .attr("d", tempoLineFunction(tempoLine))
                                .attr("stroke", "steelblue")
                                .attr("stroke-width", 2)
                                .attr("fill", "none");

        //Hotness Graph
        var hotLineFunction = d3.svg.line()
                            .x(function(d) { return (d.x) * 5; })
                            .y(function(d) { return 200 - ((d.y) * 250); })
                            .interpolate("linear");

        var hotLineGraph = hotnessCanvas.append("path")
                                .attr("d", hotLineFunction(hotLine))
                                .attr("stroke", "steelblue")
                                .attr("stroke-width", 2)
                                .attr("fill", "none");


        //Play Lines Top
        var durTimeTop = durationCanvas.append("line")
                                .attr("x1", 0)
                                .attr("x2", 0)
                                .attr("y1", 0)
                                .attr("y2", 200)
                                .attr("stroke", "steelblue")
                                .attr("stroke-width", "3px")
                                .attr("id", "durTimeTop");

        var loudTimeTop = loudnessCanvas.append("line")
                                .attr("x1", 0)
                                .attr("x2", 0)
                                .attr("y1", 0)
                                .attr("y2", 200)
                                .attr("stroke", "steelblue")
                                .attr("stroke-width", "3px")
                                .attr("id", "loudTimeTop");

        var tempoTimeTop = tempoCanvas.append("line")
                                .attr("x1", 0)
                                .attr("x2", 0)
                                .attr("y1", 0)
                                .attr("y2", 200)
                                .attr("stroke", "steelblue")
                                .attr("stroke-width", "3px")
                                .attr("id", "tempoTimeTop");

        var hotTimeTop = hotnessCanvas.append("line")
                                .attr("x1", 0)
                                .attr("x2", 0)
                                .attr("y1", 0)
                                .attr("y2", 200)
                                .attr("stroke", "steelblue")
                                .attr("stroke-width", "3px")
                                .attr("id", "hotTimeTop");

    });

    //Append a line for each year Top
    d3.csv('data/overTime/' + genre2Selected +'.csv', function(error, data) {

        //Get the data in the right formats
        //Duration
        var durationData = _.pluck(data, "Duration");
        var durLine = [];

        for (i = 0; i < durationData.length; i++){

            if (durationData[i].contains(":")){
                durationData[i] = durationData[i].split(":");
                durationData[i] = parseInt(durationData[i][0] * 60) + parseInt(durationData[i][1]);
            };
            durLine.push({'x':i, 'y':durationData[i]});
        };


        //Loudness
        var loudnessData = _.pluck(data, "Loudness");
        var loudLine = [];
        for (i = 0; i < loudnessData.length; i++){
            loudnessData[i] = parseFloat(loudnessData[i]);
            loudLine.push({'x':i, 'y':loudnessData[i]});
        };

        //Tempo
        var tempoData = _.pluck(data, "Tempo");
        var tempoLine = [];
        for (i = 0; i < tempoData.length; i++){
            tempoData[i] = parseFloat(tempoData[i]);
            tempoLine.push({'x':i, 'y':tempoData[i]});
        };



        //Hotness
        var hotnessData = _.pluck(data, "Hotness");
        var hotLine = [];
        for (i = 0; i < hotnessData.length; i++){
            hotnessData[i] = parseFloat(hotnessData[i]);
            hotLine.push({'x':i, 'y':hotnessData[i]});
        };

        //Duration Graph
        var durLineFunction = d3.svg.line()
                            .x(function(d) { return (d.x) * 5; })
                            .y(function(d) { return 200 - ((d.y) / 2); })
                            .interpolate("linear");

        var durLineGraph = durationCanvas.append("path")
                                .attr("d", durLineFunction(durLine))
                                .attr("stroke", "#1B5C1B")
                                .attr("stroke-width", 2)
                                .attr("fill", "none");

        //Loudness Graph
        var loudLineFunction = d3.svg.line()
                            .x(function(d) { return (d.x) * 5; })
                            .y(function(d) { return 10 * (Math.abs(d.y)); })
                            .interpolate("linear");

        var loudLineGraph = loudnessCanvas.append("path")
                                .attr("d", loudLineFunction(loudLine))
                                .attr("stroke", "#1B5C1B")
                                .attr("stroke-width", 2)
                                .attr("fill", "none");

        //Tempo Graph
        var tempoLineFunction = d3.svg.line()
                            .x(function(d) { return (d.x) * 5; })
                            .y(function(d) { return (d.y) / 2; })
                            .interpolate("linear");

        var tempoLineGraph = tempoCanvas.append("path")
                                .attr("d", tempoLineFunction(tempoLine))
                                .attr("stroke", "#1B5C1B")
                                .attr("stroke-width", 2)
                                .attr("fill", "none");

        //Hotness Graph
        var hotLineFunction = d3.svg.line()
                            .x(function(d) { return (d.x) * 5; })
                            .y(function(d) { return 200 - ((d.y) * 250); })
                            .interpolate("linear");

        var hotLineGraph = hotnessCanvas.append("path")
                                .attr("d", hotLineFunction(hotLine))
                                .attr("stroke", "#1B5C1B")
                                .attr("stroke-width", 2)
                                .attr("fill", "none");




        //Play Lines Bottom
        var durTimeBottom = durationCanvas.append("line")
                                .attr("x1", 0)
                                .attr("x2", 0)
                                .attr("y1", 0)
                                .attr("y2", 200)
                                .attr("stroke", "#1B5C1B")
                                .attr("stroke-width", "3px")
                                .attr("id", "durTimeBottom");

        var loudTimeBottom = loudnessCanvas.append("line")
                                .attr("x1", 0)
                                .attr("x2", 0)
                                .attr("y1", 0)
                                .attr("y2", 200)
                                .attr("stroke", "#1B5C1B")
                                .attr("stroke-width", "3px")
                                .attr("id", "loudTimeBottom");

        var tempoTimeBottom = tempoCanvas.append("line")
                                .attr("x1", 0)
                                .attr("x2", 0)
                                .attr("y1", 0)
                                .attr("y2", 200)
                                .attr("stroke", "#1B5C1B")
                                .attr("stroke-width", "3px")
                                .attr("id", "tempoTimeBottom");

        var hotTimeBottom = hotnessCanvas.append("line")
                                .attr("x1", 0)
                                .attr("x2", 0)
                                .attr("y1", 0)
                                .attr("y2", 200)
                                .attr("stroke", "#1B5C1B")
                                .attr("stroke-width", "3px")
                                .attr("id", "hotTimeBottom");

    });
};
overtimeGraphs();

var overTimeUpdate = function() {
    var topCurrent = $('#topCurrent').text();
    var bottomCurrent = $('#bottomCurrent').text();
    
    var topTime = ((parseInt(topCurrent)) - 1960) * 5; 
    var bottomTime = ((parseInt(bottomCurrent)) - 1960) * 5;
    
    //SVG's are 300 wide
    d3.select("#durTimeTop")
            .transition()
            .duration(150)
            .attr("x1", topTime)
            .attr("x2", topTime);
    
    d3.select("#loudTimeTop")
            .transition()
            .duration(150)
            .attr("x1", topTime)
            .attr("x2", topTime);
    
    d3.selectAll("#tempoTimeTop")
            .transition()
            .duration(150)
            .attr("x1", topTime)
            .attr("x2", topTime);
    
    d3.select("#hotTimeTop")
            .transition()
            .duration(150)
            .attr("x1", topTime)
            .attr("x2", topTime);
    
    //SVG's are 300 wide
    d3.select("#durTimeBottom")
            .transition()
            .duration(150)
            .attr("x1", bottomTime)
            .attr("x2", bottomTime);
    
    d3.select("#loudTimeBottom")
            .transition()
            .duration(150)
            .attr("x1", bottomTime)
            .attr("x2", bottomTime);
    
    d3.selectAll("#tempoTimeBottom")
            .transition()
            .duration(150)
            .attr("x1", bottomTime)
            .attr("x2", bottomTime);
    
    d3.select("#hotTimeBottom")
            .transition()
            .duration(150)
            .attr("x1", bottomTime)
            .attr("x2", bottomTime);
};

overTimeUpdate();
