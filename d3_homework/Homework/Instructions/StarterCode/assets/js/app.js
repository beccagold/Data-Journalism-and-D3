//@TODO: YOUR CODE HERE!
var svgWidth = 600;
var svgHeight = 600;

var margin = {
   top: 20,
   right: 40,
   bottom: 80,
   left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(healthData) {

    healthData.forEach(function(data){
        data.age = +data.age;
        data.smokes = +data.smokes;
    });

    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(healthData, d => d.age)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.smokes)])
        .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var circlesGroup = chartGroup.selectAll()
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", ".75");

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height/2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Smokes");

    chartGroup.append("text")
        .attr("transform", `translate(${width/2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Age");

    chartGroup.append("text")
        .selectAll()
        .data(healthData)
        .enter()
        .append("tspan")
        .attr("x", d => xLinearScale(d.age))
        .attr("y", d => yLinearScale(d.smokes))
        .attr("text-anchor", "middle")
        .text(function(data) {
         return data.abbr
        })
        .attr("fill", "white")
        .attr("font-size", 10, "bold");
    chartGroup.append("g")
        .attr("transform",`translate(0, ${height})`)
        .call(bottomAxis);
    chartGroup.append("g")
        .call(leftAxis);
 });
