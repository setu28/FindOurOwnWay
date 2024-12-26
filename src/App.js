import "./App.css";
import { Route, Routes} from "react-router-dom";
import Home from "./components/Pages/Home";

import Navbar from "./components/common/Navbar";


function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-Rose-50 font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
      </Routes>
    </div>
   
  );
}

export default App;
