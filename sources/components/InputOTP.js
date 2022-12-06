import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';

// TODO : Create real OTP input with 4 boxes

const InputOTP = (props) => {
  const {code, setCode} = props;

  return (
    <View>
      <TextInput
        value={code}
        onChangeText={text => setCode(text)}
        placeholder={'Enter your code'}
      />
    </View>
  );
};

InputOTP.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
};

export default InputOTP;