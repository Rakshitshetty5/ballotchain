import React from 'react'
import { useSelector } from 'react-redux'

const DigitalCard = () => {
    const currentUser = useSelector(state => state.auth?.voterDetails)
    let walletAddress = useSelector(state => state.auth?.walletAddress)
    walletAddress = walletAddress?.split('').map((el, idx) => {
        if(idx < 8 || idx > 32){
            return el
        }
        return '.'
    }).filter((el, idx) => idx < 12 || idx >= 24 ).join('')
    return (
        <div className="shadow-xl bg-card bg-bottom-custom flex items-start space-x-4 md:space-x-6 p-5 rounded-md">
            <img src={currentUser.image} alt={"Card"}/>
            <div className="text-white flex flex-col justify-between">
                <h1 className="font-semibold">{currentUser.first_name} {currentUser.last_name}</h1>
                <div>
                    <span className="text-[0.8rem]">Wallet Address</span>
                    <h2 className="text-sm">{walletAddress}</h2>
                </div>
                <div>
                    <span className="text-[0.8rem]">Permanent Voter Number</span>
                    <h2>2040 XXXX XXXX 7657</h2>
                </div>
            </div>
        </div>
    )
}

export default DigitalCard