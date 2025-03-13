import FilterAndSearch from "@/components/FilterAndSearch";
import GenreList from "@/components/Genres/GenreList";

export default async function Page() {
  return (
    <div>
      <FilterAndSearch />
      <GenreList />
    </div>
  );
}
