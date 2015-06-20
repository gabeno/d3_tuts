// var dataset = [5, 10, 15, 20, 25];
var dataset = [];
for (var i = 0; i < 20; i++) {
    var num = Math.round(Math.random() * 30);
    dataset.push(num);
}
d3.select('#bar')
    .selectAll('div')
    .data(dataset)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .style('height', function(d) {
        var barHeight = d * 5; // scale up by a factor of 5
        return barHeight + 'px';
    });

// drawing svg
var width = 900;
var height = 100;
var svg = d3.select('#svg-data')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

// data driven shapes
var circles = svg.selectAll('circle') // empty references to all circles
                .data(dataset)        // binds data to our elements about to be created
                .enter()              // returns a placeholder reference to the new element
                .append('circle');    // add element to the dom

// add positions and sizes to the circles
circles.attr('cx', function(d, i){
        return (i * 50) + 25;
    })
    .attr('cy', height/2)
    .attr('r', function(d){
        return d;
    });

// pretty colors
circles.attr('fill', 'yellow')
    .attr('stroke', 'orange')
    .attr('stroke-width', function(d){
        return d/2;
    });

// svg bar chart
var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

var w  = 500;
var h  = 100;
var barPadding = 1;

var svg = d3.select('#svg-bar')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

var rects = svg.selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect');

rects.attr('x', function(d, i){
        return i * (w / dataset.length);
    })
    .attr('y', function(d){
        return h - (d * 4);
    })
    .attr('width', w / dataset.length - barPadding)
    .attr('height', function(d){
        return d * 4;
    })
    .attr('fill', function(d){
        return 'rgb(0, 0, '+ (d * 10) +')';
    });
