import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  lat: number;
  lon: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lon }) => {
  // Define custom icon
  const icon = L.icon({
    iconUrl: "/images/leaflet/marker-icon.png",
    iconRetinaUrl: "/images/leaflet/marker-icon-2x.png",
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
      <Marker position={[lat, lon]} icon={icon}>
        <Popup>Your location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
