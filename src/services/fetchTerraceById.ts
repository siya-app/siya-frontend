import api from "./apiTerraces";
import { type Terrace } from "../types/TerraceType";
import type { CustomTerraceType } from "../types/zod/customTerrace-schema";

export async function fetchTerraceById(id: string): Promise<CustomTerraceType> {
  try {
    const response = await api.get<CustomTerraceType>(`/terraces/${id}`);
    return response.data;

  } catch (error) {
    console.error("Error obtenint terrassa per ID:", error);
    throw new Error("No s'ha pogut carregar la terrassa.");
  }
}
