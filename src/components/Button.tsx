import React from "react";
// import type { GenericButtonProps } from "../types/types";
import type { ButtonType } from "../types/types";

export default function Button({ onClick, children, type="button" }:
    { onClick?: () => void; children: React.ReactNode; type?: ButtonType; }) {
    return (
        <button
        type={type}
        onClick={onClick}
        className={className}
        >
        {children}
        </button>
    );
    }