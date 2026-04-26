export default function AuthInput({ label, type = "text", ...props }) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-brand-800">{label}</span>
            <input
                type={type}
                {...props}
                className="w-full rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-brand-950 outline-none transition duration-300 placeholder:text-brand-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
            />
        </label>
    );
}
