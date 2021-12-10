import React from "react";
import {Button, Card, Text} from "react-native-paper";
import {StyleSheet, ScrollView, View} from "react-native";
import {CardTitle} from "react-native-paper/src/components/Card/CardTitle";
import CardContent from "react-native-paper/src/components/Card/CardContent";
import CardActions from "react-native-paper/src/components/Card/CardActions";
import {CardCover} from "react-native-paper/src/components/Card/CardCover";
import AvatarIcon from "react-native-paper/src/components/Avatar/AvatarIcon";
import { useNavigation } from '@react-navigation/native';

function CardInfo(props) {
    const navigation = useNavigation();

    return(
        <View>
            <Card style={styles.card}>
                <CardCover source={{uri: "https://upload.wikimedia.org/wikipedia/commons/6/60/Notre_Dame_de_Fourvi%C3%A8re.jpg?uselang=fr"}} theme="default"/>
                <CardTitle title={props.title}
                           theme="default"
                           titleStyle={{color: '#000000'}}
                           left={() => {return (<AvatarIcon size={40} icon="church" style={{backgroundColor: 'rgba(255,255,255,0)'}}/>)}}
                />
                <CardContent>
                    <ScrollView style={{maxHeight: 100}}>
                        <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae ullamcorper purus, vel vehicula orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nec porta nisl, et finibus felis. Mauris pellentesque nulla lacus, sit amet pretium ante cursus lobortis. Donec volutpat dapibus ipsum, in porta orci placerat porta. Nulla facilisi. Nunc semper bibendum ullamcorper. Donec hendrerit arcu lorem, a sollicitudin dolor facilisis a. Etiam mollis diam non diam ultricies tempor. Donec tristique non ligula</Text>
                    </ScrollView>
                </CardContent>
                <CardActions>
                    <Button mode="contained"
                            onPress={() => {
                                console.log('info');
                                navigation.navigate('InfoScreen');
                            }}
                            style={{backgroundColor: 'rgb(121,121,121)'}}
                    >
                        More information
                    </Button>
                    <Button mode="contained"
                            onPress={() => console.log('scan')}
                            style={styles.button}
                    >
                        Scan
                    </Button>
                </CardActions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgb(204,204,204)',
    },
    text: {
        fontSize: 15,
        color: '#000000'
    },
    button: {
        marginLeft: 10,
        backgroundColor: 'rgb(121,121,121)'
    }
});

export default CardInfo;
