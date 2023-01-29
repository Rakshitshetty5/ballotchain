import React, { useState } from 'react'
import { useEffect } from 'react'
import PageContainer from '../components/PageContainer'
import VotingCandidateCard from '../components/VoteCandidateCard'
import customAxios from '../utils/CustomAxios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const VotingPage = () => {
  const [state, setState] = useState([])
  const navigate = useNavigate()

    const isVerfied = useSelector(state => state.auth?.isVerified)

    useEffect(() => {
        if(!isVerfied){
            navigate('/')
        }
    }, [isVerfied])

  useEffect(() => {
    (async() => {
      const response = await customAxios.get('/voter/getAllCandidates')
      setState(response.data.data.candidates)
    })()
  }, [])

  return (
    <PageContainer>
        <h1 className='text-2xl text-center'>Voting Phase is Active!!</h1>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-5 justify-center mt-5'>
            {
              state.map(el => <VotingCandidateCard key={el._id} {...el}/>)
            }
        </div>
    </PageContainer>
  )
}

export default VotingPage