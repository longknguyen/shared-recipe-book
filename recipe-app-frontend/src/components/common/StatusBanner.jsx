export default function StatusBanner({ tone = "info", message }) {
    if (!message) {
        return null;
    }

    const styles = {
        info: "border-brand-300 bg-brand-cream text-brand-800",
        success: "border-emerald-200 bg-emerald-50 text-emerald-700",
        danger: "border-rose-200 bg-rose-50 text-rose-700",
    };

    return (
        <div className={`animate-fade-in rounded-2xl border px-4 py-3 text-sm ${styles[tone]}`}>
            {message}
        </div>
    );
}
