import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";


const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const CompleteProfile = lazy(()=> import("./pages/completeProfile.jsx"));
function App() {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/completeprofile" element={<CompleteProfile/> }/>
                <Route path="/profile" element={<Profile /> }/>
            </Routes>
        </Suspense>

    );
}

function Loading() {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-white">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-[#F1524A] rounded-full animate-spin" />
        </div>
    );
}

export default App;