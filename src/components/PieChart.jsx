import React from 'react'
import Chart from 'react-apexcharts'

const ChartData = {
    series: [44, 55, 13, 43, 22, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['BJP', 'NCI', 'AAP', 'BSP', 'CPI', 'NCP'],
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
const PieChart = () => {
  return (
    <Chart options={ChartData.options} series={ChartData.series} type="pie" width={500} height={320} />
  )
}

export default PieChart