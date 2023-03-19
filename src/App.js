import { Route, Routes, useNavigate } from "react-router-dom";
import LayoutRoutes from "./LayoutRoutes";
import { useSelector } from "react-redux";
import { useEffect, lazy } from 'react'
import { SnackbarProvider, useSnackbar } from "notistack";

const AuthPage = lazy(() => import("./pages/AuthPage"))


function App() {
  const currentUser = useSelector(state => state.auth.currentUser)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!currentUser){
      navigate('/login')

      //To Implement : when user logs in and tries to go to the login page not handled!!!
    }
  }, [currentUser, navigate])

  const DismissAction = ({ id }) => {
    const { closeSnackbar } = useSnackbar();
    return (
      <span onClick={() => closeSnackbar(id)} className="">
        <img
          className="h-4 cursor-pointer"
          src={require("./assets/images/Close.png")}
          alt="close"
        />
      </span>
    );
  };

  return (
    <SnackbarProvider maxSnack={5} action={(key) => <DismissAction id={key} />}>
      <Routes>
        <Route path={'/login'} element={<AuthPage />}/>
        <Route path={'/*'} element={<LayoutRoutes />}/>
      </Routes>
    </SnackbarProvider>
  );
}

export default App;


// try{
        
// }catch(err){
//   enqueueSnackbar(err.response?.data?.message ?? err.message, {
//     variant: "error",
//   });
// }