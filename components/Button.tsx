import { ReactNode } from "react";
import "@/styles/Button/styles.css";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

export default function Button({ children, className = "" }: ButtonProps) {
  return (
    <button className={`custom-button ${className}`.trim()}>{children}</button>
  );
}