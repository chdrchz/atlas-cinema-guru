import Button from "./Button";
import { Film } from "lucide-react";

import "@/styles/Header/styles.css";

export default function Header() {
    return(
        <div className="container-header">
            <div className="app-title">
                <Film />
                <p>Cinema Guru</p>
            </div>
            <div className="container-header-user">
                <p>Welcome, user!</p>
                <Button>Logout</Button>
            </div>
        </div>
    )
}