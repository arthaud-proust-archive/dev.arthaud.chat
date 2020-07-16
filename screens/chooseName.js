import React from 'react';
import {
StyleSheet,
View,
SafeAreaView,
Text,
TextInput,
TouchableOpacity
} from 'react-native';



export default class ScreenHome extends React.Component {
    constructor() {
        super();
        //Setting up global variable
        this.state = {
            name: ''
        }
        global.storage.load({
            key: 'name',
            autoSync: true,
        }).then(ret => {
            global.name = ret;
            this.setState({ name: ret })
            this.props.navigation.navigate('ChooseRoom');
        }).catch(e=>{
            global.name = '';
        })
    }
    static navigationOptions = {
        title: 'Choisir un nom'
    };
    onChangeName(text) {
        global.name = text;
    }
    saveName() {
        global.storage.save({
            key: 'name',
            data: global.name
        });
        this.props.navigation.navigate('ChooseRoom');
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.home}>
                <View style={styles.main}>
                    <Text style={styles.titleText}>Choisissez votre nom</Text>
                    <TextInput
                    value={this.state.name}
                    style={styles.input}
                    onChangeText={text => this.onChangeName(text)}
                    />
                    <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this.saveName()}
                    >
                    <Text>Enregistrer ce nom</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    home: {
        flex: 1,
        flexDirection: 'column'
    },
    main: {
        flex: 12,
        padding: 50,
        justifyContent: "center",
        alignContent: "center"
    },  
    titleText: {
        fontSize: 18,
        fontWeight: "bold",
        paddingVertical:5
    },
    input: { 
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10 
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDD",
        padding: 10,
        marginTop: 10,
        borderRadius: 5
    },
    title: {
        textAlign: 'center',
    },
});

