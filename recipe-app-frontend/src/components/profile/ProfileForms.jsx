import { useState } from "react";
import StatusBanner from "../common/StatusBanner.jsx";

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

export function EditProfileForm({ user, onSave, saving }) {
    const [age, setAge] = useState(user.age || "");
    const [occupation, setOccupation] = useState(user.occupation || "");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!age || !occupation.trim()) {
            setError("Age and occupation are both required.");
            return;
        }

        setError("");
        await onSave({
            ...user,
            age: Number(age),
            occupation: occupation.trim(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="animate-fade-up rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Profile details</p>
            <h3 className="mt-2 text-2xl font-semibold text-brand-950">Update account info</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
                <select
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                >
                    <option value="">Select age</option>
                    {Array.from({ length: 85 }, (_, index) => index + 15).map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <select
                    value={occupation}
                    onChange={(event) => setOccupation(event.target.value)}
                    className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                >
                    <option value="">Select occupation</option>
                    {OCCUPATIONS.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>


            </div>
            <StatusBanner tone="danger" message={error} />
            <button
                type="submit"
                disabled={saving}
                className="mt-4 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {saving ? "Saving..." : "Save changes"}
            </button>
        </form>
    );
}

export function ChangePasswordForm({ user, onSave, saving }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!oldPassword || !newPassword) {
            setError("Fill in both password fields.");
            return;
        }
        if(newPassword.length<6){
            setError("Password must have at least 6 characters.");
        }

        setError("");
        await onSave({
            id: user.usrID,
            oldPassword,
            newPassword,
        });
        setOldPassword("");
        setNewPassword("");
    };

    return (
        <form onSubmit={handleSubmit} className="animate-fade-up rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Security</p>
            <h3 className="mt-2 text-2xl font-semibold text-brand-950">Change password</h3>
            <div className="mt-5 space-y-4">
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(event) => setOldPassword(event.target.value)}
                    placeholder="Current password"
                    className="w-full rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="New password"
                    className="w-full rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-950 outline-none transition duration-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                />
            </div>
            <StatusBanner tone="danger" message={error} />
            <button
                type="submit"
                disabled={saving}
                className="mt-4 rounded-full bg-brand-950 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {saving ? "Updating..." : "Update password"}
            </button>
        </form>
    );
}

export function DeleteAccountForm({ user, onDelete, deleting }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!password) {
            setError("Enter your password to confirm deletion.");
            return;
        }

        setError("");
        await onDelete({
            id: user.usrID,
            password,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="animate-fade-up rounded-[30px] border border-rose-200 bg-rose-50/80 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-rose-600">Danger zone</p>
            <h3 className="mt-2 text-2xl font-semibold text-rose-900">Delete account</h3>
            <p className="mt-3 text-sm leading-7 text-rose-800">
                This permanently removes your account and clears the personal data connected to it.
            </p>
            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Confirm password"
                className="mt-5 w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm text-rose-950 outline-none transition duration-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
            />
            <StatusBanner tone="danger" message={error} />
            <button
                type="submit"
                disabled={deleting}
                className="mt-4 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {deleting ? "Deleting..." : "Delete my account"}
            </button>
        </form>
    );
}
