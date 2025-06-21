export const calculateDistance = (
    userLat: number,
    userLong: number,
    terraceLat: number,
    terraceLong: number
): number => {

    // Radius of the Earth in km
    const earthRadiusKm = 6371;
    const latDistance = (terraceLat - userLat) * (Math.PI / 180);
    const longDistance = (terraceLong - userLong) * (Math.PI / 180);

    // Part of the Haversine formula — helps find the angular distance
    const a =
        Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
        Math.cos(userLat * (Math.PI / 180)) *
        Math.cos(terraceLat * (Math.PI / 180)) *
        Math.sin(longDistance / 2) *
        Math.sin(longDistance / 2);

    const arcLength = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // returns distance in km
    return earthRadiusKm * arcLength;
};