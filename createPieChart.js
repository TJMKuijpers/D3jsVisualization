$(document).ready(function(){
    
    // basic settings
    var width=500;
    var height=500;
    var svg = d3.select("#testSvgPie");
    var radius=80;
    
    var arc=d3.arc().innerRadius(0).outerRadius(radius);

    var pie = d3.pie()
                .sort(null)
                .value(function(d) { return d.numbers; });

    var svg = d3.select("#testSvgPie")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // colors for the pie chart
    d3.csv("PieChart.csv",function(error,data){
        if (error) throw error;
        var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00']);
        data.forEach(function(d){
            d.categories=d.categories;
            d.numbers=+d.numbers;
            d.increase=+d.increase;
        })
        // create the pie chart
        data.forEach(function(d) {
            d.population = +d.numbers;
          });
        
        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");
        
        g.append("path")
            .attr("d", arc)
            .attr("data-legend",function(d) { return d.categories})
            .style("fill", function(d) { return color(d.data.categories); });
        
        var legend = svg.selectAll('.legend')
            .data(color)
            .enter()
            .append('g')
            .attr('class', 'legend');

        legend.append('rect')
              .attr('width', 40)
              .attr('height', 40)
              attr("transform", "translate(50,10)")
              .style('fill', function(d){ return color(d.data.categories);})
              .style('stroke', function(d){ return color(d.data.categories);})

              legend.append('text')
              .attr('x',100)
              .attr('y', 100)
              attr("transform", "translate(50,10)")
              .text(function(d) { return d.categories; });

        
         })


})