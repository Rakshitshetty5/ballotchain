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
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const LayoutRoutes = () => {
  return (
    <div className='flex flex-col min-h-[100vh]'>
        <Header />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/results" element={<ResultsPage />}/>
            <Route path="/vote" element={<VotingPage />}/>
            <Route path="/myAccount" element={<MyAccountPage />}/>
            <Route path="/verify" element={<VerifyVoterPage />}/>
        </Routes>
        <Footer />
    </div>
  )
}

export default LayoutRoutes