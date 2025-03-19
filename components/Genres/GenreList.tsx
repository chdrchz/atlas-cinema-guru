"use client";

import { useState, useEffect } from "react";
import GenreOption from "./GenreOption";
import { fetchGenres } from "@/lib/data";

export default function GenreList() {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGenres() {
      try {
        const genreData = await fetchGenres();
        setGenres(genreData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
        setError("Failed to load genres");
        setLoading(false);
      }
    }

    loadGenres();
  }, []);

  if (loading) return <div className="genre-container">Loading genres...</div>;
  if (error) return <div className="genre-container">{error}</div>;

  return (
    <div className="genre-container">
      <div className="genre-heading">
        <p>Genres</p>
      </div>
      <div className="genre-list">
        {genres.map((genre) => (
          <GenreOption key={genre} title={genre} />
        ))}
      </div>
    </div>
  );
}
