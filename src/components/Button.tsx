import React from "react";

export default function Button({ onClick, children, type="button" }: { onClick?: () => void; children: React.ReactNode; type?: "button" | "submit" | "reset"; }) {
    return (
        <button
        type ={type}
        onClick={onClick}
        >
        {children}
        </button>
    );
    }