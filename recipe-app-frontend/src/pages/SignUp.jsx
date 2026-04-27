import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput.jsx";
import AuthPanel from "../components/auth/AuthPanel.jsx";
import AppShell from "../components/layout/AppShell.jsx";
import { usernameExists } from "../services/users.js";
import { setPendingUser } from "../utils/auth.js";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.username.trim() || !form.password.trim()) {
            setError("Username and password are both required.");
            return;
        }

        try {
            const taken = await usernameExists(form.username.trim());
            if (taken) {
                setError("Username is taken!");
                return;
            }
        } catch (checkError) {
            setError(checkError.message || "Unable to validate username right now.");
            return;
        }

        setPendingUser({
            username: form.username.trim(),
            password: form.password,
        });

        navigate("/completeprofile");
    };

    return (
        <AppShell accent="soft">
            <AuthPanel
                mode="Sign up"
                title="Create your kitchen account"
                subtitle="Start with a username and password, then finish your profile on the next screen."
                onSubmit={handleSubmit}
                error={error}
                submitLabel="Continue"
                footerText="Already registered?"
                footerLinkTo="/login"
                footerLinkLabel="Log in"
                fields={
                    <>
                        <AuthInput
                            label="Username"
                            value={form.username}
                            onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
                            placeholder="Enter a username"
                        />
                        <AuthInput
                            label="Password"
                            type="password"
                            value={form.password}
                            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                            placeholder="At least 6 characters"
                        />
                    </>
                }
            />
        </AppShell>
    );
}
