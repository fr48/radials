import * as d3 from 'd3'

const margin = { top: 30, left: 30, right: 30, bottom: 30 }
const height = 250 - margin.top - margin.bottom
const width = 780 - margin.left - margin.right

// add the main svg
const svg = d3
  .select('#chart-2')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// create xpositionscale for the svg
const xPositionScale = d3
  .scalePoint()
  .range([margin.left + margin.right, width * 0.85])

// need scale for pie. wedges are minutes
const pie = d3.pie().value(function(d) {
  // console.log(d)
  return d.minutes
})

const radius = 80
const arc = d3
  .arc()
  .innerRadius(0)
  .outerRadius(radius)

const colorScale = d3.scaleOrdinal().range(['purple', 'green', 'orange'])

// get the file
d3.csv(require('/data/time-breakdown-all.csv'))
  .then(ready)
  .catch(err => console.log('Failed with', err))

function ready(datapoints) {
  // console.log(datapoints)
  const nested = d3
    .nest()
    .key(d => d.project)
    .entries(datapoints)
  // console.log(nested)

  // extract the "categories" from list, assign to scale
  const names = nested.map(d => d.key)

  xPositionScale.domain(names)
  // console.log(xPositionScale.domain())

  svg
    .selectAll('g')
    .data(nested)
    .enter()
    .append('g')
    .attr('transform', function(d) {
      return `translate(${xPositionScale(d.key)},${height / 2})`
    })
    .each(function(d) {
      const wedges = d.values
      // draw inside the g!
      const svg = d3.select(this)
      svg
        .selectAll('path')
        .data(pie(wedges))
        .enter()
        .append('path')
        .attr('d', d => arc(d))
        .attr('fill', d => colorScale(d.data.task))
    })
    .append('text')
    .text(d => d.key)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'hanging')
    .attr('y', height / 2)
    .style('fill', 'purple')
}
