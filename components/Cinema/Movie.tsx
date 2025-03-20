"use client";

import "@/styles/Cinema/styles.css"

import Image from "next/image";
import PlaceholderSVG from "@/assets/placeholder.svg";
import { Clock, Star } from "lucide-react";
import { insertFavorite, deleteFavorite, insertWatchLater, deleteWatchLater } from "@/lib/data"; // Update the import path to match your project structure
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Movie({ title }) {
  const [isFavorite, setIsFavorite] = useState(title.favorited || false);
  const [isWatchLater, setIsWatchLater] = useState(title.watchLater || false);
  const { data: session } = useSession();
  
  const handleWatchLater = async () => {
    try {
      if (!session?.user?.email) {
        // Handle not logged in case
        alert("Please log in to add to your Watch Later list");
        return;
      }
      
      if (isWatchLater) {
        await deleteWatchLater(title.id, session.user.email);
        setIsWatchLater(false);
        console.log(`Removed "${title.title}" from watch later`);
      } else {
        await insertWatchLater(title.id, session.user.email);
        setIsWatchLater(true);
        console.log(`Added "${title.title}" to watch later`);
      }
    } catch (error) {
      console.error("Error updating watch later status:", error);
      alert("Failed to update watch later status");
    }
  };

  const handleFavorite = async () => {
    try {
      if (!session?.user?.email) {
        // Handle not logged in case
        alert("Please log in to add to your Favorites");
        return;
      }
      
      if (isFavorite) {
        await deleteFavorite(title.id, session.user.email);
        setIsFavorite(false);
        console.log(`Removed "${title.title}" from favorites`);
      } else {
        await insertFavorite(title.id, session.user.email);
        setIsFavorite(true);
        console.log(`Added "${title.title}" to favorites`);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
      alert("Failed to update favorite status");
    }
  };

  return (
    <div className="movie-item">
      <Image
        className="img-movie"
        src={title.image || PlaceholderSVG}
        alt={title.title}
        width={500}
        height={500}
      />
      <div className="hover-movie">
        <div className="icons">
          <button 
            className={`icon-button ${isWatchLater ? 'active' : ''}`}
            onClick={handleWatchLater}
            aria-label={isWatchLater ? "Remove from watch later" : "Add to watch later"}
          >
            <Clock color={isWatchLater ? "#3b82f6" : "currentColor"} />
          </button>
          <button 
            className={`icon-button ${isFavorite ? 'active' : ''}`}
            onClick={handleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star color={isFavorite ? "#ffd700" : "currentColor"} />
          </button>
        </div>
        <div className="movie-info">
          <p className="movie-title">{title.title} ({title.released})</p>
          <p className="movie-synopsis">{title.synopsis}</p>
          <div className="movie-genre">
            <p>{title.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
