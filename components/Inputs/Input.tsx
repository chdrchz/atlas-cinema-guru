import "@/styles/Input/styles.css";

export default function Input({ placeholder }: { placeholder: React.ReactNode }) {
    return (
        <input className="input" placeholder={String(placeholder)} />
    );
}