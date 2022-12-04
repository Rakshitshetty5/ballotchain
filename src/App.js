import { Route, Routes, useNavigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LayoutRoutes from "./LayoutRoutes";
import { useSelector } from "react-redux";
import { useEffect } from 'react'

function App() {
  const currentUser = useSelector(state => state.auth.currentUser)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!currentUser){
      navigate('/login')

      //To Implement : when user logs in and tries to go to the login page not handled!!!
    }
  }, [currentUser, navigate])

  return (
    <Routes>
      <Route path={'/login'} element={<AuthPage />}/>
      <Route path={'/*'} element={<LayoutRoutes />}/>
    </Routes>
  );
}

export default App;
