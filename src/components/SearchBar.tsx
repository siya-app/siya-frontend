import type { SearchBarProps } from '../types/types';
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ query, onSearch, onQueryChange }: SearchBarProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto m-5">
            <div className="relative flex justify-center">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    className="
                    w-1/2
                    md:w-full
                    p-1 ps-2 pr-4
                    rounded-lg border
                    border-gray-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-gray-800"
                />
                <button
                    type="submit"
                    className="text-gray-500 justify-center ms-3 rounded-full bg-gray-100 p-3"
                > <FiSearch/>
                </button>
            </div>
        </form>
    );
}