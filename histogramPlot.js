// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 100, left: 40},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height,0]);
          
          var svg = d3.select("#testhistogram").attr("transform", "translate(" + 100 + "," + 100 + ")")
 d3.csv("MunicipalityCases.csv", function(error, data) {
        if (error) throw error;
          
            // format the data
            data.forEach(function(d) {
              d.Cases = +d.Cases;
            });
          
            // Scale the range of the data in the domains
            x.domain(data.map(function(d) { return d.Provinces; }));
            y.domain([0, d3.max(data, function(d) { return d.Cases; })]);
          
            // append the rectangels for the bar chart
            svg.selectAll(".bar")
                .data(data)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.Provinces); })
                .attr("width", x.bandwidth())
                .attr("transform", "translate(70,0)")
                .attr("y", function(d) { return y(d.Cases); })
                .attr("height", function(d) { return height - y(d.Cases); });
          
            // add the x Axis
            svg.append("g")
                .attr("class","axis")
                .attr("transform", "translate(70," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")	
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");
          
            // add the y Axis
            svg.append("g")
                .attr("class","axis")
                .attr("transform", "translate(70,0)")
                .call(d3.axisLeft(y));})