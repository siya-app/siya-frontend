export type GenericButtonProps = {
    children: React.ReactNode;
    type: ButtonType;
    onClick?: () => void;
};

export type ButtonType = "button" | "submit" | "reset";

export type BlobCardProps = {
    className?: string;
    picture: string;
    businessName: string;
    rating: number;
    blob: string;
};

export type ScrollSnapProps = {
    children: React.ReactNode;
};

export type SearchBarProps = {
    query: string;
    onSearch: (query: string) => void;
    onQueryChange: (query: string) => void;
};