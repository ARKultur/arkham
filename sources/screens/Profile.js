import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Paragraph, Text, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/Actions/userActions';

const CardInfo = ({title, value}) => {
  return (
    <Card style={{marginTop: 10}}>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{value}</Paragraph>
      </Card.Content>
    </Card>
  );
};

CardInfo.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const Profile = ({navigation}) => {
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  return (
    <View style={{padding: 20, flex: 1}}>
      <View style={styles.container}>

        <Avatar.Text size={150} label={user && user.username && user.username[0]} />
        <Text variant="headlineLarge" style={styles.headlines}>{user && user.username}</Text>
      </View>

      <View style={styles.containerContent}>
        {/* <CardInfo title="First Name" value={user.last_name} /> */}
        {/* <CardInfo title="Last Name" value={user.first_name} /> */}
        <CardInfo title="Username" value={user.username} />
        <CardInfo title="Email" value={user.email} />
        <View style={styles.containerButton}>
          {/* <Button mode="contained" onPress={() => navigation.navigate('Settings')} contentStyle={styles.button}>
            <Text style={styles.button}>Settings</Text>
          </Button> */}
          <Button mode="outlined" style={{marginTop: 10}} onPress={() => dispatch(logout())}>
            Logout
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    alignItems: 'center',
    padding: 20,
  },
  containerContent: {
    flex: 0.5,
    flexDirection: 'column',
  },
  button: {
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
  },
  containerButton : {
    marginTop: 30,
  },
});

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;