import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Place } from '../../model/place';
import PlaceItem from './PlaceItem';
import { COLORS } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: COLORS.primary200,
  },
  list: {
    margin: 24,
  },
});

const PlacesList = ({ places }: { places: Place[] }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const selectPlaceHandler = (id: string) => {
    navigation.navigate('PlaceDetails', {
      placeId: id,
    });
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler} />}
    />
  );
};

export default PlacesList;
