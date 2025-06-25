import { createContext, useState, type ReactNode } from "react";
import axios from 'axios'
import type { User } from "../types/User";


interface UserContextType {
    allUsers : User[];
    owners : User[];
    userError: string | unknown;
    getUsers: () => Promise<void>;
}

interface UserProviderProps  {
    children: ReactNode
}
const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProvider ({children}: UserProviderProps) {
    const [allUsers, setAllUsers] = useState <User[]> ([]);
    const [owners, setOwners] = useState <User[]> ([]);
    const [userError, setUserError] = useState <string | unknown> ("");

    const getUsers = async () =>{
        const usersURL = import.meta.env.VITE_API_ALL_USERS;

        try{
            const response = await axios.get<User[]>(usersURL);
            setAllUsers(response.data);
            const newArray = response.data.filter(user => user.id_terrace != null)
            setOwners(newArray)
        } catch (error: unknown){
            setUserError(error)
        }
    }

    return(
        <UserContext.Provider value={{getUsers, allUsers, owners, userError}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}