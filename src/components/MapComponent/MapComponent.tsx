import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// تنظیم آیکون پیش‌فرض برای Marker
const defaultIcon = L.icon({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapComponentProps {
  lat: number,
  lng: number
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => {

  // const center = [lat,lng] as any
  return (
    <MapContainer center={[lat,lng]} zoom={16} style={{ height: "300px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <Marker position={[lat,lng]} icon={defaultIcon}>
        <Popup>
          محل ساختمان
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default MapComponent;
