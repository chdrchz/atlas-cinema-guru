"use client";

import "@/styles/Page/styles.css";
import "@/styles/Cinema/styles.css";
import Movie from "@/components/Cinema/Movie";
import { useEffect, useState } from "react";
import { fetchFavorites } from "@/lib/data";
import { useSession } from "next-auth/react";

export default function Favorites() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "user@example.com";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function getFavoriteMovies() {
      try {
        setLoading(true);
        const data = await fetchFavorites(currentPage, userEmail);

        setMovies(data);
        setHasMore(data.length === 6); // Assuming page size is 6
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch favorite movies:", error);
        setError("Failed to load favorite movies. Please try again later.");
        setLoading(false);
      }
    }

    getFavoriteMovies();
  }, [currentPage, userEmail]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container-movie-list">
      <div>
        <h1 className="page-title">Favorites</h1>
      </div>

      {loading && currentPage === 1 ? (
        <div className="loading">Loading favorite movies...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : movies.length === 0 ? (
        <div className="no-results">No movies in your favorites list</div>
      ) : (
        <div className="movie-container">
          <div className="movie-list">
            {movies.map((movie, index) => (
              <Movie key={`${movie.id}-${index}`} title={movie} />
            ))}
          </div>

          <div className="pagination">
            <button
              className="pagination-button prev"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-indicator">Page {currentPage}</span>
            <button
              className="pagination-button next"
              onClick={handleNextPage}
              disabled={!hasMore}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
