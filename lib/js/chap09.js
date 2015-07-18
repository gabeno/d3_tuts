// drawing a statis bar chart
var dataset1 = []
for (var i=0; i<25; i++){
    var num = Math.floor(Math.random() * 30);
    dataset1.push(num);
}
console.log(dataset1)

// draw the svg
var width = 600;
var height = 250;
var padding = 1;
var svg = d3.select('#bar_static')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

// scales
var xScale = d3.scale.ordinal()
                .domain(d3.range(dataset1.length))
                .rangeRoundBands([0, width], 0.05)
var yScale = d3.scale.linear()
                .domain([0, d3.max(dataset1, function(d){ return d; })])
                .range([0, height])

// draw rectangles
var rects = svg.selectAll('rect')
                .data(dataset1)
                .enter()
                .append('rect')
                .attr('x', function(d, i){
                    return xScale(i);
                });

rects.attr('y', function(d){
        return height - yScale(d);
    })
    .attr('width', xScale.rangeBand()) 
    .attr('height', function(d){ // apply scale to height then compute y
        return yScale(d);
    })
    .attr('fill', function(d){
        return 'rgba(0,0,'+ d * 10 +',1)';
    })

// add some text
svg.selectAll('text')
    .data(dataset1)
    .enter()
    .append('text')
    .text(function(d){
        return d;
    })
    .attr('x', function(d, i){
        return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr('y', function(d) {
        return height - yScale(d) + 15;
    })
    .attr('font-famliy', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle');

