import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { URL } from '../constants';
import BoatInfo from  './BoatInfo';
import { boatIcon } from './boatIcon';
import { useWs } from '../custom-hooks/useWs';
import RecenterAutomatically from './RecenterAutomatically';
import Spinner from './Spinner';

import 'leaflet/dist/leaflet.css';
import './styles/index.css';

const Map = () => {
  const [ready, val, send] = useWs(URL);
  const [position, setpPosition] = useState(null);

  useEffect(() => {
    if (ready) {
      send('data')
    }
  }, [ready, send]);

  useEffect(() => {
    if (val) {
      const newPosition = {
        lat: val?.latitude,
        lng: val?.longitude
      };

      setpPosition(newPosition);
     };
  }, [val]);

  return (
    <div>
      {!position ? <Spinner /> :
        <MapContainer center={position} zoom={19} >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

              <Marker position={position} icon={boatIcon}>
                <Popup>
                    <BoatInfo data = {val} />
                </Popup>
              </Marker>
            <RecenterAutomatically position={position} />
          </MapContainer>
    }
    </div>
  );
};

export default Map;