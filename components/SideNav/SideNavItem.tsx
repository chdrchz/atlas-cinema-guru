import Button from "../Button";
import { ElementType } from "react";

interface SideNavItemProps {
    title: string;
    icon?: ElementType;
}

export default function SideNavItem({ title, icon: Icon }: SideNavItemProps) {
    return (
        <Button className="button-sidenav">
            {Icon && <Icon />}
            {title}
        </Button>
    )
}