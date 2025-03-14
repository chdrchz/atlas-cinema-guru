import "@/styles/Page/styles.css";

import MovieList from "@/components/Cinema/MovieList";

export default async function WatchLater() {
    return (
        <div className="container-movie-list">
            <div>
                <h1 className="page-title">Watch Later</h1>
            </div>
            <MovieList />
        </div>
    )
}