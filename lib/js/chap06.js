// var dataset = [5, 10, 15, 20, 25];
var dataset = [];
for (var i = 0; i < 25; i++) {
    var num = Math.round(Math.random() * 30);
    dataset.push(num);
}
d3.select('body')
    .selectAll('div')
    .data(dataset)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .style('height', function(d) {
        var barHeight = d * 5; // scale up by a factor of 5
        return barHeight + 'px';
    });
