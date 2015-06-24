var dataset = [ 100, 200, 300, 400, 500 ];
var scale = d3.scale.linear()
                .domain([100, 500])
                .range([10, 350]);

/*
* > scale(500)
* > 350
* > scale(300)
* > 180
* > scale(-100)
* > -160
* > scale(200)
* > 95
* > scale(200.5)
* > 95.42499999999998
* > scale(450.5)
* > 307.925
*/

/*
* =======================================
*           svg scatter plot with scales
* =======================================
*/

var dataset = [
    [ 5,     20 ],
    [ 480,   90 ],
    [ 250,   50 ],
    [ 100,   33 ],
    [ 330,   95 ],
    [ 410,   12 ],
    [ 475,   44 ],
    [ 25,    67 ],
    [ 85,    21 ],
    [ 220,   88 ]
];

var w  = 500;
var h  = 100;
var padding = 25;

var svg = d3.select('#scatter-plot')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

var xScale = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d){ return d[0]; })])
                .range([padding, w - padding * 2]);

var yScale = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d){ return d[1]; })])
                .range([h - padding, padding]);

svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', function(d){
        return xScale(d[0]);
    })
    .attr('cy', function(d){
        return yScale(d[1]);
    })
    .attr('r', function(d) {
        return Math.sqrt(h - d[1]);
    });

svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function(d) {
        return d[0] + ', ' + d[1];
    })
    .attr('x', function(d){
        return xScale(d[0]);
    })
    .attr('y', function(d) {
        return yScale(d[1]);
    })
    .attr('font-family', 'san-serif')
    .attr('font-style', '10px')
    .attr('fill', 'red');

