class GeoMap {
    // Class constructor with basic configuration
    // @param {Object}
    // @param {Array}
    constructor(_config, _geoData, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 1200,
            containerHeight: _config.containerHeight || 600,
            margin: _config.margin || { top: 0, right: 0, bottom: 200, left: 0 },
            tooltipPadding: 10,
            legendBottom: -150,
            legendLeft: 250,
            legendRectHeight: 15,
            legendRectWidth: 120
        }
        this.geoData = _geoData;
        this.data = _data;
        this.initVis();
    }

    // We initialize scales/axes and append static elements, such as axis titles.
    initVis() {
        let vis = this;
        //More code here
        // We initialize scales/axes and append static elements, such as axis titles.

        // Calculate inner chart size. Margin specifies the space around the actual chart.
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement).append('svg')
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);
        // Append group element that will contain our actual chart
        // and position it according to the given margin config
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
        //More code here
        // Defines the scale and translation of the projection so that the geometry fits within the SVG area
        // We crop Antarctica because it takes up a lot of space that is not needed for our data
        vis.projection = d3.geoEquirectangular()
            .center([-112, 55]) // set centre to further North
            .scale([vis.width * .5]) // scale to fit size of svg group
            .translate([vis.width / 2, vis.height / 2]); // ensure centered within svg group
        vis.geoPath = d3.geoPath().projection(vis.projection);

        // Append legend
        vis.legend = vis.chart.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${vis.config.legendLeft},${vis.height - vis.config.legendBottom})`);
        vis.legendRect = vis.legend.append('rect')
            .attr('width', vis.config.legendRectWidth)
            .attr('height', vis.config.legendRectHeight);
        vis.legendTitle = vis.legend.append('text')
            .attr('class', 'legend-title')
            .attr('dy', '.35em')
            .attr('y', -10)
            .text('Year of Attack')



        vis.defs = vis.svg.append('defs');
        vis.linearGradient = vis.defs.append('linearGradient')
            .attr('id', 'legend-gradient')
            .attr('x1', '0%')
            .attr('x2', '100%')
            .attr('y1', '0%')
            .attr('y2', '0%');
        vis.linearGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', d3.interpolateCividis(0));
        vis.linearGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', d3.interpolateCividis(1));

        vis.legendRect.attr('fill', 'url(#legend-gradient)');

        vis.legend.append('text')
            .attr('class', 'legend-label')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .attr('y', vis.config.legendRectHeight + 20)
            .attr('x', 0)
            .text(1901);

        vis.legend.append('text')
            .attr('class', 'legend-label')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .attr('y', vis.config.legendRectHeight + 20)
            .attr('x', vis.config.legendRectWidth)
            .text(2018);

        vis.updateVis();


    }

    updateVis() {
        let vis = this;

        vis.renderVis();
    }

    renderVis() {
        let vis = this;
        // Append world map
        //TODO:
        const geoPath = vis.chart.selectAll('.geo-path')
            .data(topojson.feature(vis.geoData, vis.geoData.objects.countries).features)
            .join('path')
            .attr('class', 'geo-path')
            .attr('d', vis.geoPath);
        // Append country borders
        const geoBoundaryPath = vis.chart.selectAll('.geo-boundary-path')
            .data([topojson.mesh(vis.geoData, vis.geoData.objects.countries)])
            .join('path')
            .attr('class', 'geo-boundary-path')
            .attr('d', vis.geoPath);
        //More code here

        const colorScale = d3.scaleSequential()
            .domain([1900, 2020])
            .interpolator(d3.interpolateCividis);
        //TODO:
        // Append symbols
        const geoSymbols = vis.chart.selectAll('.geo-symbol')
            .data(vis.data)
            .join('circle')
            .attr('class', 'geo-symbol')
            .attr('r', 15)
            .attr('cx', d => vis.projection([d.Longitude, d.Latitude])[0])
            .attr('cy', d => vis.projection([d.Longitude, d.Latitude])[1])
            .attr('fill', d => colorScale(d.Year))
            .attr('opacity', .6);

        const geoSymbols2 = vis.chart.selectAll('.geo-symbol2')
            .data(vis.data)
            .join('circle')
            .attr('class', 'geo-symbol')
            .attr('r', 2)
            .attr('cx', d => vis.projection([d.Longitude, d.Latitude])[0])
            .attr('cy', d => vis.projection([d.Longitude, d.Latitude])[1])
            .attr('fill', 'black')
            .attr('opacity', .8);
        //TODO:
        // Tooltip event listeners
        geoSymbols
            .on('mousemove', (event, d) => {
                d3.select('#tooltip')
                    .style('display', 'block')
                    .style('left', `${event.pageX + vis.config.tooltipPadding}px`)
                    .style('top', `${event.pageY + vis.config.tooltipPadding}px`)
                    .html(`
        <div class="tooltip-title">${"Location: " + d.Location}</div>
        <div>${"Date: " + d.Date}</div> </div>${"Age: " + d.age}</div> <br> </div>${"Gender: " + d.gender}</div>
        `);
            })
            .on('mouseleave', () => {
                d3.select('#tooltip').style('display', 'none');
            });

    }

    updateData(newData) {
        this.data = newData;
        this.updateVis();
    }


}