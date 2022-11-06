import React from 'react'
import PageContainer from '../components/PageContainer'
import { MENU } from '../data/menu'
import { useNavigate } from 'react-router-dom'
import DigitalCard from "../components/DigitalCard"

const CURRENT_ACTIVE_PHASE = 1

const Home = () => {
  const navigate = useNavigate()
  return (
    <PageContainer>
        <div className='flex flex-col md:flex-row md:items-center justify-between'>
            <h1 className='text-2xl font-light'>Welcome Sushil!</h1>
            <h1 className='text-2xl font-light'>Current Active Phase: <span className='text-[green]'>Registration</span></h1>
        </div>
        <div className='flex my-10'>
            <DigitalCard />
        </div>
        <div className='grid md:grid-cols-3 mt-5 gap-5'>
            {
                MENU.map(item => 
                    <div key={item.id} onClick={() => navigate(item.path)} className="cursor-pointer h-[10rem] flex flex-col items-center justify-center rounded-xl shadow-xl relative group">
                        <h1 className='text-2xl'>{item.title}</h1>
                        <span className='text-[0.8rem] font-light'>{item.subtitle}</span>
                        {item.id !== CURRENT_ACTIVE_PHASE && <div className='items-center justify-center absolute h-full w-full rounded-xl top-0 left-0 z-10 bg-[red] opacity-[0.9] hidden group-hover:flex'>
                            Closed
                        </div>}
                    </div>    
                )
            }
        </div>
    </PageContainer>
  )
}

export default Home