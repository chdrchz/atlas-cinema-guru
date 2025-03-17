"use client";

import "@/styles/Cinema/styles.css";
import Movie from "@/components/Cinema/Movie";
import { useEffect, useState } from "react";
import { fetchTitles } from "@/lib/data";

export default function MovieList() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function getTitles() {
      try {
        setLoading(true);
        const data = await fetchTitles(
          currentPage,
          2000,
          2025,
          "",
          [],
          "user@example.com"
        );
        
        setTitles(data);
        setHasMore(data.length === 6);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch titles:", error);
        setError("Failed to load movies. Please try again later.");
        setLoading(false);
      }
    }

    getTitles();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading && currentPage === 1) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (titles.length === 0) {
    return <div className="no-results">No movies found</div>;
  }

  return (
    <div className="movie-container">
      <div className="movie-list">
        {titles.map((title) => (
          <Movie key={title.id} title={title} />
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
  );
}