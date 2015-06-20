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
