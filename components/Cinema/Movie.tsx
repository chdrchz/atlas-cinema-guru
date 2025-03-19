import Image from "next/image";
import PlaceholderSVG from "@/assets/placeholder.svg";

export default function Movie({ title }) {
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
          <p>icons should go here</p>
        </div>
        <div className="movie-info">
          <p className="movie-title">{title.title}</p>
          <p className="movie-synopsis">{title.synopsis}</p>
        </div>
      </div>
    </div>
  );
}
