//Stepper
    $('#topLeftBound').draggable({ 
                    containment: "parent", 
                    axis: "x",
                    drag: function( event, ui ) {
                        //Get the right position
                        var valRight = $('#topRightBound').css('left').replace(/px/g,'');
                        var valLeft = $('#topLeftBound').css('left').replace(/px/g,'');
                        var newWidth = valRight - valLeft;
                    
                        $('#topRange').css({
                            marginLeft: parseFloat(valLeft),
                            width: newWidth
                        });
                        
                
                        
                        var date = Math.floor((valLeft / 10) + 1960);
                        $('#topStart').text(date);
                    }
    });
    $('#topRightBound').draggable({ 
                    containment: "parent", 
                    axis: "x",
                    drag: function( event, ui ) {
                        //Get the right position
                        var valRight = $('#topRightBound').css('left').replace(/px/g,'');
                        var valLeft = $('#topLeftBound').css('left').replace(/px/g,'');
                        var newWidth = valRight - valLeft;
                      
                        $('#topRange').css({
                            width: newWidth
                        });
                        var date = Math.floor((valRight / 10) + 1960);
                        $('#topEnd').text(date);
                    }
    });
    $('#bottomLeftBound').draggable({ 
                    containment: "parent", 
                    axis: "x",
                    drag: function( event, ui ) {
                        //Get the right position
                        var valRight = $('#bottomRightBound').css('left').replace(/px/g,'');
                        var valLeft = $('#bottomLeftBound').css('left').replace(/px/g,'');
                        var newWidth = valRight - valLeft;
                        $('#bottomRange').css({
                            marginLeft: parseFloat(valLeft),
                            width: newWidth
                        });
                        
                        var date = Math.floor((valLeft / 10) + 1960);
                        $('#bottomStart').text(date);
                    }
    });
    $('#bottomRightBound').draggable({ 
                    containment: "parent", 
                    axis: "x",
                    drag: function( event, ui ) {
                        //Get the right position
                        var valRight = $('#bottomRightBound').css('left').replace(/px/g,'');
                        var valLeft = $('#bottomLeftBound').css('left').replace(/px/g,'');
                        var newWidth = valRight - valLeft;
                        $('#bottomRange').css({
                            width: newWidth
                        });
                        var date = Math.floor((valRight / 10) + 1960);
                        $('#bottomEnd').text(date);
                    }
    });

    $('#playCursorTop').draggable({ containment: "#playbar", 
                                    axis: "x",
                                    drag: function( event, ui ) {
                                        var newPosition = $('#playCursorTop').css('left').replace(/px/g,'');
                                        var newValue = Math.floor((parseFloat(newPosition) / 10) + 1960);
                                        $('#topCurrent').text(newValue);  
                                    }
                                  });
    $('#playCursorBottom').draggable({ containment: "#playbar", axis: "x" });
    

    
    
    
    var playSpeed = 5;
    
    //Number of Decades
    var numDecades = 6;

    //Define Top Start Point
    var topStart = 0;

    //Define Top End Point
    var topEnd = 495;

    //Define Bottom Start Point
    var bottomStart = 0;

    //Define Bottom End Point
    var bottomEnd = 495;
    
    //Play Function
    $('#play').click(function() {
        //Grab the end position for the top
        var startPositionTop = $('#topLeftBound').css('left').replace(/px/g,'');
        $("#playCursorTop").css('left', startPositionTop);
        //Grab the end position for the top
        var endPositionTop = $('#topRightBound').css('left').replace(/px/g,'');
        var changePositionTop = (endPositionTop - startPositionTop);
        $("#playCursorTop").animate({
            left: endPositionTop +'px',
        }, {
            
            duration: playSpeed * 1000,
            step: function() {
                currentPositionTop = parseFloat($('#playCursorTop').css('left')) + 50;
                var newPositionTop = Math.floor((startPositionTop / 50));
                var newPosition = $('#playCursorTop').css('left').replace(/px/g,'');
                var newValue = Math.floor((parseFloat(newPosition) / 10) + 1960);
                $('#topCurrent').text(newValue); 
                $('#stageNum').text(newPositionTop);
            },
            easing:'linear'
            }
                                
        );
        
        var startPositionBottom = $('#bottomLeftBound').css('left').replace(/px/g,'');
        $("#playCursorBottom").css('left', startPositionBottom);
        //Grab the end for the bottom
        var endPositionBottom = $('#bottomRightBound').css('left').replace(/px/g,'');
        var changePositionBottom = (endPositionBottom - startPositionBottom);
        $("#playCursorBottom").animate({
            left: endPositionBottom +'px',
        }, {
            
            duration: playSpeed * 1000,
            step: function() {
                startPositionBottom = parseFloat($('#playCursorBottom').css('left')) + 50;
                var newPositionBottom = Math.floor((startPositionBottom / 50));
                var newPosition = $('#playCursorBottom').css('left').replace(/px/g,'');
                var newValue = Math.floor((parseFloat(newPosition) / 10) + 1960);
                $('#bottomCurrent').text(newValue); 
                $('#stageNum').text(newPositionBottom);
            },
            easing:'linear'
            }
                                
        );
    });
    
    
    $('#start').click(function() {
        
        topStart = ($('#topStart').text() - 1960) * 10;
        bottomStart = ($('#bottomStart').text() - 1960) * 10;
        $("#playCursorTop").css('left', topStart);
        $('#playCursorBottom').css('left', bottomStart);
        $('#stageNum').text('1');
        var newPosition = $('#playCursorTop').css('left').replace(/px/g,'');
        var newValue = Math.floor((parseFloat(newPosition) / 10) + 1960);
        $('#topCurrent').text(newValue); 
        var newPositionBottom = $('#playCursorBottom').css('left').replace(/px/g,'');
        var newValueBottom = Math.floor((parseFloat(newPositionBottom) / 10) + 1960);
        $('#bottomCurrent').text(newValueBottom); 
    });

    $('#end').click(function() {
        topEnd = ($('#topEnd').text() - 1960) * 10;
        bottomEnd = ($('#bottomEnd').text() - 1960) * 10;
        $("#playCursorTop").css('left', topEnd);
        $('#playCursorBottom').css('left', bottomEnd);
        $('#stageNum').text('10');
        var newPosition = $('#playCursorTop').css('left').replace(/px/g,'');
        var newValue = Math.floor((parseFloat(newPosition) / 10) + 1960);
        $('#topCurrent').text(newValue);
        var newPositionBottom = $('#playCursorBottom').css('left').replace(/px/g,'');
        var newValueBottom = Math.floor((parseFloat(newPositionBottom) / 10) + 1960);
        $('#bottomCurrent').text(newValueBottom); 
    });

    $('#next').click(function() {
        var currentPosition = $('#playCursor').css('left').replace(/\D/g,'');
        var newPosition = ((currentPosition / 50) * 50) + 50;
        var currentStage = Math.floor(newPosition/50)+1
        if (currentPosition < 475) {
            $('#playCursor').css('left', newPosition);
            $('#stageNum').text(Math.floor(newPosition/50)+1);
        };
    });

    $('#back').click(function() {
        var currentPosition = $('#playCursor').css('left').replace(/\D/g,'');
        var newPosition = ((currentPosition / 50) * 50) - 50;
        var currentStage = Math.floor(newPosition/50) + 1;
        if (currentPosition > 25) {
            $('#playCursor').css('left', newPosition);
            $('#stageNum').text(Math.floor(newPosition/50)+1);
        };
    });

    //Stage identify
    var stageNum = $('#stageNum').text();
    
    
    var stopButton = function() {
        $('#playCursorTop').stop( false, false);
        $('#playCursorBottom').stop( false, false);
    };


    $('.decade').click(function() {
        var thisId = $(this).attr('id');
        var decade = thisId.slice(0,4);
        var tOrB = thisId.slice(5);
        
        if (tOrB == 'Top'){
            topStart = ((decade - 1960) * 10);
            topEnd = topStart + 99;
            $('#topLeftBound').css('left', topStart ); 
            $('#topRange').css({
                            marginLeft: topStart + 'px',
                            width: topEnd - topStart + 'px'
            });
            $('#topRightBound').css('left', topEnd );
            $('#topStart').text((topStart / 10) + 1960);
            $('#topEnd').text(Math.floor((topEnd / 10) + 1960));
        }else{
            bottomStart = ((decade - 1960) * 10);
            bottomEnd = bottomStart + 99;
            $('#bottomLeftBound').css('left', bottomStart ); 
            $('#bottomRange').css({
                            marginLeft: bottomStart + 'px',
                            width: bottomEnd - bottomStart + 'px'
            });
            $('#bottomRightBound').css('left', bottomEnd );
            $('#bottomStart').text((bottomStart / 10) + 1960);
            $('#bottomEnd').text(Math.floor((bottomEnd / 10) + 1960));
        };
    });