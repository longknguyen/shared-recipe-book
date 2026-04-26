export default function EmptyState({ title, description, action }) {
    return (
        <div className="animate-fade-up rounded-[28px] border border-dashed border-brand-300 bg-white/75 p-10 text-center shadow-soft">
            <h3 className="text-xl font-semibold text-brand-950">{title}</h3>
            <p className="mt-3 text-sm text-brand-700">{description}</p>
            {action ? <div className="mt-5">{action}</div> : null}
        </div>
    );
}
