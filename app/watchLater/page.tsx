import "@/styles/Page/styles.css";
import { fetchWatchLaters } from "@/lib/data";
import Movie from "@/components/Cinema/Movie";
import { auth } from "@/auth"; // Assuming you have auth set up

export default async function WatchLater() {
  const session = await auth();
  const userEmail = session?.user?.email || "user@example.com"; // Fallback for testing
  
  // Fetch watch later movies from the server
  const watchLaterMovies = await fetchWatchLaters(1, userEmail);
  
  return (
    <div className="container-movie-list">
      <div>
        <h1 className="page-title">Watch Later</h1>
      </div>
      
      <div className="movie-container">
        <div className="movie-list">
          {watchLaterMovies.length > 0 ? (
            watchLaterMovies.map((movie) => (
              <Movie key={movie.id} title={movie} />
            ))
          ) : (
            <div className="no-results">No movies in your watch later list</div>
          )}
        </div>
      </div>
    </div>
  );
}
