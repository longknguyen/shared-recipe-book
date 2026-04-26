import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell.jsx";
import StatusBanner from "../components/common/StatusBanner.jsx";
import { loginUser, registerUser } from "../services/users.js";
import {
    clearPendingUser,
    getPendingUser,
    setCurrentUser,
} from "../utils/auth.js";

const OCCUPATIONS = [
    "Student",
    "Chef",
    "Parent",
    "Designer",
    "Developer",
    "Teacher",
    "Freelancer",
    "Other",
];

export default function CompleteProfile() {
    const navigate = useNavigate();
    const pendingUser = getPendingUser();
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!pendingUser) {
            setError("Start from the sign-up page so we can finish creating your account.");
            return;
        }

        if (!age || !occupation) {
            setError("Choose both your age and occupation to complete the profile.");
            return;
        }

        try {
            setSaving(true);
            await registerUser({
                username: pendingUser.username,
                password: pendingUser.password,
                age: Number(age),
                occupation,
            });

            const user = await loginUser({
                username: pendingUser.username,
                password: pendingUser.password,
            });

            setCurrentUser(user);
            clearPendingUser();
            navigate("/profile");
        } catch (submitError) {
            setError(submitError.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <AppShell accent="warm">
            <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="animate-fade-up rounded-[34px] bg-brand-950 p-8 text-white shadow-soft">
                    <p className="text-sm uppercase tracking-[0.35em] text-white/65">Profile setup</p>
                    <h1 className="mt-5 font-display text-5xl leading-tight">
                        Finish your account so the app can personalise your kitchen space.
                    </h1>
                    <p className="mt-5 text-sm leading-7 text-white/80">
                        Add a couple of details so your account feels complete from the start.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="animate-fade-up rounded-[34px] border border-white/70 bg-white/80 p-8 shadow-soft"
                >
                    <p className="text-sm uppercase tracking-[0.35em] text-brand-500">Account details</p>
                    <h2 className="mt-3 text-4xl font-semibold text-brand-950">Complete profile</h2>
                    <p className="mt-3 text-sm leading-7 text-brand-700">
                        Add the last details and we’ll finish setting up your account.
                    </p>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-brand-800">Age</span>
                            <select
                                value={age}
                                onChange={(event) => setAge(event.target.value)}
                                className="w-full rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                            >
                                <option value="">Select age</option>
                                {Array.from({ length: 85 }, (_, index) => index + 15).map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-brand-800">Occupation</span>
                            <select
                                value={occupation}
                                onChange={(event) => setOccupation(event.target.value)}
                                className="w-full rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                            >
                                <option value="">Select occupation</option>
                                {OCCUPATIONS.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="mt-5">
                        <StatusBanner tone="danger" message={error} />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="mt-6 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saving ? "Creating account..." : "Create my account"}
                    </button>
                </form>
            </section>
        </AppShell>
    );
}
