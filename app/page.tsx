import "@/styles/Page/styles.css";

import FilterAndSearch from "@/components/FilterAndSearch";
import GenreList from "@/components/Genres/GenreList";
import MovieList from "@/components/Cinema/MovieList";

export default async function Page() {
  return (
    <div className="container-home-page">
      <div className="container-filter-genre">
        <FilterAndSearch />
        <GenreList />
      </div>
      <div className="container-movie-list">
        <MovieList />
      </div>
    </div>
  );
}
