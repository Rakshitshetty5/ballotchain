import React from 'react'
import Chart from 'react-apexcharts'

const ChartData = {
    series: [],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [],
      colors: ['#52C3BF', '#898989', '#59aa25', '#39B649', '#5992AC', '#289aAC'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
}
const PieChart = ({ results, candidates }) => {
  const votes = []
  const party = []
  console.log(candidates)
  for(let x in results){
    const candidate = candidates.find(el => el._id === x).party
    votes.push(results[x])
    party.push(candidate)
  }
  ChartData.series = [...votes]
  ChartData.options.labels = [...party]
  return (
    <Chart options={ChartData.options} series={ChartData.series} type="pie" width={500} height={320} />
  )
}

export default PieChart