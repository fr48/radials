import * as d3 from 'd3'

const margin = { top: 30, left: 30, right: 30, bottom: 30 }
const height = 400 - margin.top - margin.bottom
const width = 780 - margin.left - margin.right

// add the main svg
const svg = d3
  .select('#chart-2')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr('transform', `translate(${width / 2},${height / 2})`)

// create xpositionscale for the svg
const xPositionScale = d3.scaleOrdinal().range([0, width])

// get the file
d3.csv(require('/data/time-breakdown-all.csv'))
  .then(ready)
  .catch(err => console.log('Failed with', err))

function ready(datapoints) {
  // console.log(datapoints)
  const proj = d3
    .nest()
    .key(d => d.project)
    .entries(datapoints)
  console.log(proj)
  const names = proj.map(d => d.key)
  console.log(names)

  xPositionScale.domain(d => d.key)
  console.log(xPositionScale.domain)
}
/*
  // need some scales : minutes and task, project is separate pie
const pie = d3.pie().value(function(d) {
  // console.log(d)
  return d.minutes
})

const radius = 100
const arc = d3
  .arc()
  .innerRadius(0)
  .outerRadius(radius)

const colorScale = d3.scaleOrdinal().range(['purple', 'green', 'orange'])



function ready(datapoints) {
  // console.log(datapoints)
  const nested = d3
    .nest()
    .key(d => d.project)
    .entries(datapoints)

  // draw the small charts
  container
    .selectAll('svg')
    .data(nested)
    .enter()
    .append('g')

  var g = container
    .selectAll('.arc')
    .data(pie(nested))
    .enter()
    .append('class', 'arcs')
  console.log(d.values)
  // grab current svg
  const svg = d3.select(this)
  svg
    .selectAll('path')
    .data(pie(d.values))
    .enter()
    .append('path')
    .attr('d', d => arc(d.values))
    .attr('fill', function(d) {
      console.log(d.values)
      console.log(d.values.task)
      colorScale(d.values.task)
    })
}
*/
