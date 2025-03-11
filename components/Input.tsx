export default function Input({ placeholder }: { placeholder: React.ReactNode }) {
    return (
        <input className="input" placeholder={String(placeholder)} />
    );
}