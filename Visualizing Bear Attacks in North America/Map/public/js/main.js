Promise.all([
    d3.json('data/countries-110m_v2.json'),
    d3.csv('data/data (3).csv')
]).then(data => {

    // Transform data to add a Decade property
    const transformedData = data[1].map(d => {
        d.Year = +d.Year; // Ensure Year is a number
        d.Decade = Math.floor(d.Year / 10) * 10; // Calculate the decade
        return d;
    });

    // Function to group data by Decade
    const groupByDecade = (data) => {
        return d3.group(data, d => d.Decade);
    };

    // Group the transformed data by Decade
    const groupedData = groupByDecade(transformedData);

    // Add an "All" option to the grouped data
    groupedData.set("All", transformedData);

    console.log(groupedData); // Check the grouped data structure

    // Add the options to the select button
    d3.select("#selectButton")
        .selectAll('option')
        .data(["All", ...Array.from(groupedData.keys())]) // Add "All" option
        .enter()
        .append('option')
        .text(function (d) { return d === "All" ? "All" : d + "s"; }) // text shown in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // Create an instance of GeoMap
    const geoMap = new GeoMap({
        parentElement: '#map'
    }, data[0], Array.from(groupedData.get("All")));

    // Handle select button change event
    d3.select("#selectButton").on("change", function () {
        const selectedDecade = d3.select(this).property("value");
        const filteredData = selectedDecade === "All" ? groupedData.get("All") : groupedData.get(+selectedDecade) || [];
        geoMap.updateData(filteredData);
    });
})
    .catch(error => console.error(error));
