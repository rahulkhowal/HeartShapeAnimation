/**
 * Heart Animation App
 * React Native App with 8 Hearts in Vertical Column
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import HeartAnimation from './src/components/HeartAnimation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Demo</Text>
      </View>
      
      <View style={styles.heartColumn}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <View key={index} style={styles.heartWrapper}>
            <HeartAnimation 
              size={60}
              onPress={() => console.log(`Heart ${index} pressed!`)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  heartColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  heartWrapper: {
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
