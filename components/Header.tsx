"use client";

import Button from "./Button";
import { Film } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import "@/styles/Header/styles.css";

export default function Header() {
  const { data: session } = useSession();

  const userName = session?.user?.name || "Guest";

  return (
    <div className="container-header">
      <div className="app-title">
        <Film />
        <p>Cinema Guru</p>
      </div>
      <div className="container-header-user">
        <p>Welcome, {userName}!</p>
        <Button className="button-header" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
