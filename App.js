import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import CardInfo from "./src/CardInfo";

export default function App() {
  return (
      <PaperProvider>
          <CardInfo/>
      </PaperProvider>
  );
}
