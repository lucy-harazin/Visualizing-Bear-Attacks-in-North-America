// Set the dimensions and margins of the graph
var width = 450,
    height = 450,
    margin = 40;

// The radius of the pie plot is half the width or half the height (smallest one)
// We subtract a bit of margin
var radius = Math.min(width, height) / 2 - margin;

// Append the SVG object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Define the update function outside the d3.csv callback
function update(data, colorScale) {
    // Compute the position of each group on the pie
    var pie = d3.pie()
        .value(function(d) { return d.value; });
    var data_ready = pie(d3.entries(data));

    // Remove existing paths and texts
    svg.selectAll('path').remove();
    svg.selectAll('text').remove();

    // Build the pie chart: Each part of the pie is a path that we build using the arc function
    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    //TODO:
    svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d) {
            console.log("d.data.key = " + d.data.key);
            return (colorScale(d.data.key));
        })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    // Add labels to the pie chart
    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function(d) { return "" + d.data.key + ": " + d.data.value; })
        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .style("font-size", 20);
}

// Load the CSV data and initialize the pie chart
d3.csv("../data/data (3).csv", function(data) {
    // Initialize counters for Wild and Captive
    let wildCount = 0;
    let captiveCount = 0;
    let brownBear = 0;
    let blackBear = 0;
    let polarBear = 0;
    //TODO:
    // Iterate through the data and count the values
    data.forEach(d => {
        if (d.Type === "Wild") {
            wildCount++;
        } else if (d.Type === "Captive") {
            captiveCount++;
        }
    });
    data.forEach(d => {
        if (d.Type_of_bear === "Black bear") {
            blackBear++;
        } else if (d.Type_of_bear === "Polar Bear") {
            polarBear++;
        } else if (d.Type_of_bear === "Brown bear") {
            brownBear++;
        }
    });

    // Log the counts
    console.log("Wild Count: ", wildCount);
    console.log("Captive Count: ", captiveCount);
    console.log("Black Bear: ", blackBear);
    console.log("Brown Bear: ", brownBear);
    console.log("Polar Bear: ", polarBear);

    var data1 = { Wild: wildCount, Captive: captiveCount };
    var data2 = { Black: blackBear, Brown: brownBear, Polar: polarBear };

    var color1 = d3.scaleOrdinal()
        .domain(Object.keys(data1))
        .range(["darkslateblue", "darkseagreen"]);

    var color2 = d3.scaleOrdinal()
        .domain(Object.keys(data2))
        .range(["black", "chocolate", "lightgray"]);

    // Initial update to display the first pie chart
    update(data1, color1);
    //TODO:
    // Add event listeners to buttons for updating the pie chart
    document.getElementById("btn1").addEventListener("click", function() {
        window.update(data1, color1);
    });

    document.getElementById("btn2").addEventListener("click", function() {
        window.update(data2, color2);
    });
});
