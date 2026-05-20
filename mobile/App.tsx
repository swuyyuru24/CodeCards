import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import CaptureScreen from './src/screens/CaptureScreen';
import DecksScreen from './src/screens/DecksScreen';
import ReviewScreen from './src/screens/ReviewScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        <Tab.Screen name="Capture" component={CaptureScreen} />
        <Tab.Screen name="Decks" component={DecksScreen} />
        <Tab.Screen name="Review" component={ReviewScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
