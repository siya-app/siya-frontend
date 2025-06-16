
type Location = {
    latitude: number;
    longitude: number;
};

export async function fetchWeather({ latitude, longitude }: Location): Promise<object> {
 
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude.toFixed(2)}&longitude=${longitude.toFixed(2)}&current=cloud_cover&hourly=temperature_2m`);
        const data = await response.json();
        console.log(`API weather response: ${data}`);
        return data;
    } catch (error) {
        const errorMssg: string = "Error, no weather today";
        console.error(errorMssg, error);
        return {};
    }
}