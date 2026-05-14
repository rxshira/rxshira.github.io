import { CarpoolUser, Carpool } from '../types';

/**
 * SMART ROUTE-AWARE MATCHING ALGORITHM
 * 
 * Objective: 
 * 1. For each driver, calculate optimal route to IBM (555 Bailey Ave).
 * 2. Find riders whose pickup adds <= 10 mins to total trip.
 * 3. Maximize seat occupancy.
 */

// Mock destination: IBM San Jose
const IBM_DESTINATION = { lat: 37.2144, lng: -121.7825 }; // 555 Bailey Ave

export interface RouteInfo {
  distance: number; // in meters
  duration: number; // in seconds
  polyline: string;
}

// Interface for distance service (can be Google or Mock)
export interface DistanceService {
  getRoute: (origin: { lat: number, lng: number }, destination: { lat: number, lng: number }, waypoints?: { lat: number, lng: number }[]) => Promise<RouteInfo>;
}

export const runMatchingAlgorithm = async (
  drivers: CarpoolUser[],
  riders: CarpoolUser[],
  service: DistanceService,
  detourThresholdMinutes: number = 10
): Promise<Carpool[]> => {
  const carpools: Carpool[] = [];
  const assignedRiderIds = new Set<string>();

  // Sort drivers (could prioritize by seats or distance)
  const sortedDrivers = [...drivers].sort((a, b) => b.seats_available - a.seats_available);

  for (const driver of sortedDrivers) {
    if (driver.seats_available <= 0) continue;

    const currentCarpoolMembers: CarpoolUser[] = [];
    let currentSeats = driver.seats_available;
    
    // 1. Baseline: Driver -> IBM
    const baseline = await service.getRoute(
      { lat: driver.latitude, lng: driver.longitude },
      IBM_DESTINATION
    );

    // 2. Evaluate potential riders with a Proximity Pre-Filter (Cost Saving)
    const candidates = riders
      .filter(r => !assignedRiderIds.has(r.id))
      .map(r => {
        // Calculate rough Euclidean distance to driver's route start
        const dx = r.latitude - driver.latitude;
        const dy = r.longitude - driver.longitude;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return { rider: r, roughDist: dist, score: 0 };
      })
      // Only keep people within a reasonable rough "box" to save API credits
      // 0.1 degrees is roughly 7 miles / 11 km
      .filter(p => p.roughDist < 0.2) 
      .sort((a, b) => a.roughDist - b.roughDist)
      .slice(0, 10); // Only evaluate the 10 closest people with expensive API

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i].rider;
      
      // Calculate detour: Driver -> Rider -> IBM
      const routeWithRider = await service.getRoute(
        { lat: driver.latitude, lng: driver.longitude },
        IBM_DESTINATION,
        [{ lat: candidate.latitude, lng: candidate.longitude }]
      );

      const detourDuration = (routeWithRider.duration - baseline.duration) / 60; // in minutes

      // Check both driver's threshold and rider's threshold
      if (detourDuration <= driver.max_detour_minutes && detourDuration <= candidate.max_detour_minutes) {
        candidates[i].score = detourDuration;
      } else {
        candidates[i].score = 999; // Exceeds threshold for one or both
      }
    }

    // Sort riders by smallest detour
    const compatibleRiders = candidates
      .filter(p => p.score <= detourThresholdMinutes)
      .sort((a, b) => a.score - b.score);

    // 3. Fill seats
    const finalRiders: CarpoolUser[] = [];
    let finalRoute = baseline;

    for (const compatible of compatibleRiders) {
      if (finalRiders.length < currentSeats) {
        // Recalculate route with ALL currently selected riders to ensure total detour is still okay
        const proposedWaypoints = [...finalRiders, compatible.rider].map(r => ({ lat: r.latitude, lng: r.longitude }));
        const combinedRoute = await service.getRoute(
          { lat: driver.latitude, lng: driver.longitude },
          IBM_DESTINATION,
          proposedWaypoints
        );

        const totalDetour = (combinedRoute.duration - baseline.duration) / 60;
        if (totalDetour <= detourThresholdMinutes) {
          finalRiders.push(compatible.rider);
          assignedRiderIds.add(compatible.rider.id);
          finalRoute = combinedRoute;
        }
      }
    }

    if (finalRiders.length > 0) {
      carpools.push({
        id: `pool_${driver.id}_${Date.now()}`,
        driver_id: driver.id,
        member_ids: [driver.id, ...finalRiders.map(r => r.id)],
        pickup_order: finalRiders.map(r => r.id),
        accepted_ids: [],
        status: 'suggested',
        estimated_duration: Math.round(finalRoute.duration / 60),
        estimated_distance: parseFloat((finalRoute.distance / 1609.34).toFixed(1)), // meters to miles
        route_polyline: finalRoute.polyline,
        created_at: new Date() // Will be converted to Firestore Timestamp
      });
    }
  }

  return carpools;
};
