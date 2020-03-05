/* 
Script for the energy piechart datavisualisation for DGTL festival
Based on the example of Nadine Fischoff (http://bl.ocks.org/nadinesk/99393098950665c471e035ac517c2224)
Edited for this context by DGTL x AMS LL
*/

var div = d3.select("body").append("div").attr("class", "toolTip");
var dataset = [
	{ id: "Green energy", name: 'Grid', total: 10965, percent: 33.0 },
	{ id: "Green energy", name: 'Batteries', total: 15345, percent: 46.2 },
	{ id: "Green energy", name: 'Biogas Generator', total: 908, percent: 2.7 },
	{ id: "Grey energy", name: 'Generators (back-up)', total: 6020, percent: 18.1 }
];

var width = 960,
    height = 600,
    radius = Math.min(width, height) / 2;

// Legend squares sizes
const legSqr = 20;
const legSpace = 10;

var colors = d3.scale.ordinal()
    .range(["#0F740E", "#6A6C6A", "#7b6888", "#6b486b", "#a05d56"]);

// Pie size
const pieWidth = 250;
const pieHeight = 250;
const pieRadius = Math.min(pieWidth, pieHeight);

var arc = d3.svg.arc()
    .outerRadius(pieRadius - 80)
    .innerRadius(80);

var pie = d3.layout.pie()
    .sort(null)
	.startAngle(1.1*Math.PI)
    .endAngle(3.1*Math.PI)
    .value(function(d) { return d.total; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // add title to svg
    svg.append("text")
    .attr("x", 0 )
    .attr("y", -200)
    .attr('class', 'title')
    .style("text-anchor", "middle")
    .text("Different energy sources used");

// Legend top
const legendGroupTop = svg.append('g')
	.attr('width', width)
	.attr('height', 100)
	.attr('transform','translate(-300, 200)');

 var g = svg.selectAll(".arc")
      .data(pie(dataset))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
	.style("fill", function(d) { return colors(d.data.id); })
    .transition().delay(function(d,i) {
	return i * 500; }).duration(500)
	.attrTween('d', function(d) {
		var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
		return function(t) {
			d.endAngle = i(t); 
			return arc(d)
			}
		}); 
  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
	  .transition()
	  .delay(1000)
      .text(function(d) { return d.data.name; });

	d3.selectAll("path").on("mousemove", function(d) {
	    div.style("left", d3.event.pageX+10+"px");
		  div.style("top", d3.event.pageY-25+"px");
		  div.style("display", "inline-block");
    div.html((d.data.name)+"<br>"+(d.data.total) + " kWh" + "<br>"+(d.data.percent) + "%");
});
	  
d3.selectAll("path").on("mouseout", function(d){
    div.style("display", "none");
});

// Legend
const legend = legendGroupTop.selectAll('.legend')
	.data(colors.domain())
	.enter()
	.append('g')
	.attr('class', 'legend')
	.attr('transform', (d,i) => {
		const legHeight = legSqr + legSpace * 5;
		const offset = legHeight * colors.domain().length / 2;
		const horz = legSqr;
		const vert = i * (legHeight + 50);
		return 'translate(' + vert +  ',' + horz + ')';
	});

// Legend squares
legend.append('rect')
	.attr('width', legSqr * 3)
	.attr('height', legSqr)
	.attr('fill', colors);

// Legend text
legend.append('text')
	.attr('x', legSqr - (legSpace + 10))
	.attr('y', legSqr + (legSpace * 2.2))
	.text((d) => { return d; });

	  
//d3.select("body").transition().style("background-color", "#d3d3d3");
function type(d) {
  d.total = +d.total;
  return d;
}