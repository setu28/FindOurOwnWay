import "./App.css";
import { Route, Routes} from "react-router-dom";
import Home from "./components/Pages/Home";
//import SignupStudentForm from "./components/core/Auth/SignupStudentForm";
import VerifyEmail from "./components/core/Auth/VerifyEmail";
//import SignupMentorForm from "./components/core/Auth/SignupMentorForm";
import { SignupForm } from "./components/core/Auth/SignupForm";
import Navbar from "./components/common/Navbar";
import VerifyOtp from "./components/Pages/VerifyOtp";
import AddressForm from "./components/core/Auth/AddressForm";
import { MainPage } from "./components/core/Mentor/RoadMapCreation/MainPage";
import { PublishPage } from "./components/core/Mentor/RoadMapCreation/PublishPage";
import { MainLandingPage} from "./components/Pages/ExploreRoadMaps/MainLandingPage"

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-Rose-50 font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<VerifyEmail/>}/>
        <Route path="/verify-otp" element={<VerifyOtp/>}/>
        <Route path="/signupForm" element={<SignupForm/>}/>
        <Route path="/signup/addressDetails" element={<AddressForm/>}/>
        <Route path="/createRoadmap" element={<MainPage/>}/>
        <Route path="/publishRoadmap" element={<PublishPage/>}/>
        <Route path="/viewRoadMaps" element={<MainLandingPage/>}/>

      </Routes>
    </div>
   
  );
}

export default App;
