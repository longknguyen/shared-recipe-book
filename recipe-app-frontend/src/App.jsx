import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));

function App() {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
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