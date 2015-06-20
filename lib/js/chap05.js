// Your beautiful D3 code will go here
/*
d3.select('body')
    .append('p')
    .text('My new paragraph');
*/

// data
var dataset = [ 5, 10, 15, 20, 25 ];

// loading csv
/*
var csv_data; // global variable
d3.csv('sample_data.csv', function(err, data){
    if (err) {
        console.log(err);
        return;
    }
    csv_data = data; // once loaded copy to csv_data
    console.log(csv_data);
});
*/

d3.select('body')
    .selectAll('p')
    .data(dataset)
    .enter()
    .append('p')
    .text(function (d) {
        return d;
    })
    .style('color', function(d) {
        if (d % 2 !== 0) {
            return 'red';
        } else {
            return 'black';
        }
    });

