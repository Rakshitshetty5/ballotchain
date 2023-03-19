import React from 'react'
import PageContainer from '../components/PageContainer'
import { setWalletAddress } from '../redux/auth/reducer'
import { useDispatch, useSelector } from 'react-redux'
import customAxios from '../utils/CustomAxios.js'
import useIsLoading from '../hooks/useIsLoading'
import { useSnackbar } from "notistack";

const VerifyVoterPage = () => {
  const voterDetails = useSelector(state => state.auth?.voterDetails)
  const isVerfied = useSelector(state => state.auth?.isVerified)
  const dispatch = useDispatch()
  const {startLoading, endLoading, isLoading} = useIsLoading()
  const { enqueueSnackbar } = useSnackbar();

  const connect = async () => {
    startLoading()
    try{
      const { ethereum } = window
      if(!ethereum){
        alert('Please install metamask')
      }
      let chainId = await ethereum.request({ method: 'eth_chainId'})
      const networkId = '0x5'
      if (chainId !== networkId) {
        enqueueSnackbar('You are not connected to the Goreli Testnet!', {
          variant: "error",
        });
        return
      } 
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      enqueueSnackbar('Found account :' + accounts[0], {
        variant: "success",
      });
      if(!accounts[0]) return
      await customAxios.post('voter/applyVerification', { voter_id: voterDetails.voter_id, voter_details: voterDetails._id ,wallet_address: accounts[0] })
      dispatch(setWalletAddress(accounts[0]))
      window.location.reload()
    }catch(err){
      enqueueSnackbar(err.response?.data?.message ?? 'Metamask error', {
        variant: "error",
      });
    }
    endLoading()
  }

  return (
    <PageContainer>
      <ul>
        <li>Inorder to be eligible to vote you need to be a verfied user. For Verification you will have to provide your etherum wallet address. You can easily do this by clicking on below button and logining into your MetaMask Wallet</li>
        <div className='w-full py-10 flex justify-center'>
          {isVerfied ? '' : (!voterDetails.hasAppliedForVerification) && <button className='bg-[orange] text-white font-black px-8 py-4 rounded-lg' onClick={connect}>{isLoading ? 'Connecting...' : 'Connect to Wallet'}</button>}
          {isVerfied && <p>{"You are verfied"}</p>}
        </div>
      </ul>
    </PageContainer>
  )
}

export default VerifyVoterPage