import { axiosRequest } from "../../config/api-connection-service";
import { createApiInstance } from "../../config/api-connection-config";

// const url = 'http://localhost:8080/terraces';

// export const customTerraceApi = createApiInstance(url)

// export async function fetchTerraces() {

//     try {
//         const response = await axiosRequest(customTerraceApi, url);

//         if (response.length === 0) {
//             console.error("❌ No terrace records found");
//             return [];
//         }

//         return response;

//     } catch (error) {
//         console.error("❌ Error fetching terraces, error:", error);
//         return [];
//     }
    

// }

// src/services/terrace-services/terrace.service.ts

export async function fetchTerraces() {
    try {
        const response = await fetch("/terraces.db.json"); // relative path to public/
        if (!response.ok) {
            throw new Error("Failed to load terraces.json");
        }

        const data = await response.json();

        if (data.length === 0) {
            console.error("❌ No terrace records found");
            return [];
        }

        return data;

    } catch (error) {
        console.error("❌ Error fetching local terraces JSON:", error);
        return [];
    }
}