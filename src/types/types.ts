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
    distance?: number
};

export type ScrollSnapProps = {
    children: React.ReactNode;
};

export type SearchBarProps = {
    query: string;
    onSearch?: (query: string) => void;
    onQueryChange?: (query: string) => void;
};

export type BlobListProps = {
    category: 'cover' | 'dietary' | 'emotional' | 'food' | 'placement';
    className?: string;
};

export type OrderByOption =
    | 'rating'
    | 'is_claimed'
    | 'nearby'
    | 'favs'
    | 'default';

export type Review = {
    id: string;
    terraceId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
    userName?: string; // opcional si ve del join o inclòs al JSON

};

export type ReviewCardProps = {
    rating: number;
    comment: string;
    userName: string; // suposem que ve de Supabase amb join o inclòs al JSON
};