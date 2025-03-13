import "@/styles/Page/styles.css";

import FilterAndSearch from "@/components/FilterAndSearch";
import GenreList from "@/components/Genres/GenreList";

export default async function Page() {
  return (
    <div className="container-filter-genre">
      <FilterAndSearch />
      <GenreList />
    </div>
  );
}
