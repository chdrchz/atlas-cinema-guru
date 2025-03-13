import GenreOption from "./GenreOption"

export default function GenreList() {
    return (
        <div className="genre-container">
            <div className="genre-heading">
                <p>Genres</p>
            </div>
            <div className="genre-list">
                <GenreOption title="genre 1" />
                <GenreOption title="genre 2" />
                <GenreOption title="genre 3" />
                <GenreOption title="genre 4" />
                <GenreOption title="genre 5" />
                <GenreOption title="genre 6" />
                <GenreOption title="genre 7" />
                <GenreOption title="genre 8" />
            </div>
        </div>
    )
}