"use client";

import { ElementType } from "react";
import { useRouter } from "next/navigation";
import Button from "../Button";

interface SideNavItemProps {
    title: string;
    icon?: ElementType;
    href?: string;
}

export default function SideNavItem({ title, icon: Icon, href }: SideNavItemProps) {
    const router = useRouter();

    const handleClick = () => {
        if (href) {
            router.push(href);
        }
    };

    return (
        <Button className="button-sidenav" onClick={handleClick}>
            {Icon && <Icon />}
            {title}
        </Button>
    );
}