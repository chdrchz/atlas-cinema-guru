export default function Input({ placeholder }: { placeholder: React.ReactNode }) {
    return (
        <input className="container-input" placeholder={String(placeholder)} />
    );
}