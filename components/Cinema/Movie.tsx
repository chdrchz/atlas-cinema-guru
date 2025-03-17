import Image from "next/image";
import PlaceholderSVG from "@/assets/placeholder.svg";

// Update the Movie component to accept a 'title' prop
export default function Movie({ title }) {
  return (
    <div>
      <Image
        className="img-movie"
        src={title.image || PlaceholderSVG}
        alt={title.title}
        width={500}
        height={500}
      />
    </div>
  );
}
