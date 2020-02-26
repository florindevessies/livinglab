/* 
Script for the radial barchart datavisualisation for DGTL festival
Based on the example of Mike Bostock (https://gist.github.com/mbostock/6fead6d1378d6df5ae77bb6a719afcb2#file-data-csv)
Edited for this context by DGTL x AMS LL
*/

// Create the SVG
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    innerRadius = 100,
    outerRadius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// create divNode for the hover
var divNode = d3.select("body").node();

var x = d3.scaleBand()
    .range([0, 2 * Math.PI])
    .align(0);

var y = d3.scaleRadial()
    .range([innerRadius, outerRadius]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// load in the dataset, iterating over all rows for all columns
// replace by test_data
d3.csv("test_data.csv", function(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data) {
  if (error) throw error;
  console.log(data);
// Replace by d.Impact
  x.domain(data.map(function(d) { return d.Impact; }));
  // create the maximum value of the outer range
  y.domain([0, d3.max(data, function(d) { return d.total + 300; })]);
  z.domain(data.columns.slice(10));

// Make sure the hover works!
  var defs = svg.append("defs");
var filter = defs.append("filter")
                .attr("id", "drop-shadow")
                .attr("height","130%");

// create shadow/blur around the pie parts
filter.append("feGaussianBlur")
        .attr("in","SourceAlpha")
        .attr("stdDeviation", 8)
        .attr("result", "blur");

filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 3)
    .attr("dy", 3)
    .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

/*  var idu = svg.append("idu");
  var unique = idu.append("unique")
  .attr("id", 'drop-shadow');*/
console.log(g.data(d3.stack().keys(data.columns.slice(1))(data)));
  // drawing the bars
  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(data.columns.slice(1))(data))
    .enter().append("g")
      .attr("fill", function(d) { 
        return z(d.key); })
    .selectAll("path")
    // I want to append the key to the parts of the g, so I can select these
    .data(function(d) { 
      console.log(d.key)
      return d; })
    .enter().append("path")
      .attr("d", d3.arc()
          .innerRadius(function(d) { return y(d[0]); })
          .outerRadius(function(d) { return y(d[1]); })
          .startAngle(function(d) { return x(d.data.Impact); })
          .endAngle(function(d) { return x(d.data.Impact) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))
    .on("mousemove", function(d) {
          d3.select(this)
          // add stroke around the parts (white in this case)
              .attr("stroke","#fff")
              .attr("stroke-width","2px")
              .style("filter", "url(#drop-shadow)")
              .append("g:title")
              .text(function(d) { 
                res = ""; 
                Object.keys(d.data).forEach(function(key, idx){
                  res += key + ": " +  d.data[key] + "\n"; 
                }); 

              return res }); 
           var mousePos = d3.mouse(divNode);
            d3.select("#mainTooltip")
              .style("left", mousePos[0] - 40 + "px")
              .style("top", mousePos[1] - 70 + "px")
              .select("#value")
              .attr("text-anchor", "middle")
              //.html(d.data.str_lab + "<br />" + d.data.num);

            d3.select("#mainTooltip").classed("hidden", false);
        })
      .on("mouseout", function(d){
          d3.select(this)
              .attr("stroke","none")
              .style("filter","none");
          d3.select(this)
            .transition()
            .duration(500)
            //.ease('bounce')
            .attr('transform','translate(0,0)');

          d3.select("#mainTooltip").classed("hidden", true);
      })
      .on("click", function() 
        { window.open("https://dgtl.nl/select-your-edition/"); 
        //$(location).attr('href', url);
        //window.location = url;    
    });


      // creating ALL labels
  var label = g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("text-anchor", "middle")
      // create text location in the middle
      .attr("transform", function(d) { return "rotate(" + ((x(d.Impact) + x.bandwidth() / 2) * 180 / Math.PI - 90) +
       ")translate(" + innerRadius + ",0)"; });

      // adding small line at the beginning of the label
  label.append("line")
      .attr("x2", -5)
      .attr("stroke", "#000");
  // adding actual text as labels  
  label.append("text")
      .attr("transform", function(d) { 
        console.log(d);
        return (x(d.Impact) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,16)" : "rotate(-90)translate(0,-9)"; })
      .text(function(d) { return d.Impact; });

  // create location for text in the middle
  var yAxis = g.append("g")
      .attr("text-anchor", "middle");

      console.log("BLAAAAA",y, y.ticks(2));
  var yTick = yAxis
    .selectAll("g")
    // create number of circles!
    .data([100])
    .enter().append("g");

  // draw the circles
  yTick.append("circle")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", "10px")
      .attr("on:hover", "stroke:green")
      .attr("r", y);

  yTick.append("text")
      .attr("y", function(d) { 
        console.log (d);
        return -y(d); })
      .attr("dy", "0.35em")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 5)
      .text(y.tickFormat(5, "s"));

  yTick.append("text")
      .attr("y", function(d) { return -y(d); })
      .attr("dy", "0.35em")
      .text(y.tickFormat(5, "s"));

  yAxis.append("text")
      .attr("y", function(d) { return -y(y.ticks(10).pop()); })
      .attr("dy", "-1em")
      .text("Impact");

  var legend = g.append("g")
    .selectAll("g")
    .data(data.columns.slice(1).reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(-40," + (i - (data.columns.length - 1) / 2) * 20 + ")"; });

  // add text to rectangle
  legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", z);
  // add text to legend 
  legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text(function(d) { return d; });
});

console.log(d3.select('path'));   

$(document).ready(() => {

    $('path').click(function(evt){
      var elm = $(evt.target); 
      elm.attr('stroke', 'red'); 
  });
}); 

$(document).ready(function(){
  $("button").click(function(){
    alert("Image width: " + $("img").attr("width"));
  });
});
