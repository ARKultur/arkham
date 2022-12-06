import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, Card, Paragraph, Text, Title } from 'react-native-paper';

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

const Profile = () => {
  return (
    <View style={{padding: 20, flex: 1}}>
      <View style={styles.container}>

        <Avatar.Text size={150} label="JD" />
        <Text variant="headlineLarge" style={styles.headlines}>John Doe</Text>
      </View>

      <CardInfo title="First Name" value="John" />
      <CardInfo title="Last Name" value="Doe" />
      <CardInfo title="Email" value="john@doe.epitech.eu" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    padding: 20,
  },

});

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;