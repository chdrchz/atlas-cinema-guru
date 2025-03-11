import { ReactNode } from "react"
import Button from "../Button"

export default function SideNavItem({ children }: {chidren: ReactNode}) {
    return (
        <Button>{children}</Button>
    )
}