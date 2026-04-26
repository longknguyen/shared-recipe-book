import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput.jsx";
import AuthPanel from "../components/auth/AuthPanel.jsx";
import AppShell from "../components/layout/AppShell.jsx";
import { loginUser } from "../services/users.js";
import { setCurrentUser } from "../utils/auth.js";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const user = await loginUser(form);
            setCurrentUser(user);
            navigate("/profile");
        } catch (submitError) {
            setError(submitError.message);
        }
    };

    return (
        <AppShell accent="soft">
            <AuthPanel
                mode="Login"
                title="Welcome back"
                subtitle="Sign in to reach your profile, collections, published recipes and review history."
                onSubmit={handleSubmit}
                error={error}
                submitLabel="Log in"
                footerText="Need an account?"
                footerLinkTo="/register"
                footerLinkLabel="Create one"
                fields={
                    <>
                        <AuthInput
                            label="Username"
                            value={form.username}
                            onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
                            placeholder="Enter your username"
                        />
                        <AuthInput
                            label="Password"
                            type="password"
                            value={form.password}
                            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                            placeholder="Enter your password"
                        />
                    </>
                }
            />
        </AppShell>
    );
}
