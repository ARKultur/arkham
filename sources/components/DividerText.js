import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const DividerText = (props) => {
  const { children } = props;
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black', margin: 10}} />
      <View>
        <Text style={{width: '100%', textAlign: 'center', fontSize: 15}}>{children}</Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black', margin: 10}} />
    </View>
  );
};

DividerText.propTypes = {
  children: PropTypes.string.isRequired,
};

export default DividerText;