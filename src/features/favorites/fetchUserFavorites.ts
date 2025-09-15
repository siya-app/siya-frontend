export const getUserFavorites = async () => {
  const token = localStorage.getItem("token"); // o localStorage.getItem("accessToken")
  console.log(token)

  if (!token) {
    throw new Error("Usuari no autenticat.");
  }

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/favorites`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("No s'han pogut obtenir els favorits.");
  }

  const data = await response.json();
  console.log(data)
  return data; // poden ser terrace IDs o terrasses completes, depèn del teu backend
};
