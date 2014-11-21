var words1 = "I've got another confession to make I'm your fool Everyone\'s got their chains to break Holdin\' you Were you born to resist or be abused? Is someone getting the best, the best, the best, the best of you? Is someone getting the best, the best, the best, the best of you? Are you gone and onto someone new? I needed somewhere to hang my head Without your noose You gave me something that I didn't have But had no use I was too weak to give in Too strong to lose My heart is under arrest again But I break loose My head is giving me life or death But I can\'t choose I swear I\'ll never give in I refuse Is someone getting the best, the best, the best, the best of you? Is someone getting the best, the best, the best, the best of you? Has someone taken your faith? Its real, the pain you feel You trust, you must Confess Is someone getting the best, the best, the best, the best of you? Oh... Oh... Oh... Oh... Oh... Has someone taken your faith? Its real, the pain you feel The life, the love you\'d die to heal The hope that starts the broken hearts You trust, you must Confess Is someone getting the best, the best, the best, the best of you? Is someone getting the best, the best, the best, the best of you? I\'ve got another confession my friend I\'m no fool I\'m getting tired of starting again Somewhere newWere you born to resist or be abused? I swear I'll never give in I refuse Is someone getting the best, the best, the best, the best of you? Is someone getting the best, the best, the best, the best of you? Has someone taken your faith? Its real, the pain you feel You trust, you must Confess Is someone getting the best, the best, the best, the best of you? Oh...";

var stopWords = ["i", "I", "in", "to", "the", "Is"];

var wordsUnedited = words1.split(' ');

var edititedWords = function(){
                        for (i in stopWords) {
                            for (p in stopWords){
                                if (wordsUnedited[i] == stopWords[p]){
                                   wordsUnedited.splice(i , 1); 
                                };
                            };
                        };
                        console.log(wordsUnedited);
    
};

edititedWords();
                    





 
        var fill = d3.scale.category20();
      d3.layout.cloud().size([300, 300])
          .words(wordsUnedited.map(function(d) {
            return {text: d, size: 10 + Math.random() * 90};
          }))
          .padding(5)
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          .font("Impact")
          .fontSize(function(d) { return d.size; })
          .on("end", draw)
          .start();

      function draw(words) {
        d3.select("#genre1cloud").append("svg")
            .attr("width", 300)
            .attr("height", 300)
          .append("g")
            .attr("transform", "translate(150,150)")
          .selectAll("text")
            .data(words)
          .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
      };


      d3.layout.cloud().size([300, 300])
          .words([
            "Hello", "world", "normally", "you", "want", "more", "words",
            "than", "this"].map(function(d) {
            return {text: d, size: 10 + Math.random() * 90};
          }))
          .padding(5)
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          .font("Impact")
          .fontSize(function(d) { return d.size; })
          .on("end", draw2)
          .start();

      function draw2(words) {
        d3.select("#genre2cloud").append("svg")
            .attr("width", 300)
            .attr("height", 300)
          .append("g")
            .attr("transform", "translate(150,150)")
          .selectAll("text")
            .data(words)
          .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
      };

