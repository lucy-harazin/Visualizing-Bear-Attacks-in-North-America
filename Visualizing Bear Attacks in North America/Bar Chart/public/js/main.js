/**
 * Load data from CSV file asynchronously and render chart
 */
// Add your code here

// Load data from CSV file asynchronously and render chart
d3.csv('data/data (3).csv')
    .then(data => {
        // Generate filters from input elements on index.html
        const getFilters = () => {
            let s = {
                "gender": "male"
            };
            $('.btn-group .active input').each(function () {
                $(this).hasClass('gender') ? s.gender = $(this).attr('value') : null;
            });
            console.log(s);
            return s;
        };

        // Actually filter the data 
        const filterData = (data) => {
            let filters = getFilters(); if (filters.gender === 'all') {
                return data; // Return all data if "All" is selected 
            } else { return data.filter((d) => d.gender === filters.gender); }
        };

        // Create a new bar chart instance and pass the filtered data to the bar chart class
        let barchart = new Barchart({ parentElement: '#vis' }, filterData(data));

        // Show chart
        barchart.updateVis();

        // Update the data passed to the chart whenever you interact with a button
        $('input').on('change', function () {
            barchart.data = filterData(data);
            barchart.updateVis();
        });

    })
    .catch(error => console.error(error));

