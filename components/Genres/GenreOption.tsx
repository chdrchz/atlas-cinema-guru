import "@/styles/Genre/styles.css";

interface GenreProps {
    title: string;
}

export default function GenreOption({ title }: GenreProps) {
    return (
        <button className="button-genre">{title}</button>
    )
}