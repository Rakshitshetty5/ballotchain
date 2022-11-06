import React from 'react'

const DigitalCard = () => {
    return (
        <div className="shadow-xl bg-card bg-bottom-custom flex items-start space-x-4 md:space-x-6 p-5 rounded-md">
            <img src={"https://randomuser.me/api/portraits/men/69.jpg"} alt={"Card"}/>
            <div className="text-white flex flex-col justify-between">
                <h1 className="font-semibold">SUSHIL NEIL ARMSTRONG</h1>
                <div>
                    <span className="text-[0.8rem]">Wallet Address</span>
                    <h2 className="text-sm">0x00810...F8464Fc3F315C</h2>
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