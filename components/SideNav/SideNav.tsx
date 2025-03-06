import SideNavItem from "./SideNavItem";
import "@/styles/SideNav/styles.css";

export default function SideNav() {
  return (
    <div className="container-sidenav">
      <SideNavItem>Home</SideNavItem>
      <SideNavItem>Favorites</SideNavItem>
      <SideNavItem>Watch Later</SideNavItem>
    </div>
  );
}
