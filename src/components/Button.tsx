import React from "react";


export default function Button({ onClick, children, type="button", className }: { onClick?: () => void; children: React.ReactNode; type?: "button" | "submit" | "reset"; className?: string}) {
    return (
        <button
        type ={type}
        onClick={onClick}
        className={className}
        >
        {children}
        </button>
    );
    }