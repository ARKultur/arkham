import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('window');

const getIcon = name => {
  if (name === 'AR') {
    return <Icon name={'dice-d20'} style={{...styles.icons, fontSize: 38}} />;
  } else if (name === 'Profile') {
    return <Icon name={'user'} style={styles.icons} />;
  } else if (name === 'Home') {
    return <Icon name={'home'} style={styles.icons} />;
  }
};

const Item = ({label, onPress}) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      style={styles.item}>
      <View style={styles.item}>{getIcon(label)}</View>
    </TouchableOpacity>
  );
};

const ItemAR = ({label, onPress}) => {
  const {colors} = useTheme();
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 150,
          width: 80,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {getIcon(label)}
      </View>
    </Pressable>
  );
};

function BottomMenu({navigation}) {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primary,
          bottom: insets.bottom ? insets.bottom : styles.container.bottom,
        },
      ]}>
      <View style={styles.itemsContainer}>
        <Item label={'Home'} onPress={() => navigation.navigate('Home')} />
        <ItemAR label={'AR'} onPress={() => navigation.navigate('AR')} />
        <Item
          label={'Profile'}
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    bottom: 20,
    width: width / 1.5,
    borderRadius: 50,
    alignSelf: 'center',
  },
  icons: {
    fontSize: width > 400 ? 22 : 18,
    color: 'white',
  },
  text: {
    fontSize: width > 400 ? 12 : 10,
    color: 'white',
  },
  itemsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default BottomMenu;
