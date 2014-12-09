var genre1Selected = "Rock";
var genre2Selected = "Pop";


$('#genre1').change(function(){
    newGenre = $('#genre1').val();
    genre1Selected = newGenre;
    
    
    getData();
        if (typeof waveUpdate == 'function') { 
                                            
                                          waveUpdate(); 
                                        };
        if (typeof treemapPlot == 'function') { 
                                          
                                          treemapPlot(); 
                                        };
        if (typeof mapDotsUpdate == 'function') {
                                        mapDotsUpdate();  
                };
        if (typeof overTimeUpdate == 'function') {
                                        overTimeUpdate();  
                };
        if (typeof lyricsUpdate == 'function') {
                                        lyricsUpdate();  
                                        };
        overtimeGraphs();
});

$('#genre2').change(function(){
    newGenre = $('#genre2').val();
    genre2Selected = newGenre;
    
    
    getData();
        if (typeof waveUpdate == 'function') { 
                                            
                                          waveUpdate(); 
                                        };
        if (typeof treemapPlot == 'function') { 
                                          
                                          treemapPlot(); 
                                        };
        if (typeof mapDotsUpdate == 'function') {
                                        mapDotsUpdate();  
                };
        if (typeof overTimeUpdate == 'function') {
                                        overTimeUpdate();  
                };
        if (typeof lyricsUpdate == 'function') {
                                        lyricsUpdate();  
                                        };
        overtimeGraphs();
});