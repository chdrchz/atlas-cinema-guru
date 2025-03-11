import "@/styles/Header/styles.css";
import Button from "./Button";

export default function Header() {
    return(
        <div className="container-header">
            <p>Cinema Guru</p>
            <div className="container-header-user">
                <p>Welcome, user!</p>
                <Button>Logout</Button>
            </div>
        </div>
    )
}