
import { useEffect } from 'react';
import { useMap  } from 'react-leaflet';

const RecenterAutomatically = ({ position }) => {

    const map = useMap();
     useEffect(() => {
       map.setView([position.lat, position.lng]);
     }, [position, map]);
     return null;
   };

   export default RecenterAutomatically;
