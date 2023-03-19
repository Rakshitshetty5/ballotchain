import React, { useState } from 'react'
import VotingResult from './VotingResult'
import {ethers} from 'ethers';
import ElectionAbi from '../utils/SmartContract/ElectionContract.json'
import { ElectionContractAddress } from '../utils/config'
import useIsLoading from '../hooks/useIsLoading'
import { useSnackbar } from "notistack";

const SearchPVN = ({ candidates }) => {
  const [voterId, setVoterId] = useState('')
  const [party, setParty] = useState('')
  const {startLoading, endLoading, isLoading} = useIsLoading()
  const { enqueueSnackbar } = useSnackbar();

  const getMyVote = async () => {
    if(isLoading) return
    startLoading()
    try{
      const {ethereum} = window
        
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ElectionContract = new ethers.Contract(
          ElectionContractAddress,
          ElectionAbi.abi,
          signer
        )
  
        let myVote = await ElectionContract.getYourVote(voterId); 
        const candidateParty = candidates.find(el => el._id === myVote.candidate_id).party
        setParty(candidateParty)
      }
    }catch(err){
      enqueueSnackbar(err.response?.data?.message ?? err.message, {
        variant: "error",
      });
    }
    endLoading()
  } 

  return (
      <div className='flex flex-col items-center space-y-5 bg-[#0909c0] py-5 px-2 md:px-10 rounded-lg'>
        <div className='flex'>
            <input 
                placeholder='Enter Voter Id'
                value={voterId}
                onChange={e => setVoterId(e.target.value)}
                className="border-2 p-2 md:w-[24rem] rounded-l-lg"
            />
            <button onClick={getMyVote} className='bg-[#c45252] rounded-r-lg px-4 py-2 border-2 border-[#c45252] text-white'>{isLoading ? 'Searching...' : 'Search'}</button>
        </div>
        {party && <VotingResult party={party} voterId={voterId}/>}
      </div>
  )
}

export default SearchPVN