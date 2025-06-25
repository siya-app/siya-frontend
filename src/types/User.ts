export interface User {
    id : string;
    name :  string;
    email : string;
    birth_date : string;
    id_terrace : string | null;
    rol : "client" | "owner";
    [key: string]: unknown;
}