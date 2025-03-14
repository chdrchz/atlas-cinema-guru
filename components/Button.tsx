import { ReactNode, MouseEventHandler } from "react";
import "@/styles/Button/styles.css";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, className = "", onClick }: ButtonProps) {
  return (
    <button className={`custom-button ${className}`.trim()} onClick={onClick}>
      {children}
    </button>
  );
}