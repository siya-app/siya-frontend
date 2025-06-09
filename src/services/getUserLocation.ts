
export function getUserLocation(): Promise<object> {
    return new Promise ((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(
    
        function(position) {
            const userLatitude: number = position.coords.latitude;
            const userLongitude: number = position.coords.longitude;
            console.log(`Latitude: ${userLatitude}, Longitude: ${userLongitude}`);

            resolve({ latitude: userLatitude, longitude: userLongitude });
        },
        function(error) {
            reject(console.error("Error getting the location: ", error));
        });
    });
}