import React, { useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

interface MapViewProps {
  markers?: any[];
  routePolyline?: string;
  onMarkerClick?: (id: string) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const IBM_LOCATION = { lat: 37.2144, lng: -121.7825 };

// Minimal Dark Style
const mapOptions = {
  disableDefaultUI: true,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8a8a8a" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
  ],
};

const MapView: React.FC<MapViewProps> = ({ markers = [], routePolyline }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });

  const center = useMemo(() => {
    if (markers.length > 0) return { lat: markers[0].lat, lng: markers[0].lng };
    return IBM_LOCATION;
  }, [markers]);

  const decodedPath = useMemo(() => {
    if (!routePolyline) return [];
    // Note: In a real app, use a polyline decoder library
    // For now, this is a placeholder for the decoded path
    return [];
  }, [routePolyline]);

  if (!isLoaded) return (
    <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
      <div className="text-pink animate-pulse font-bold text-xs uppercase tracking-widest">
        Initializing Orbital View...
      </div>
    </div>
  );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={11}
      options={mapOptions}
    >
      {/* IBM Destination */}
      <Marker 
        position={IBM_LOCATION}
        icon={{
          path: "M 0,0 m -5,-5 L 5,-5 L 5,5 L -5,5 Z",
          fillColor: "#1f70c1",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff",
          scale: 3
        }}
        title="IBM 555 Bailey Ave"
      />

      {/* Intern Markers */}
      {markers.map((m, i) => {
        const circlePath = (window as any).google?.maps?.SymbolPath?.CIRCLE ?? 0;
        return (
          <Marker
            key={i}
            position={{ lat: m.lat, lng: m.lng }}
            title={m.name}
            icon={{
              path: circlePath,
              fillColor: m.type === 'driver' ? '#3b82f6' : '#ff006e',
              fillOpacity: 1,
              strokeWeight: m.isSelected ? 4 : 1,
              strokeColor: "#ffffff",
              scale: m.isSelected ? 8 : 6
            }}
          />
        );
      })}

      {routePolyline && (
        <Polyline
          path={decodedPath}
          options={{
            strokeColor: "#ff006e",
            strokeOpacity: 0.8,
            strokeWeight: 4,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapView;
