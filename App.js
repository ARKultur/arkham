import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
      <PaperProvider>
        <Text>
          TurboARKulturDansLaRueWola
        </Text>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
