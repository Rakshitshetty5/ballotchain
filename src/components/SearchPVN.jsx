import React, { useState } from 'react'
import VotingResult from './VotingResult'

const SearchPVN = () => {
  const [pvn, setPvn] = useState('')
  return (
      <div className='flex flex-col items-center space-y-5 bg-[#0909c0] py-5 px-2 md:px-10 rounded-lg'>
        <div className='flex'>
            <input 
                placeholder='Enter PVN'
                value={pvn}
                onChange={e => setPvn(e.target.value)}
                className="border-2 p-2 md:w-[24rem] rounded-l-lg"
            />
            <button className='bg-[#c45252] rounded-r-lg px-4 py-2 border-2 border-[#c45252] text-white'>Search</button>
        </div>
        <VotingResult />
      </div>
  )
}

export default SearchPVN