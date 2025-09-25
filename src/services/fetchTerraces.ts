import api from "./apiTerraces";
import type { CustomTerraceType } from "../types/zod/customTerrace-schema";


export async function fetchTerraces(): Promise<CustomTerraceType[]> {
  try {
    const response = await api.get<CustomTerraceType[]>("/terraces");
    return response.data;
    
  } catch (error) {
    console.error("Error obtenint terrasses:", error);
    throw new Error("No s'han pogut carregar les terrasses.");
  }
}
