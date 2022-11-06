import React from 'react'
import PageContainer from '../components/PageContainer'
import VotingCandidateCard from '../components/VoteCandidateCard'

const VotingPage = () => {
  return (
    <PageContainer>
        <h1 className='text-2xl text-center'>Voting Phase is Active!!</h1>
        <div className='grid md:grid-cols-4 justify-center mt-5'>
            <VotingCandidateCard />
            <VotingCandidateCard />
            <VotingCandidateCard />
            <VotingCandidateCard />
        </div>
    </PageContainer>
  )
}

export default VotingPage