
type Location = {
    latitude: number;
    longitude: number;
};

export async function fetchWeather({ latitude, longitude }: Location, date:string): Promise<object> {
 
      try {
    const startDate = date; // por ejemplo '2025-08-22'
    const endDate = date;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude.toFixed(
      2
    )}&longitude=${longitude.toFixed(
      2
    )}&hourly=temperature_2m,cloud_cover&start_date=${startDate}&end_date=${endDate}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log("API weather response:", data);
    return data;
  } catch (error) {
    console.error("Error, no weather today", error);
    return {};
  }
}