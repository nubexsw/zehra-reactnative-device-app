import {
  ImagePickerResult,
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from 'expo-image-picker';
import { useState } from 'react';
import { Alert, View, Image, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});

const ImagePicker = ({ onTakeImage }: { onTakeImage: (imageUri: string) => void }) => {
  const [pickedImage, setPickedImage] = useState<string | undefined>();
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    const image: ImagePickerResult = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (image.assets && image.assets.length > 0) {
      setPickedImage(image.assets[0].uri);
      onTakeImage(image.assets[0].uri);
    }
  };

  const verifyPermissions = async () => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.',
      );
      return false;
    }
    return true;
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;
