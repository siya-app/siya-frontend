import type { SearchBarProps } from '../types/types';
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    //     e.preventDefault();
    //     onSearch?.(query);
    // };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md mx-auto m-5">
            <div className="relative flex justify-center">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={query}
                    onChange={(e) => onQueryChange?.(e.target.value)}
                    className="
                    w-1/2
                    md:w-full
                    p-1 ps-2 pr-4
                    rounded-lg border
                    border-siya-dark-green
                    text-siya-dark-green
                    bg-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-gray-800"
                />
                <button
                    type="submit"
                    className="text-white justify-center ms-3 rounded-full bg-siya-dark-green p-3"
                    onClick={() => console.log(`🔍 clicked`)}
                > <FiSearch/>
                </button>
            </div>
        </form>
    );
}