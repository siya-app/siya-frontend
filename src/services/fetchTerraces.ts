export async function fetchTerraces() {
  try {
    const response = await fetch("http://localhost:8080/terraces", {
     // credentials: "include", // Només si backend usa cookies o auth
    });

    if (!response.ok) {
      throw new Error("No s'han pogut carregar les terrasses.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obtenint terrasses:", error);
    throw error;
  }
}
