import { useIsFocused } from '@react-navigation/native';
import PlacesList from '../components/Places/PlacesList';
import { useEffect, useState } from 'react';
import { fetchPlaces } from '../utils/database';

const AllPlaces = ({ route }: { route: any }) => {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState<any>([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const allPlaces = await fetchPlaces();
      setLoadedPlaces(allPlaces);
      console.log(allPlaces);
    };
    if (isFocused) {
      loadPlaces();
      //setLoadedPlaces((curPlaces: any[]) => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
