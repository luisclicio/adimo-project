import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@mantine/core';

export function Map({
  height = '520px',
  center = [-7, -41],
  zoom = 10,
  markers = [],
  sx = {},
  ...props
}) {
  return (
    <Box
      sx={(theme) => ({
        borderRadius: theme.radius.md,
        height: height,
        overflow: 'hidden',
        width: '100%',

        [theme.fn.smallerThan('sm')]: {
          height: '320px',
        },
        ...sx,
      })}
      {...props}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        style={{ height: '100%', width: '100%', zIndex: '0' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers.map((marker) => (
          <Marker
            key={marker.position}
            title={marker.title}
            position={marker.position}
          >
            <Popup
              keepInView
              autoClose={false}
              closeButton={false}
              closeOnClick={false}
            >
              {marker.content}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}
