/*
Script for the resources sankey  datavisualisation for DGTL festival
Based on the example of Alex Holachek (https://bl.ocks.org/aholachek/5df1a95afe871be868360f312d35d057)
Edited for this context by DGTL x AMS LL
*/

var margin = {
        top: 1,
        right: 1,
        bottom: 6,
        left: 1
      },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var formatNumber = d3.format(",.0f"),
      format = function(d) {
        return formatNumber(d) + " tonnes";
      },
      color = d3.scale.category20();

    var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var sankey = d3.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .size([width, height]);

    var path = sankey.link();
/*
    var drag = d3.behavior.drag()
    .on("drag", dragmove);*/


    d3.json("Resources.json", function(resources) {

      sankey
        .nodes(resources.nodes)
        .links(resources.links)
        .layout(32);

      function setDash(d) {
        var d3this = d3.select(this);
        var totalLength = d3this.node().getTotalLength();
        d3this
          .attr('stroke-dasharray', totalLength + ' ' + totalLength)
          .attr('stroke-dashoffset', totalLength)
      }

      function branchAnimate(nodeData) {
        var links = svg.selectAll(".gradient-link")
          .filter(function(gradientD) {
            return nodeData.sourceLinks.indexOf(gradientD) > -1
          });
        var nextLayerNodeData = [];
        links.each(function(d) {
        	//console.log(d.source, d.target);
          nextLayerNodeData.push(d.target);
        });

        links
          .style("opacity", null)
          .transition()
          .duration(400)
          .ease('linear')
          .attr('stroke-dashoffset', 0)
          .each("end", function() {
            nextLayerNodeData.forEach(function(d) {
              branchAnimate(d);
            });
          });
      } //end branchAnimate

      var gradientLink = svg.append("g").selectAll(".gradient-link")
        .data(resources.links)
        .enter().append("path")
        .attr("class", "gradient-link")
        .attr("d", path)
        .style("stroke-width", function(d) {
          return Math.max(1, d.dy);
        })
        .sort(function(a, b) {
          return b.dy - a.dy;
        })
        .each(setDash)
        .style('stroke', function(d) {
          var sourceColor = color(d.source.name.replace(/ .*/, "")).replace("#", "");
          var targetColor = color(d.target.name.replace(/ .*/, "")).replace("#", "");
          var id = 'c-' + sourceColor + '-to-' + targetColor;
          if (!svg.select(id)[0][0]) {
            //append the gradient def
            //append a gradient
            var gradient = svg.append('defs')
              .append('linearGradient')
              .attr('id', id)
              .attr('x1', '0%')
              .attr('y1', '0%')
              .attr('x2', '100%')
              .attr('y2', '0%')
              .attr('spreadMethod', 'pad');

            gradient.append('stop')
              .attr('offset', '0%')
              .attr('stop-color', "#" + sourceColor)
              .attr('stop-opacity', 1);

            gradient.append('stop')
              .attr('offset', '100%')
              .attr('stop-color', "#" + targetColor)
              .attr('stop-opacity', 1);
          }
          return "url(#" + id + ")";
        }
        );

      var link = svg.append("g").selectAll(".link")
        .data(resources.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function(d) {
          return Math.max(1, d.dy);
        })
        .sort(function(a, b) {
          return b.dy - a.dy;
        });

      link.append("title")
        .text(function(d) {
          return d.source.name + " → " + d.target.name + "\n" + format(d.value);
        });


      var node = svg.append("g").selectAll(".node")
        .data(resources.nodes)
        .enter().append("g")
        .attr("class", function(d){ 
        	return "node node-" + d.name.replace(" ", "_");
        })
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })

        .on("mouseover", branchAnimate)
        .on("mouseout", function() {
          //cancel all transitions by making a new one
          gradientLink.transition();
          gradientLink
            .style("opacity", 0)
            .each(function(d) {
              setDash.call(this, d);
            });
        });


      node.append("rect")
          .attr("id", function (d) {
              return "rect#" + d.name;
          })
        .attr("height", function(d) {
          return d.dy;
        })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) {
          return d.color = color(d.name.replace(/ .*/, ""));
        })
        .append("title")
        .text(function(d) {
          return d.name + "\n" + format(d.value);
        });

      node.append("text")
        .attr("id", function(d){
          return d.name;
        })
        .attr("x", -6)
        .attr("y", function(d) {
          return d.dy / 2;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .html(function(d) {
          return d.name;
        })
        .filter(function(d) {
          return d.x < width / 2;
        })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

        var test = d3.select("svg").append('svg')
        .append('svg:image')
        .attr('xlink:href', 'https://florindevessies.github.io/livinglab/Materials/img/DGTL-2019.PNG')
        .attr("width", 45.5)
        .attr("height", 100)
        .attr("x", 551)
        .attr("y", 165);


        var test = d3.select("rect#DGTL")
            .style('fill', 'white');
        });