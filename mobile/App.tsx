import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import CaptureScreen from './src/screens/CaptureScreen';
import DecksScreen from './src/screens/DecksScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import { seedIfEmpty } from './src/db/seed';
import type { RootTabParamList } from './src/navigation';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    seedIfEmpty()
      .catch((err) => console.warn('Seed failed:', err))
      .finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Tab.Screen name="Capture" component={CaptureScreen} />
        <Tab.Screen name="Decks" component={DecksScreen} />
        <Tab.Screen name="Review" component={ReviewScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
