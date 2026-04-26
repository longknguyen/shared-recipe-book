import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingState from "./components/common/LoadingState.jsx";
import { getCurrentUser, getPendingUser } from "./utils/auth.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/SignUp.jsx"));
const CompleteProfile = lazy(() => import("./pages/completeProfile.jsx"));
const Recipes = lazy(() => import("./pages/Recipes.jsx"));
const RecipeDetail = lazy(() => import("./pages/RecipeDetail.jsx"));
const Collections = lazy(() => import("./pages/Collections.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));

function App() {
    return (
        <Suspense fallback={<LoadingState fullScreen label="Loading the kitchen" />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/completeprofile"
                    element={
                        <PendingSignupRoute>
                            <CompleteProfile />
                        </PendingSignupRoute>
                    }
                />
                <Route
                    path="/recipes"
                    element={
                        <ProtectedRoute>
                            <Recipes />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/recipes/:recipeId"
                    element={
                        <ProtectedRoute>
                            <RecipeDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/collections"
                    element={
                        <ProtectedRoute>
                            <Collections />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
}

function ProtectedRoute({ children }) {
    return getCurrentUser() ? children : <Navigate to="/login" replace />;
}

function PendingSignupRoute({ children }) {
    return getPendingUser() ? children : <Navigate to="/register" replace />;
}

export default App;
