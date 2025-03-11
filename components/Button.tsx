import { ReactNode } from "react";

export default function Button({ children }: {children: ReactNode}) {
    return (
        <button className="custom-button">{children}</button>
    )
}