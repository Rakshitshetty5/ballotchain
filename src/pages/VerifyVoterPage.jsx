import React, { useState } from 'react'
import PageContainer from '../components/PageContainer'
import { setWalletAddress } from '../redux/auth/reducer'
import { useDispatch, useSelector } from 'react-redux'
import customAxios from '../utils/CustomAxios.js'

const VerifyVoterPage = () => {
  const walletAddress = useSelector(state => state.auth.walletAddress)
  const voterDetails = useSelector(state => state.auth?.voterDetails)
  const isVerfied = useSelector(state => state.auth?.isVerified)
  console.log(voterDetails)
  const dispatch = useDispatch()
  const connect = async () => {
    try{
      const { ethereum } = window
      if(!ethereum){
        alert('Please install metamask')
      }
      let chainId = await ethereum.request({ method: 'eth_chainId'})
      const networkId = '0x5'
      if (chainId !== networkId) {
        alert('You are not connected to the Etherum Testnet!')
        return
      } 
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('Found account', accounts[0])

      //call voter verification api

      await customAxios.post('voter/applyVerification', { voter_id: voterDetails.voter_id, voter_details: voterDetails._id ,wallet_address: accounts[0] })
      dispatch(setWalletAddress(accounts[0]))
      window.location.reload()

    }catch(err){
      console.log('Metamask connection error', err)
    }
  }

  return (
    <PageContainer>
      <ul>
        <li>Inorder to be eligible to vote you need to be a verfied user. For Verification you will have to provide your etherum wallet address. You can easily do this by clicking on below button and logining into your MetaMask Wallet</li>
        <div className='w-full py-10 flex justify-center'>
          {isVerfied ? '' : (!voterDetails.hasAppliedForVerification) && <button className='bg-[orange] text-white font-black px-8 py-4 rounded-lg' onClick={connect}>Connect to Wallet</button>}
          {isVerfied && <p>{"You are verfied"}</p>}
        </div>
      </ul>
    </PageContainer>
  )
}

export default VerifyVoterPage