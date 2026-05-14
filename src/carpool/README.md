# IBM Intern Carpool Matcher - Integration Guide

This feature has been successfully integrated as an isolated module in `src/carpool`.

## Google Maps Integration (Final Step)

To enable real-world routing and traffic-aware matching, follow these steps:

### 1. API Key Setup
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the following APIs:
   - Maps JavaScript API
   - Directions API
   - Geocoding API
   - Distance Matrix API
3. Create an API Key and add it to your `.env` file:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_key_here
   ```

### 2. Swap Mock Service for Real Google Maps
I have designed the `matching.ts` algorithm to be service-agnostic. 
Once you have the key, you can implement a `GoogleDistanceService` in `src/carpool/lib/googleService.ts` that calls the Google Directions API and swap it in `CarpoolAdmin.tsx`.

### 3. Geocoding
Currently, the `ProfileForm` uses hardcoded coordinates for San Jose. 
With the API key enabled, you should update `ProfileForm.tsx` to geocode the user's address upon saving:
```typescript
const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`);
```

## Security & Isolation
- All carpool logic is in `src/carpool`.
- Routes are protected by `CarpoolGuard`.
- Existing site admin logic in `AuthContext` was preserved.
- Data is stored in new Firestore collections: `carpool_users` and `carpools`.

## Visual Vibe
The app inherits your site's:
- **Typography:** Space Grotesk / Megisha
- **Colors:** Pink (#ff006e) / Hot Pink / Dark Gray
- **Effects:** Neon text, glow wrappers, and Framer Motion transitions.

Enjoy the new feature!
