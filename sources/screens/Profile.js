import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Button, Card, Paragraph, Text, Title} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../reducers/Actions/userActions';
import {getSuggestions} from '../API/Suggestions';

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

const SuggestionsInfo = () => {
  const {user} = useSelector(state => state.userReducer);
  const [suggestions, setSuggestions] = React.useState([]);

  const getData = async () => {
    try {
      const data = await getSuggestions(user.token);
      const selectedSuggestions = data.filter(
        item =>
          user &&
          user.likedSuggestions &&
          user.likedSuggestions.includes(item.uuid),
      );

      setSuggestions(selectedSuggestions);
    } catch (error) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card style={{marginTop: 10}}>
      <Card.Content>
        <Title>{'Suggestions'}</Title>
        <Paragraph>
          {suggestions && suggestions.length > 0
            ? suggestions.map(item => item.name).join(', ')
            : 'No suggestions.'}
        </Paragraph>
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
    <ScrollView contentContainerStyle={{padding: 20}}>
      <View style={styles.container}>
        <Avatar.Text
          size={150}
          label={user && user.username && user.username[0]}
        />
        <Text variant="headlineLarge" style={styles.headlines}>
          {user && user.username}
        </Text>
      </View>
      <View style={styles.containerContent}>
        <CardInfo title="Username" value={user.username} />
        <CardInfo title="Email" value={user.email} />
        <SuggestionsInfo />
        <View style={styles.containerButton}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Settings')}
            contentStyle={styles.button}>
            <Text style={styles.button}>Settings</Text>
          </Button>
          <Button
            mode="outlined"
            style={{marginTop: 10}}
            onPress={() => dispatch(logout())}>
            Logout
          </Button>
        </View>
      </View>
    </ScrollView>
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
  containerButton: {
    marginTop: 30,
  },
});

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
