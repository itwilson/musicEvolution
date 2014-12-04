///////////////////////////////
//Function to get Genre Changes
///////////////////////////////
$('document').ready(function() {
            $('#genre1').on('change', function(){
                var genreSelect1;
                genreSelect1 = $( "#genre1 option:selected" ).text();
                var select = genreSelect1;
                if(select = "Rock") {
                    $('.topBars').css("color", "steelblue");
                    $('#genre1').css("background-color", "steelblue");
                    $('#genre1').css("color", "white");
                }else if(select = "Pop"){
                    $('.topBars').css("color", "steelblue");
                    $('#genre1').css("background-color", "rgb(0, 100, 0)");
                };

            });

            $('#genre2').change(function(){
                var genreSelect2;
                genreSelect2 = $("#genre2 option:selected").text();
                var select = genreSelect2;
                
                if(select = "Pop"){
                    $('.topBars').css("color", "steelblue");
                    $('#genre2').css("background-color", "rgb(0, 100, 0)");
                    $('#genre2').css("color", "white");
                };

            });
        });    


///////////////////////////////
//Function to get the data
///////////////////////////////

var getData = function(displaySelect){
    d3.csv('data/metaData.csv', function(data) {

        
        if (displaySelect == 1){
            thisYear = $('#topCurrent').text();
        }else if(displaySelect == 2){
            thisYear = $('#bottomCurrent').text();
        };
        
        //Get the year
        var year = _.where(data, {Year:thisYear});
        console.log();
        //Set number of songs
        $('#numSongs' + displaySelect).text(year[0].Songs);

        //Set Average Length
        //var lengthArray = _.pluck(year, 'Duration');
        //convert to integers
        //for(var i=lengthArray.length; i--;) lengthArray[i] = lengthArray[i]|0;
        //var lengthMean = (d3.mean(lengthArray)).toFixed(2);
        //var minutes = Math.floor(lengthMean / 60);
        //var seconds = Math.floor(lengthMean % 60);
        //if (seconds < 10){
        //    seconds = "0" + seconds;
        //}
        $('#averageDur' + displaySelect).text(year[0].Duration);

        //Get the Average Loudness
        //var loudArray = _.sortBy((_.pluck(year, 'Loudness')));
        //for(var i=loudArray.length; i--;) loudArray[i] = loudArray[i]|0;
        //var loudMean = (d3.mean(loudArray)).toFixed(2);
        $('#averageLoud' + displaySelect).text(year[0].Loudness + " dB");

        //Get the Average Temp
        //var tempoArray = _.sortBy((_.pluck(year, 'Tempo')));
        //for(var i=tempoArray.length; i--;) tempoArray[i] = tempoArray[i]|0;
        //var tempoMean = (d3.mean(tempoArray)).toFixed(2);
        $('#averageTempo' + displaySelect).text(year[0].Tempo + " BPM");

        //Get the Average Hotness
        //var hotnessArray = _.sortBy((_.pluck(year, 'Hotness')));
        //for(var i=hotnessArray.length; i--;) hotnessArray[i] = hotnessArray[i] / 1;

        //var hotnessMean = (d3.mean(hotnessArray)).toFixed(2);
        $('#averageHotness' + displaySelect).text(year[0].Hotness);

    });
};

getData(1);
getData(2);
