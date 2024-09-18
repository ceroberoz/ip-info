import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  lat: number;
  lon: number;
  landmarks?: Array<{
    name: string;
    lat: number;
    lon: number;
  }>;
}

const MapComponent: React.FC<MapComponentProps> = ({
  lat,
  lon,
  landmarks = [],
}) => {
  // Define custom icon for user location
  const userIcon = L.icon({
    iconUrl: "/images/leaflet/marker-icon.png",
    iconRetinaUrl: "/images/leaflet/marker-icon-2x.png",
    shadowUrl: "/images/leaflet/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Define landmark icon
  const landmarkIcon = L.icon({
    iconUrl: "/images/leaflet/landmark-icon.png",
    iconRetinaUrl: "/images/leaflet/landmark-icon-2x.png",
    shadowUrl: "/images/leaflet/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} icon={userIcon}>
        <Popup>Your location</Popup>
      </Marker>
      {landmarks.map((landmark, index) => (
        <Marker
          key={index}
          position={[landmark.lat, landmark.lon]}
          icon={landmarkIcon}
        >
          <Popup>{landmark.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
