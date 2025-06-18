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
    id: string;
};

export type ScrollSnapProps = {
    children: React.ReactNode;
};

export type SearchBarProps = {
    query: string;
    onSearch: (query: string) => void;
    onQueryChange: (query: string) => void;
};

export type BlobListProps = {
    category: 'cover' | 'dietary' | 'emotional' | 'food' | 'placement';
    className?: string;
};

export type OrderByOption =
    | 'rating'
    | 'is_claimed'
    | 'near_you'
    | 'default';