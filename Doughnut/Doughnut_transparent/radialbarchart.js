/*
Script for the stacked barchart  datavisualisation for DGTL festival that accompagnies the doughnut
Based on the example of Brice Pierre de la Briere (https://bl.ocks.org/bricedev/8aaef92e64007f882267)
Edited for this context by DGTL x AMS LL
*/

// data for stacked barchart
var dataFiles = {'CO2': 'CO2-doughnut.csv',
                'NOx': 'NOx-doughnut.csv',
                'Chemical pollution': 'Chemical-doughnut.csv',
                'Fresh water use': 'wastewater-doughnut.csv',
                'Residual waste': 'waste-doughnut.csv'};
var width = 500,
    height = 500,
    barHeight = height / 2 - 30;

var svg2 = d3.select("#stackedbarchart").selectAll("svg")

var dataFile;

var formatNumber = d3.format("s");

var color = d3.scaleOrdinal()
    .range(["#f3272a", "#f10f00", "#c90e00", "#a20800", "#7d0300"]);

var svg = d3.select('#doughnut').append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

d3.csv("impactdata-doughnut.csv", function(error, data) {
  // create extent of values
  var extentMin = 0.01;
  var extentMax = 4;
  var extent = [extentMin, extentMax];
  var barScale = d3.scaleLinear()
      .domain(extent)
      .range([0, barHeight]);

// on click function here
  var keys = data.map(function(d,i) {
  return d.name; });
  var numBars = keys.length;

  var x = d3.scaleLinear()
      .domain(extent)
      .range([0, -barHeight]);

  var xAxis = d3.axisLeft(x)
      .ticks(3)
      .tickFormat(formatNumber);

  var arc = d3.arc()
      .startAngle(function(d,i) { return (i * 2 * Math.PI) / numBars; })
      .endAngle(function(d,i) { return ((i + 1) * 2 * Math.PI) / numBars; })
      .innerRadius(0);

  // creates the doughnut segments, all hovers/click functions need to come here
  var segments = svg.selectAll("path")
          .data(data)
        .enter().append("path")
      .attr("class", "segments")
      .attr("id", function (d) {
          return d.name;
      })
      .on("mouseover", function(d) {
          d3.select(this).attr("r", 10).style("opacity", 0.5);
          })
      .on("mouseout", function(d) {
          d3.select(this).attr("r", 5).style("opacity", 1);
      })
      // Draw the barchart and append the title accordingly
      .on("click", function(d){
        var dataFile = dataFiles[d.name];
        d3.csv(dataFile, function(error, data){
            var input = {'data': data, 'width': 450, 'height': 300};
            canvas = setUpSvgCanvas(input);
            drawBars(input, canvas);
            appendTitle(d.name);
            appendAxisTitle(d.name);
            // show the percentage
            $('#toggleBox').show();
        });
        })
          .each(function(d) { d.outerRadius = 0; })
          .style("fill", function (d) {
            return color(d.name); })
          .attr("d", arc);
/*      .on("click", doughnutSelected);*/

  var circle = svg.selectAll("circle")
          .data(x.ticks(4))
        .enter().append("circle")
          .attr("r", function(d) {
          return barScale(d);})
      // add ids for different circles
        .attr("id", function(d,i) {
          return "circle-" + i; });


  segments.transition().ease(d3.easeLinear).duration(1000).delay(function(d,i) {
      return (25-i)*100;
  })
  .attrTween("d", function(d,index) {
    var i = d3.interpolate(d.outerRadius, barScale(+d.value));
    return function(t) { d.outerRadius = i(t); return arc(d,index); };
  });


  svg.append("circle")
      .attr("r", barHeight)
      .classed("outer", true)
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width","1.5px");

  var lines = svg.selectAll("line")
      .data(keys)
    .enter().append("line")
      .attr("y2", -barHeight - 20)
      .style("stroke-width",".5px")
      .attr("transform", function(d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

  // Labels
  var labelRadius = barHeight * 1.025;

  var labels = svg.append("g")
      .classed("labels", true)

  labels.append("def")
        .append("path")
        .attr("id", "label-path")
        .attr("d", "m0 " + -labelRadius + " a" + labelRadius + " " + labelRadius + " 0 1,1 -0.01 0");

  labels.selectAll("text")
        .data(keys)
      .enter().append("text")
        .style("text-anchor", "middle")
        .style("fill", function(d, i) {return "#3e3e3e";})
        .append("textPath")
        .attr("xlink:href", "#label-path")
        .attr("startOffset", function(d, i) {return i * 100 / numBars + 50 / numBars + '%';})
        .text(function(d) {return d.toUpperCase(); })
});
