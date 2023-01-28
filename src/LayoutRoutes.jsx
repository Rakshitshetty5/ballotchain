import React from 'react'
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ResultsPage from './pages/ResultsPage';
import Header from "./components/Header";
import Footer from './components/Footer';
import VotingPage from './pages/VotingPage';
import Home from './pages/Home';
import MyAccountPage from './pages/MyAccountPage';
import VerifyVoterPage from './pages/VerifyVoterPage';
import { useSelector } from "react-redux";

const protectedRoutes = [
  { title: 'Verification', id: 1, component: <VerifyVoterPage />, path: '/verify' },
  { title: 'Voting', id: 2, component: <VotingPage />, path: '/vote'},
  { title: 'Results', id: 3, component: <ResultsPage />, path: '/results'}
]

const LayoutRoutes = () => {
  const CURRENT_ACTIVE_PHASE = useSelector(state => state.auth.phase)
  

  const allowedRouted = protectedRoutes.find(el => el.id === CURRENT_ACTIVE_PHASE)

  return (
    <div className='flex flex-col min-h-[100vh]'>
        <Header />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path={allowedRouted.path} element={allowedRouted.component}/>
            <Route path="/myAccount" element={<MyAccountPage />}/>
        </Routes>
        <Footer />
    </div>
  )
}

export default LayoutRoutes