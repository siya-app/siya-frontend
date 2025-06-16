import api from "./apiTerraces";
import { type Terrace } from "../types/TerraceType";

export async function fetchTerraceById(id: string): Promise<Terrace> {
  try {
    const response = await api.get<Terrace>(`/terraces/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obtenint terrassa per ID:", error);
    throw new Error("No s'ha pogut carregar la terrassa.");
  }
}
