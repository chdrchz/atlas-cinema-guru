import SideNavItem from "./SideNavItem";

import { FolderClosed } from "lucide-react";
import { Clock } from "lucide-react";
import { Star } from "lucide-react";

import "@/styles/SideNav/styles.css";

export default function SideNav() {
  return (
    <div className="container-sidenav">
      <SideNavItem title="Home" icon={FolderClosed} />
      <SideNavItem title="Favorites" icon={Star} />
      <SideNavItem title="Watch Later" icon={Clock} />
    </div>
  );
}
