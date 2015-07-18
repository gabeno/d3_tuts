// drawing a statis bar chart
var dataset1 = []
for (var i=0; i<25; i++){
    var num = Math.floor(Math.random() * 30);
    dataset1.push(num);
}
console.log(dataset1)

// draw the svg
var width = 500;
var height = 150;
var padding = 1;
var svg = d3.select('#bar_static')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

// draw rectangles
var rects = svg.selectAll('rect')
                .data(dataset1)
                .enter()
                .append('rect');

rects.attr('x', function(d, i){
        return i * (width / dataset1.length);
    })
    .attr('y', function(d){
        return height - (d * 4);
    })
    .attr('width', (width / dataset1.length) - padding)
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

