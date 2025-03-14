import Image from "next/image";
import PlaceholderSVG from "@/assets/placeholder.svg";

export default function Movie() {
    return (
        <div>
            <Image src={PlaceholderSVG} alt="Movie Placeholder" width={500} height={500} />
        </div>
    )
}