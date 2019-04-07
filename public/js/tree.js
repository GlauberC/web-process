var diagonal = d3.svg.diagonal()
.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select(".treeSvg").append("svg")
.attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .call(d3.behavior.zoom()
    .scaleExtent([0.4, 3])
    .on("zoom", function() {
        svg.attr("transform", "translate(" + d3.event.translate +
            ")scale(" + d3.event.scale + ")");
    })).on("dblclick.zoom", null)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


