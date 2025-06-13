import api from "./apiTerraces";
import { type Terrace } from "../types/TerraceType";

export async function fetchTerraces(): Promise<Terrace[]> {
  try {
    const response = await api.get<Terrace[]>("/terraces");
    return response.data;
  } catch (error) {
    console.error("Error obtenint terrasses:", error);
    throw new Error("No s'han pogut carregar les terrasses.");
  }
}
