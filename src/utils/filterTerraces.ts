import type { CustomTerraceType } from "../types/zod/customTerrace-schema";

export function filterTerraces(terraces: CustomTerraceType[], filters: string[]) {
    if (filters.length === 0) return terraces;

}