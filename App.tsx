import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AllPlaces from './src/screens/AllPlaces';
import AddPlace from './src/screens/AddPlace';
import IconButton from './src/components/UI/IconButton';
import { COLORS } from './src/constants/colors';
import Map from './src/screens/Map';
import { init } from './src/utils/database';
import { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './src/screens/PlaceDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  const [dbInitialized, setDbInitialized] = useState(false);
  // execute only once when App loads
  useEffect(() => {
    init()
      .then(() => {
        console.log('ok db initialiazed');
        setDbInitialized(true);
      })
      .catch((error) => {
        setDbInitialized(false);
        console.log(error);
      });
  }, []);

  if (!dbInitialized) {
    <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="AllPlaces"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary500 },
          headerTintColor: COLORS.gray700,
          contentStyle: { backgroundColor: COLORS.gray700 },
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            title: 'Your Favorite Places',
            headerRight: ({ tintColor }) => (
              <IconButton
                name="add"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate('AddPlace')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{
            title: 'Add a new Place',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{
            title: 'Loading Place...',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
