var width = 350,
    height = 350,
    barHeight = height / 2 - 30;

var formatNumber = d3.format("s");

var color = d3.scaleOrdinal()
    .range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3"]);

var svg = d3.select('#doughnut').append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

d3.csv("data.csv", function(error, data) {
  // create extent of values
  var extentMin = 0.01;
  var extentMax = 4;
  var extent = [extentMin, extentMax];
  var barScale = d3.scaleLinear()
      .domain(extent)
      .range([0, barHeight]);

// on click function here
  var keys = data.map(function(d,i) {
  //console.log(d.name);
  return d.name; });
  var numBars = keys.length;

  var x = d3.scaleLinear()
      .domain(extent)
      .range([0, -barHeight]);

  var xAxis = d3.axisLeft(x)
      .ticks(3)
      .tickFormat(formatNumber);

  var circle = svg.selectAll("circle")
          .data(x.ticks(4))
        .enter().append("circle")
          .attr("r", function(d) {
          return barScale(d);})
      // add ids for different circles
        .attr("id", function(d,i) {
          return "circle-" + i; });

  var arc = d3.arc()
      .startAngle(function(d,i) { return (i * 2 * Math.PI) / numBars; })
      .endAngle(function(d,i) { return ((i + 1) * 2 * Math.PI) / numBars; })
      .innerRadius(0);

  var segments = svg.selectAll("path")
          .data(data)
        .enter().append("path")
      .attr("class", "segments")
      .attr("id", function (d) {
          return d.name;
      })
      .on("click", function(d){
        console.log(d.name);
        return d.name;
        })
          .each(function(d) { d.outerRadius = 0; })
          .style("fill", function (d) {
            return color(d.name); })
          .attr("d", arc);


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
      .style("stroke", "black")
      .style("stroke-width",".5px")
      .attr("transform", function(d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

  svg.append("g")
    .attr("class", "x axis")
    .call(xAxis);

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
        .style("font-weight","bold")
        .style("fill", function(d, i) {return "#3e3e3e";})
        .append("textPath")
        .attr("xlink:href", "#label-path")
        .attr("startOffset", function(d, i) {return i * 100 / numBars + 50 / numBars + '%';})
        .text(function(d) {return d.toUpperCase(); })
});

