import React from "react";
import {Button, Caption, Card, Paragraph, Text, Title} from "react-native-paper";
import {ScrollView, View, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";

function InformationScreen() {
    const navigation = useNavigation();

    return (
        <>
            <ScrollView>
                <Card>
                    <Card.Cover source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Notre_Dame_de_Fourvi%C3%A8re.jpg?uselang=fr' }} />
                </Card>
                <View style={styles.titleMain}>
                    <Title>[NAME]</Title>
                </View>
                <Title style={{marginTop: 20}}>Title 1</Title>
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut eros id neque gravida pharetra. Phasellus non ligula condimentum, congue magna vitae, pharetra dui. Ut lacinia, massa ac aliquet cursus, odio lorem luctus lorem, eget suscipit lectus nulla ac neque. Suspendisse sit amet velit congue ex semper imperdiet ut mollis ex. Nam ut pellentesque odio. Suspendisse a tortor vel lorem egestas dictum. Nulla blandit turpis eu accumsan sollicitudin. Etiam vehicula pellentesque finibus. Nunc fermentum mi non tortor gravida vestibulum et eu lorem. Integer quis massa ligula. Sed faucibus ac erat vel volutpat. Integer ut ante massa. Nulla et mauris ac dui auctor pharetra id eu nibh. Vestibulum a posuere felis, ut sodales tellus. Nam mauris risus, vulputate sit amet cursus et, volutpat in tellus. Nam tristique dolor ac dictum pellentesque.
                </Paragraph>
                <Image style={styles.logo}
                       source={{
                    uri: 'https://cellar-c2.services.clever-cloud.com/org-fourviere-www/uploads/2018/10/Le-site-de-Notre-Dame-de-Fourvi%C3%A8re-Fondation-Fourvi%C3%A8re-2018.jpg',
                }}
                />
                <Caption>Maecenas dignissim mi libero, vel hendrerit libero ullamcorper in</Caption>
                <Title style={ styles.titleText }>Title 2</Title>
                <Paragraph>
                    Donec et massa diam. Proin fermentum semper tellus in hendrerit. Phasellus sit amet viverra tellus. Suspendisse laoreet turpis ac lacinia bibendum. Etiam rutrum eros ac venenatis ornare. Praesent bibendum pulvinar maximus. Duis et arcu tortor. Aliquam semper mi sed vulputate vehicula.
                </Paragraph>
                <Image style={styles.logo}
                       source={{
                           uri: 'https://cellar-c2.services.clever-cloud.com/org-fourviere-www/uploads/2018/10/la-basilique-notre-dame-de-fourvi%C3%A8re-lyon-int%C3%A9rieur.jpg\n',
                       }}
                />
                <Caption>Nullam placerat nisi mauris, at placerat mauris mollis quis</Caption>
                <Title style={ styles.titleText }>Title 3</Title>
                <Paragraph>
                    Aenean neque ante, tincidunt id tristique et, semper nec lectus. Nullam molestie pellentesque tortor ut tempus. Maecenas sed ipsum nec dolor varius interdum nec nec massa. Aliquam volutpat tempor fringilla. Praesent lobortis varius felis. Quisque auctor est mauris, in molestie sem rhoncus vel. Cras sollicitudin erat nisi, sed pulvinar dolor iaculis ut. Phasellus vestibulum rutrum iaculis. Phasellus auctor feugiat nisl, at varius urna congue iaculis. Etiam nisi dolor, sollicitudin consequat metus rhoncus, aliquet faucibus arcu.
                </Paragraph>
            </ScrollView>
            <View style={{flexDirection: "row", justifyContent: 'center'}}>
                <Button mode="contained"
                        onPress={() => {
                            navigation.goBack();
                        }}
                >
                    Back
                </Button>
                <Button mode="contained"
                        onPress={() => {
                            console.log("go")
                        }}
                >
                    Jump to
                </Button>
                <Button mode="contained"
                        disabled={true}
                >
                    <Text style={{fontSize: 10}}>Add to favorite (Coming soon)</Text>
                </Button>
            </View>
        </>
    );
}

const styles = {
    titleMain: {
        alignItems: 'center'
    },
    logo: {
        height: 170,
    },
    titleText: {
        marginTop: 50
    }
}

export default InformationScreen;
