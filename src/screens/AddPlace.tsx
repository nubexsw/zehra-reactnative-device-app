import PlaceForm from '../components/Places/PlaceForm';
import { Place } from '../model/place';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { insertPlace } from '../utils/database';

const AddPlace = ({ navigation }: { navigation: NativeStackNavigationProp<any> }) => {
  const createPlaceHandler = (place: Place) => {
    const innerCall = async () => {
      await insertPlace(place);
    };
    innerCall();
    navigation.navigate('AllPlaces');
    return {};
  };
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
