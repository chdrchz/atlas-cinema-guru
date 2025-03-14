"use client";

import SideNavItem from "./SideNavItem";

import { FolderClosed } from "lucide-react";
import { Clock } from "lucide-react";
import { Star } from "lucide-react";

import "@/styles/SideNav/styles.css";

export default function SideNav() {
  return (
    <div className="container-sidenav">
      <SideNavItem title="Home" icon={FolderClosed} href="/" />
      <SideNavItem title="Favorites" icon={Star} href="/favorites" />
      <SideNavItem title="Watch Later" icon={Clock} href="/watchLater" />
    </div>
  );
}
