//View Selection
infovisApp.controller('viewController', function($scope) {
    function AppCtrl ($scope) {
              $scope.getPartial = function () {
                  return "'partial/waveform.html'";
              };
                console.log("got Here");
              
            };
    });
    
    $('#viewSelect1').change(function () {
        var valSelected = $( "#viewSelect1 option:selected" ).text();
        var viewSelect = $('#view1');
        console.log(valSelected);
        if (valSelected=="Waveform"){
            viewSelect.load("partial/waveform.html");
        }else if (valSelected=="Location"){
            viewSelect.load("partial/location.html");
            console.log('sent ' + valSelected);  
        }else if (valSelected=="Lyrics"){
            viewSelect.load("partial/lyrics.html");
            console.log('sent ' + valSelected);  
        }else if (valSelected=="Subgenres"){
            viewSelect.load("partial/subgenres.html");
            console.log('sent ' + valSelected);  
        }else if (valSelected=="OverTime"){
            viewSelect.load("partial/overTime.html");
            console.log('sent ' + valSelected);  
        };
    });

    $('#viewSelect2').change(function () {
        var valSelected = $( "#viewSelect2 option:selected" ).text();
        var viewSelect = $('#view2');
        console.log(valSelected);
        if (valSelected=="Waveform"){
            viewSelect.load("partial/waveform.html");
        }else if (valSelected=="Location"){
            viewSelect.load("partial/location.html");
            console.log('sent ' + valSelected);  
        }else if (valSelected=="Lyrics"){
            viewSelect.load("partial/lyrics.html");
            console.log('sent ' + valSelected);  
        }else if (valSelected=="Subgenres"){
            viewSelect.load("partial/subgenres.html");
            console.log('sent ' + valSelected);  
        }else if (valSelected=="OverTime"){
            viewSelect.load("partial/overTime.html");
            console.log('sent ' + valSelected);  
        };
    });