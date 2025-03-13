import { ReactNode } from "react";

import "@/styles/Button/styles.css";

export default function Button({ children }: {children: ReactNode}) {
    return (
        <button className="custom-button">{children}</button>
    )
}