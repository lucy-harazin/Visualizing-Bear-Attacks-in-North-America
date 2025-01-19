// Set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 50, left: 60 },
    width = 1500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parse the CSV data
d3.csv("../data/data (3).csv", function (error, data) {
    if (error) throw error;

    // Parse the year as a number
    data.forEach(function (d) {
        d.Year = +d.Year;
    });

    // Group by year and count deaths using d3.nest
    var deathsByYear = d3.nest()
        .key(function (d) { return d.Year; })
        .rollup(function (v) { return v.length; })
        .entries(data)
        .map(function (d) {
            return { Year: +d.key, Deaths: d.value };
        });

    console.log("Deaths by Year:", deathsByYear); // Debugging: Log the grouped data by year

    // Find the extent of the year data
    var yearExtent = d3.extent(deathsByYear, d => d.Year);

    // Create a complete array of years within the extent with deaths initialized to 0
    var allYears = d3.range(yearExtent[0], yearExtent[1] + 1).map(function (year) {
        return { Year: year, Deaths: 0 };
    });

    console.log("Initialized All Years:", allYears); // Debugging: Log the initialized years

    // Merge deathsByYear data into allYears, overwriting 0s where we have actual death counts
    deathsByYear.forEach(function (d) {
        var yearData = allYears.find(y => y.Year === d.Year);
        if (yearData) {
            yearData.Deaths = d.Deaths;
        }
    });

    console.log("Merged All Years Data:", allYears); // Debugging: Log the merged data

    // Convert the allYears array to a 2D array for tooltip use
    var deathsArray = allYears.map(function(d) {
        return [d.Year, d.Deaths];
    });

    console.log("Deaths Array:", deathsArray); // Debugging: Log the 2D array
    //TODO:
    // Add X axis --> it is a year format
    var x = d3.scaleLinear()
        .domain(d3.extent(allYears, d => d.Year))
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(12).tickFormat(d3.format("d")));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(allYears, d => d.Deaths)])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y).ticks(5));

    // Add X-axis label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .text("Year");

    // Add Y-axis label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .text("Number of Deaths");

    // Define the line
    var line = d3.line()
        .x(d => x(d.Year))
        .y(d => y(d.Deaths));

    // Add the line to the SVG
    svg.append("path")
        .datum(allYears)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    //TODO:
    // Create a tooltip div that is hidden by default:
    var tooltip = d3.select("#my_dataviz").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "5px");

    // Add points to the line using deathsArray
    svg.selectAll(".dot")
        .data(deathsArray)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d[0])) // d[0] is the Year
        .attr("cy", d => y(d[1])) // d[1] is the Deaths
        .attr("r", 3)
        .attr("fill", "steelblue")
        .on("mouseover", function (event, d) {
            console.log("Data Point:", d);
            console.log("Data Point:", deathsArray[d][1]);
            console.log("event:", event);
            console.log("Data Point:", deathsArray[d][0]); // Debugging: Log the data point
            d3.select(this).attr("r", 5).attr("fill", "orange");
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Year: " + deathsArray[d][0] + "<br>Deaths: " + deathsArray[d][1]);
        })
        .on("mouseout", function () {
            d3.select(this).attr("r", 3).attr("fill", "steelblue");
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
});
