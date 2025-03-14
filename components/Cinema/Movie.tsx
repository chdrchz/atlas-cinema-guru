import Image from "next/image";
import PlaceholderSVG from "@/assets/placeholder.svg";

export default function Movie() {
    return (
        <div>
            <Image src={PlaceholderSVG} alt="Movie Placeholder" width={300} height={300} />
        </div>
    )
}