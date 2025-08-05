'use client';

import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RoutePoint {
  location: {
    name: string;
    country: string;
    lat: number;
    lng: number;
  };
  shippingType: string;
  provider?: string;
  distance?: string;
}

interface RouteMapProps {
  route: {
    points: RoutePoint[];
    general: {
      totalPrice: number;
      totalCurrency: string;
      totalTransitTime: number;
      totalCo2: {
        amount: number;
        price: number;
      };
      validityFrom: string;
      validityTo: string;
      alternative: boolean;
    };
  };
}

const RouteMap: React.FC<RouteMapProps> = ({ route }) => {
  const points = route.points.map((point) => [
    point.location.lat,
    point.location.lng,
  ]);

  // Calculate center of the map
  const center = points.length > 0 ? [points[0][0], points[0][1]] : [0, 0];

  // Create a direct line from start to end
  const directRoute =
    points.length >= 2 ? [points[0], points[points.length - 1]] : points;

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer
        center={center as [number, number]}
        zoom={3}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Direct route line */}
        {directRoute.length >= 2 && (
          <Polyline
            positions={directRoute as [number, number][]}
            color="#1976d2"
            weight={4}
            opacity={0.8}
          />
        )}

        {/* Markers for all points */}
        {route.points.map((point, index) => (
          <Marker
            key={index}
            position={[point.location.lat, point.location.lng]}
            icon={L.divIcon({
              className: 'custom-marker',
              html: `
                <div style="
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background-color: ${index === 0 ? '#4caf50' : index === route.points.length - 1 ? '#f44336' : '#ff9800'};
                  color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 12px;
                  font-weight: bold;
                  border: 2px solid white;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                ">
                  ${index + 1}
                </div>
              `,
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            })}
          >
            <Popup>
              <div>
                <h3
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  {point.location.name}, {point.location.country}
                </h3>
                <p style={{ margin: '4px 0', fontSize: '12px' }}>
                  <strong>Coordinates:</strong> {point.location.lat.toFixed(4)},{' '}
                  {point.location.lng.toFixed(4)}
                </p>
                <p style={{ margin: '4px 0', fontSize: '12px' }}>
                  <strong>Shipping Type:</strong> {point.shippingType}
                </p>
                {point.provider && (
                  <p style={{ margin: '4px 0', fontSize: '12px' }}>
                    <strong>Provider:</strong> {point.provider}
                  </p>
                )}
                {point.distance && (
                  <p style={{ margin: '4px 0', fontSize: '12px' }}>
                    <strong>Distance:</strong> {point.distance} km
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RouteMap;
