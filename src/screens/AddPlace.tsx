import PlaceForm from '../components/Places/PlaceForm';
import { Place } from '../model/place';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { insertPlace } from '../utils/database';

const AddPlace = ({ navigation }: { navigation: NativeStackNavigationProp<any> }) => {
  const createPlaceHandler = (place: Place) => {
    insertPlace(place).then((data: any) => {
      console.log(data);
    });
    navigation.navigate('AllPlaces', {
      place: place,
    });
    return {};
  };
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
