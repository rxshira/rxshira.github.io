import { DistanceService, RouteInfo } from './matching';

export const mockDistanceService: DistanceService = {
  getRoute: async (origin, destination, waypoints = []) => {
    // Simple Euclidean distance simulation
    const calculateDist = (p1: any, p2: any) => {
      const dx = p1.lat - p2.lat;
      const dy = p1.lng - p2.lng;
      return Math.sqrt(dx * dx + dy * dy);
    };

    let totalDist = 0;
    let prev = origin;
    
    for (const wp of waypoints) {
      totalDist += calculateDist(prev, wp);
      prev = wp;
    }
    totalDist += calculateDist(prev, destination);

    // Convert "degrees" to something resembling meters (approx 111km per degree)
    const meters = totalDist * 111000;
    
    // Assume 30mph (13.4 m/s) average speed
    const seconds = meters / 13.4;

    return {
      distance: meters,
      duration: seconds,
      polyline: "" // Empty for mock
    };
  }
};
