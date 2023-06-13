import React from 'react';
import { NativeModules } from 'react-native';

const ARScreen = () => {
  return (
    <>
      {NativeModules.Geospacial.runPoc()}
    </>
  );
};

export default ARScreen;
