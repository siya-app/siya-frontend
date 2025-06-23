import { createContext, useState} from "react";
import type { ReactNode } from "react";
import axios from "axios";

interface Terrace {
  address: string;
  business_name: string;
  is_claimed : boolean;
  [key: string]: any;
}

interface TerraceContextType {
  allTerraces: Terrace[];
  claimedTerraces: Terrace[];
  error: string | unknown;
  getTerraces: () => Promise<void>;
}

interface TerraceProviderProps {
  children: ReactNode;
}
const TerraceContext = createContext<TerraceContextType | undefined>(undefined);

function TerraceProvider ({ children }: TerraceProviderProps) {

    const [allTerraces, setAllTerraces] = useState<Terrace[]>([]);
    const [claimedTerraces, setClaimedTerraces] = useState<Terrace[]>([]);
    const [error, setError] = useState <string | unknown> ("");

    const getTerraces = async () => {
            const terraceURL = import.meta.env.VITE_API_ALL_TERRACES
        try{
            const response = await axios.get(terraceURL);
            setAllTerraces(response.data);
            const newArray = allTerraces.filter(terrace => terrace.is_claimed === true)
            setClaimedTerraces(newArray)
            
            
            
        } catch (error: unknown) {
            setError(error)
        }
    }
    return(
        <TerraceContext.Provider value={{allTerraces, error, getTerraces, claimedTerraces}}>
            {children}
        </TerraceContext.Provider>
    )
}

export {TerraceContext, TerraceProvider}