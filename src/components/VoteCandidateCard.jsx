import React from 'react'
import { useSelector } from 'react-redux'
import {ethers} from 'ethers';
import ElectionAbi from '../utils/SmartContract/ElectionContract.json'
import { ElectionContractAddress } from '../utils/config'
import { useEffect } from 'react';

const VoteCandidateCard = ({ candidate_image, first_name, last_name, party, party_image, _id }) => {
    const currentUser = useSelector(state => state.auth?.currentUser?.user)
    const isVerfied = useSelector(state => state.auth?.isVerified)

    useEffect(() => {
        (async() => {
            try {
                const {ethereum} = window
            
                if(ethereum) {
                  const provider = new ethers.providers.Web3Provider(ethereum);
                  const signer = provider.getSigner();
                  const ElectionContract = new ethers.Contract(
                    ElectionContractAddress,
                    ElectionAbi.abi,
                    signer
                  )
            
                  let allVotes = await ElectionContract.getAllVotes();
                  console.log(allVotes)
                } else {
                  console.log("Ethereum object doesn't exist");
                }
              } catch(error) {
                console.log(error);
              }
        })()
    }, [])


    async function castVote(){
        const reqObj = {
            voter_id: currentUser.voter_id,
            isVerified: isVerfied,
            candidate: _id,
            pvn: "nahi"
        }
        try {
            const {ethereum} = window
      
            if(ethereum) {
              await ethereum.request({ method: 'eth_chainId'})
              await ethereum.request({ method: 'eth_requestAccounts' })
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const ElectionContract = new ethers.Contract(
                ElectionContractAddress,
                ElectionAbi.abi,
                signer
              )

              ElectionContract.castVote(reqObj.pvn, reqObj.voter_id, reqObj.candidate, reqObj.isVerified).then(response => {
                  console.log('Completed')
              }).catch(err => {
                  console.log('Error', err)
              })
            }
        }catch(err){
            console.log(err)
        }
        
    }

    return (
        <div className="shadow-lg mt-16 rounded-2xl w-72 sm:w-80 bg-white dark:bg-gray-800">
            <div className="flex flex-col items-center justify-center p-4 -mt-16">
                <a href="#" className="block relative">
                    <img alt="profil" src={candidate_image} className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white dark:border-gray-800" />
                </a>
                <p className="text-gray-800 dark:text-white text-xl font-medium mt-2">
                    {first_name} {last_name}
                </p>
                <p className="text-gray-400 text-xs mb-4">
                    {party}
                </p>
                <button onClick={castVote} type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Vote
                </button>
            </div>
        </div>
    )
}

export default VoteCandidateCard