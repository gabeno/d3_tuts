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

// draw rectangles
var rects = svg.selectAll('rect')
                .data(dataset1)
                .enter()
                .append('rect')
                .attr('x', function(d, i){
                    return xScale(i);
                });

rects.attr('y', function(d){
        return height - (d * 4);
    })
    .attr('width', xScale.rangeBand()) 
    .attr('height', function(d){
        return d * 4;
    })
    .attr('fill', 'rgba(0,0,0,0.7)')

// add some text
svg.selectAll('text')
    .data(dataset1)
    .enter()
    .append('text')
    .text(function(d){
        return d;
    })
    .attr('x', function(d, i){
        return i * (width / dataset1.length) + (width / dataset1.length - padding) / 2;
    })
    .attr('y', function(d) {
        return height - (d * 4) + 14;
    })
    .attr('font-famliy', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle');

