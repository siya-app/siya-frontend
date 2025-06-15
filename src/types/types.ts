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
};