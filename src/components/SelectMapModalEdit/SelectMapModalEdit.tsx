import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { MapIcon } from "@heroicons/react/24/outline";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent: React.FC<{ setLocation: (latlng: L.LatLng) => void }> = ({ setLocation }) => {
  useMapEvents({
    click(e: any) {
      setLocation(e.latlng);
    },
  });
  return null;
};

type mapTypes = {
  setLatitude: React.Dispatch<React.SetStateAction<string>>;
  setLongitude: React.Dispatch<React.SetStateAction<string>>;
  lat: any,
  lng: any
};

//This component is only for updating the map
const MapUpdater: React.FC<{ isShowModal: boolean }> = ({ isShowModal }) => {  
  const map = useMap();  

  useEffect(() => {  
      if (isShowModal) {  
          map.invalidateSize();  
      }  
  }, [isShowModal, map]);  

  return null; 
}; 

const SelectMapModal: React.FC<mapTypes> = ({ setLatitude, setLongitude, lat , lng }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const center: L.LatLngExpression = [lat, lng];
  const [location, setLocation] = useState<L.LatLng | null>(null);

  const handleLocationChange = (latlng: L.LatLng) => {
    setLocation(latlng);
    setLatitude(latlng.lat.toString());
    setLongitude(latlng.lng.toString());
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-white hover:bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 gap-1 font-semibold py-2 px-4 border border-gray-300 rounded-lg flex items-center"
      >
        <MapIcon className="w-5" />
        <span>انتخاب</span>
      </button>
      <Dialog open={showModal} onClose={setShowModal} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white p-5 dark:bg-slate-700">
                <div className="mt-3 text-center">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 mb-5 text-gray-900 dark:text-gray-200">
                    انتخاب نقطه مکانی
                  </DialogTitle>
                  <div className="h-96 w-full">
                    <MapContainer center={location ? [location.lat, location.lng] : center} zoom={14} style={{ height: "100%", width: "100%" }} className="rounded-lg">
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <MapComponent setLocation={handleLocationChange} />
                      <Marker position={center} />
                      <MapUpdater isShowModal={showModal} /> 
                    </MapContainer>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex justify-center">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setShowModal(false)}
                  className="rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto"
                >
                  بستن
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">
                  انجام شد
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SelectMapModal;
