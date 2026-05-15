import { DistanceService, RouteInfo } from './matching';

export class GoogleDistanceService implements DistanceService {
  constructor(apiKey?: string) {
    // API key is handled by the script loader in MapView or globally
  }

  async getRoute(origin: { lat: number, lng: number }, destination: { lat: number, lng: number }, waypoints: { lat: number, lng: number }[] = []): Promise<RouteInfo> {
    if (!(window as any).google || !(window as any).google.maps) {
      throw new Error("Google Maps library not loaded");
    }

    const service = new (window as any).google.maps.DirectionsService();
    
    return new Promise((resolve, reject) => {
      service.route({
        origin: new (window as any).google.maps.LatLng(origin.lat, origin.lng),
        destination: new (window as any).google.maps.LatLng(destination.lat, destination.lng),
        waypoints: waypoints.map(wp => ({
          location: new (window as any).google.maps.LatLng(wp.lat, wp.lng),
          stopover: true
        })),
        travelMode: (window as any).google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      }, (result: any, status: any) => {
        if (status === 'OK' && result.routes[0]) {
          const route = result.routes[0];
          let totalDist = 0;
          let totalDur = 0;
          route.legs.forEach((leg: any) => {
            totalDist += leg.distance.value;
            totalDur += leg.duration.value;
          });

          resolve({
            distance: totalDist,
            duration: totalDur,
            polyline: route.overview_polyline
          });
        } else {
          reject(new Error(`Directions request failed: ${status}`));
        }
      });
    });
  }

  static async geocode(address: string, apiKey: string): Promise<{ lat: number, lng: number } | null> {
    if (!(window as any).google || !(window as any).google.maps) {
      // Fallback to fetch if library not loaded (though DirectionsService is preferred)
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
      const resp = await fetch(url);
      const data = await resp.json();
      return data.status === 'OK' ? data.results[0].geometry.location : null;
    }

    const geocoder = new (window as any).google.maps.Geocoder();
    return new Promise((resolve) => {
      geocoder.geocode({ address }, (results: any, status: any) => {
        if (status === 'OK') {
          resolve(results[0].geometry.location.toJSON());
        } else {
          resolve(null);
        }
      });
    });
  }
}
