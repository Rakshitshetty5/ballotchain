import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LayoutRoutes from "./LayoutRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/login'} element={<AuthPage />}/>
        <Route path={'/*'} element={<LayoutRoutes />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
