import { COLORS } from '../../constants/colors';
import { Place } from '../../model/place';
import { Pressable, View, Image, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: COLORS.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
    width: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  tile: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.gray700,
  },
  address: {
    fontSize: 12,
    color: COLORS.gray700,
  },
});

const PlaceItem = ({ place, onSelect }: { place: Place; onSelect: any }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.tile}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
