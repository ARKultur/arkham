import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Paragraph, Text, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';

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

  return (
    <View style={{padding: 20, flex: 1}}>
      <View style={styles.container}>

        <Avatar.Text size={150} label={user.last_name[0] + user.first_name[0]} />
        <Text variant="headlineLarge" style={styles.headlines}>{user.last_name + user.first_name}</Text>
      </View>

      <View style={styles.containerContent}>
        <CardInfo title="First Name" value={user.last_name} />
        <CardInfo title="Last Name" value={user.first_name} />
        <CardInfo title="Email" value={user.email} />
        <View style={styles.containerButton}>
          <Button mode="contained" onPress={() => navigation.navigate('Settings')} contentStyle={styles.button}>
            <Text style={styles.button}>Settings</Text>
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