import { useState, useEffect } from "react"
import type { CustomTerraceType } from "../types/zod/customTerrace-schema"
import { fetchTerraces } from "../services/terrace-services/terrace.service"

// export const TerraceListHook = async () => {

//     const fetchedTerraces = await fetchTerraces();

//     const [terraceList, setTerraceList] = useState<CustomTerraceType[]>([])
//     console.log(`terraceList --> ${terraceList.splice(0, 100)} +[...]`);

//     useEffect(() => {
//         setTerraceList(fetchedTerraces);
//     }, []);
// }


export const useTerraceList = () => {
    const [terraceList, setTerraceList] = useState<CustomTerraceType[]>([]);

    useEffect(() => {
        fetchTerraces().then((data) => {
            if (data) setTerraceList(data);
        });
    }, []);

    return { terraceList, setTerraceList };
};