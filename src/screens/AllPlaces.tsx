import { useIsFocused } from '@react-navigation/native';
import PlacesList from '../components/Places/PlacesList';
import { useEffect, useState } from 'react';

const AllPlaces = ({ route }: { route: any }) => {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState<any>([]);

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((curPlaces: any[]) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
