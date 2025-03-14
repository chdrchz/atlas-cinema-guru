import "@/styles/Page/styles.css";

import MovieList from "@/components/Cinema/MovieList";

export default async function Favorites() {
    return (
        <div className="container-movie-list">
            <div>
                <h1 className="page-title">Favorites</h1>
            </div>
            <MovieList />
        </div>
    )
}