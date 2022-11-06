import React from 'react'
import SearchPVN from '../components/SearchPVN'
import PieChart from '../components/PieChart'
import PageContainer from '../components/PageContainer'

const ResultsPage = () => {
  return (
    <PageContainer>
      <div className='flex flex-col md:flex-row items-center justify-center space-y-10'>
        <SearchPVN />
        <PieChart />
      </div>
    </PageContainer>
  )
}

export default ResultsPage