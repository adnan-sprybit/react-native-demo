import Geolocation from '@react-native-community/geolocation';
import {useEffect} from 'react';
import {useState} from 'react';

export default function useGetDeviceLocation() {
  const [deviceCurrentLocation, setDeviceCurrentLocation] = useState({});
  useEffect(() => {
    // if (Platform.OS !== 'web')
    getLocation();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(info => {
      setDeviceCurrentLocation({
        lat: info.coords.latitude,
        lng: info.coords.longitude,
      });
    });
  };

  return {
    deviceCurrentLocation,
    getLocation,
  };
}
