// drawing a statis bar chart
var dataset1 = []
for (var i=0; i<20; i++){
    var num = Math.floor(Math.random() * 30);
    dataset1.push(num);
}

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
d3.select('#one')
    .on('click', function(){
        var numOfValues = dataset1.length;
        var maxValue = 50;

        dataset1 = [];
        for (var i=0; i<numOfValues; i++) {
            var newNum = Math.floor(Math.random() * maxValue);
            dataset1.push(newNum);
        }

        yScale.domain([0, d3.max(dataset1)]);

        svg.selectAll('rect')                   // 1 selection statements
            .data(dataset1)
            /*
                duration() sets the duration for each individual transition
                So, for example, if 20 elements have 500-ms transitions applied 
                with no delay, then it will all be over in 500 ms.

                But if a 100-ms delay is applied to each subsequent element (i * 100), 
                then the total running time of all transitions will be 2,400 ms
                
                Max value of i times 100ms delay plus 500ms duration:
                    19 * 100 + 500 = 2400

                Because these delays are being calculated on a per-element basis, 
                if you added more data, then the total running time of all transitions will increase.

                Max at 1.5sec total time
                    return i / dataset.length * 1000;
                
                Instead of multiplying i by some static amount, we first divide i by dataset.length, 
                in effect normalizing the value. Then, that normalized value is multiplied by 1000, 
                or 1 second. The result is that the maximum amount of delay for the last element 
                will be 1000, and all prior elements will be delayed by some amount less than that. 
                A max delay of 1000 plus a duration of 500 equals 1.5 seconds total transition time.
    
            */
            .transition()                       // 2 transition statements
            .delay(function(d, i){
                return i / dataset1.length * 1000;
            })
            .duration(500) // ms
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

/*
* =======================================
*           svg scatter plot with scales
* =======================================
*/

// dataset

var getData = function(){
    var dataset = [];
    var numDataPoints = 50;
    var xRange = Math.random() * 1000;
    var yRange = Math.random() * 1000;

    for (var i=0; i<numDataPoints; i++){
        var newNum1 = Math.floor(Math.random() * xRange);
        var newNum2 = Math.floor(Math.random() * yRange);
        dataset.push([newNum1, newNum2]);
    }
    return dataset;
}

var dataset = getData();

// canvas dims
var w  = 600;
var h  = 300;
var padding = 30;

// create svg element
var svg2 = d3.select('#scatter-plot')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

// create scale functions
var xScale2 = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d){ return d[0]; })])
                .range([padding, w - padding * 2]);

var yScale2 = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d){ return d[1]; })])
                .range([h - padding, padding]);

var rScale2 = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d){ return d[1]; })])
                .range([2, 5]);

// define xAxis
var xAxis = d3.svg.axis()
              .scale(xScale2)
              .orient('bottom')
              .ticks(5);

// define yAxis
var yAxis = d3.svg.axis()
              .scale(yScale2)
              .orient('left')
              .ticks(5);

// create circles
svg2.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', function(d){
        return xScale2(d[0]);
    })
    .attr('cy', function(d){
        return yScale2(d[1]);
    })
    .attr('r', function(d) {
        return 2; // rScale2(d[1]);
    });

// create x Axis
svg2.append('g')
    .attr('class','axis')
    .attr('transform', 'translate(0, '+ (h - padding) +')')
    .call(xAxis);

// create y Axis
svg2.append('g')
    .attr('class','axis')
    .attr('transform', 'translate('+ padding +', 0)')
    .call(yAxis);

d3.select('#two')
    .on('click', function(){
        dataset = getData();

        xScale2.domain([0, d3.max(dataset, function(d){ return d[0]; })]);
        yScale2.domain([0, d3.max(dataset, function(d){ return d[1]; })]);
        
        svg2.selectAll('circle')
            .data(dataset)
            .transition()
            .duration(1000)
            .ease('linear')
            .attr('cx', function(d){
                return xScale2(d[0]);
            })
            .attr('cy', function(d){
                return yScale2(d[1]);
            });
    });
