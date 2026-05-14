import { DistanceService, RouteInfo } from './matching';

export class GoogleDistanceService implements DistanceService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getRoute(origin: { lat: number, lng: number }, destination: { lat: number, lng: number }, waypoints: { lat: number, lng: number }[] = []): Promise<RouteInfo> {
    const originStr = `${origin.lat},${origin.lng}`;
    const destStr = `${destination.lat},${destination.lng}`;
    const waypointsStr = waypoints.map(wp => `${wp.lat},${wp.lng}`).join('|');
    
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destStr}&waypoints=${waypointsStr}&key=${this.apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error(`Google Directions API error: ${data.status}`);
      }

      const route = data.routes[0];
      const leg = route.legs[0]; // For simple routes, take first leg total
      
      // Calculate totals across all legs (in case of waypoints)
      let totalDistance = 0;
      let totalDuration = 0;
      route.legs.forEach((l: any) => {
        totalDistance += l.distance.value;
        totalDuration += l.duration.value;
      });

      return {
        distance: totalDistance,
        duration: totalDuration,
        polyline: route.overview_polyline.points
      };
    } catch (error) {
      console.error("Failed to fetch route from Google:", error);
      throw error;
    }
  }

  static async geocode(address: string, apiKey: string): Promise<{ lat: number, lng: number }> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        return data.results[0].geometry.location;
      }
      throw new Error(`Geocoding failed: ${data.status}`);
    } catch (error) {
      console.error("Geocoding error:", error);
      return { lat: 37.3382, lng: -121.8863 }; // Fallback
    }
  }
}
