/*code adapted from: http://bl.ocks.org/mbostock/7607535 */

var margin = 30,
    diameter = window.innerWidth*.5;

var pack = d3.layout.pack()
    .padding(2)
    .size([diameter, diameter])
    .value(function(d) { return d.size; })

var svg = d3.select("body").append("svg")
    .attr("id", "main_circle")
    .attr("width", diameter)
    .attr("height", diameter)
	.append("g")
	.attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
   


d3.json("skills.json", function(error, root) {
  if (error) return console.error(error);

  var focus = root,
      nodes = pack.nodes(root),
      view;

  var circle = svg.selectAll("circle")
      .data(nodes)
	  .enter().append("circle")
      .attr("class", function(d) { return d.type + " skill " + (d.parent ? d.children ? " node "  : " node node--leaf " : " node node--root ") ; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

  var text = svg.selectAll("text")
      .data(nodes)
    .enter().append("text")
      .attr("class",function(d){return d.type +" label"})
      .style("fill",  "white")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? null : "none"; })
      .text(function(d) { return d.name; });

  var node = svg.selectAll("circle,text");

  d3.select(".back")
      .on("click", function() { zoom(root); }); 

  zoomTo([root.x, root.y, root.r * 2 ]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          if(focus.type == "main_circle_content"){
	          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
			  return function(t) { zoomTo(i(t)); };
          }
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    
    d3.selectAll(".skill").style("display", "inline");
    
    /*todo: if element we zoom in on is not root remove nav bars and add back nav button. If element is root remove back button 	and add nav bar */
    console.log("here?");
    d3.selectAll(".navButton").style("display", "none");
    if(d !== root){
	    d3.selectAll(".navButton").filter(".back").style("display", "inline-block").attr("class", "navButton back "+d.type); 
    }else{
	    d3.selectAll(".navButton").filter(".category").style("display", "inline-block"); 
    }
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }
}); 

d3.select(self.frameElement).style("height", diameter + "px");

d3.selectAll(".navButton").filter(".technical")
      .on("click", function() { 
      		d3.selectAll(".skill")
      		.style("display", "inline")
      		d3.selectAll(".label")
      		.style("display", "inline")
      		d3.selectAll(".skill").filter(".leadership")
      		.style("display", "none")
      		d3.selectAll(".label").filter(".leadership")
      		.style("display", "none")
      			d3.selectAll(".skill").filter(".design")
      		.style("display", "none")
      		d3.selectAll(".label").filter(".design")
      		.style("display", "none")
      		d3.event.stopPropagation()
      }); 


d3.selectAll(".navButton").filter(".leadership")
      .on("click", function() { 
      		d3.selectAll(".skill")
      		.style("display", "inline")
      		d3.selectAll(".label")
      		.style("display", "inline")
      		d3.selectAll(".skill").filter(".technical")
      		.style("display", "none")
      		d3.selectAll(".label").filter(".technical")
      		.style("display", "none")
      			d3.selectAll(".skill").filter(".design")
      		.style("display", "none")
      		d3.selectAll(".label").filter(".design")
      		.style("display", "none")
      		d3.event.stopPropagation()
      }); 
      
d3.selectAll(".navButton").filter(".design")
      .on("click", function() { 
      		d3.selectAll(".skill")
      		.style("display", "inline")
      		d3.selectAll(".label")
      		.style("display", "inline")
      		d3.selectAll(".skill").filter(".technical")
      		.style("display", "none")
      		d3.selectAll(".label").filter(".technical")
      		.style("display", "none")
      			d3.selectAll(".skill").filter(".leadership")
      		.style("display", "none")
      		d3.selectAll(".label").filter(".leadership")
      		.style("display", "none")
      		d3.event.stopPropagation()
      }); 

 d3.select("body")
      .on("click", function() {
      console.log("clicked");
       	     d3.selectAll(".skill")
      		.style("display", "inline")
      		d3.selectAll(".label")
      		.style("display", "inline")
       });
