import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { Alert, StyleSheet } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IconButton from '../components/UI/IconButton';

const Map = ({ navigation }: { navigation: NativeStackNavigationProp<any> }) => {
  const [selectedLocation, setSelectedLocation] = useState<
    { lat: number; lng: number } | undefined
  >();
  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapPressEvent) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      lat: lat,
      lng: lng,
    });
  };

  // useCallback is used to avoid potential infinite loops when passing this method to the effect
  // it is used to not be recreated unnecesarily
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked',
        'You have to pick a location (by tapping on the map) first!',
      );
      return;
    }
    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton name="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title="Picker Location"
          coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
