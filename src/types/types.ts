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

export type BlobListProps = {
    category: 'cover' | 'dietary' | 'emotional' | 'food' | 'placement';
    className?: string;
};

export type OrderByOption =
    | 'rating'
    | 'is_claimed'
    | 'near_you'
    | 'default';

    export type Review = {
  id: string;
  terrace_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user?: {
    id: string;
    name: string;
    // afegeix més si tens més camps de l’usuari que et venen del join
  };
};

export type ReviewCardProps = {
  rating: number;
  comment: string;
  userName: string; // suposem que ve de Supabase amb join o inclòs al JSON
};