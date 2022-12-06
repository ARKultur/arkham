import React from 'react';
import { Appbar as PaperAppbar } from 'react-native-paper';
import PropTypes from 'prop-types';

const Appbar = ({navigation}) => (
  <PaperAppbar.Header>
    {navigation.canGoBack() && <PaperAppbar.BackAction onPress={() => navigation.goBack()} /> }
  </PaperAppbar.Header>
);

Appbar.propTypes = {
  navigation: PropTypes.shape({
    canGoBack : PropTypes.bool.isRequired,
    goBack: PropTypes.func,
  }).isRequired,
};

export default Appbar;
