// drawing a statis bar chart
var dataset1 = []
for (var i=0; i<20; i++){
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

// interaction via event listeners
d3.select('p')
    .on('click', function(){
        console.log('you clicked!');
        dataset1 = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
                    5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ]
        svg.selectAll('rect')                   // 1 selection statements
            .data(dataset1)
            .transition()                       // 2 transition statements
            .delay(500)
            .duration(1000) // ms
            .ease('linear')
            .attr('y', function(d){             // 3 attribute statements
                return height - yScale(d);
            })
            .attr('height', function(d){
                return yScale(d);
            })
            .attr('fill', function(d){
                return 'rgba(0,0,'+ d * 10 +',1)';
            })

        svg.selectAll('text')
            .data(dataset1)
            .text(function(d){ return d; })
            .attr('x', function(d, i){
                return xScale(i) + xScale.rangeBand() / 2; 
            })
            .attr('y', function(d){
                return height - yScale(d) + 15;
            });
    });
