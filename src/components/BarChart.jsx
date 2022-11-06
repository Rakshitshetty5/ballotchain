import React from 'react'
import Chart from 'react-apexcharts'

const ChartData = {
    options: {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: ['BJP', 'NCI', 'AAP', 'BSP', 'CPI', 'NCP'],
        labels: {
            show: true
        }
      }
    },
    series: [{
      name: 'Bharatiya Janta Party',
      data: [60, 23, 33, 50, 43, 20],
    }]
}


const BarChart = () => {
  return (
    <Chart options={ChartData.options} series={ChartData.series} type="bar" width={500} height={320} />
  )
}

export default BarChart