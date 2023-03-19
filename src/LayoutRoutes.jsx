import React, { lazy } from 'react'
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from './components/Footer';
import { useSelector } from "react-redux";

const ResultsPage = lazy(() => import("./pages/ResultsPage"))
const VotingPage = lazy(() => import("./pages/VotingPage"))
const Home = lazy(() => import("./pages/Home"))
const VerifyVoterPage = lazy(() => import("./pages/VerifyVoterPage"))
const MyAccountPage = lazy(() => import("./pages/MyAccountPage"))


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
            {allowedRouted && <Route path={allowedRouted.path} element={allowedRouted.component}/>}
            <Route path="/myAccount" element={<MyAccountPage />}/>
        </Routes>
        <Footer />
    </div>
  )
}

export default LayoutRoutes