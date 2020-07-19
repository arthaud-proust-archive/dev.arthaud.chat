import React from 'react';
import {
StyleSheet,
View,
SafeAreaView,
Text,
TextInput,
TouchableOpacity,
Image
} from 'react-native';



export default class ScreenChooseName extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false
        }
        global.storage.load({
            key: 'name',
            autoSync: true,
        }).then(ret => {
            global.name = ret;
            this.textInput.value = ret;
            this.props.navigation.navigate('ChooseRoom');
        }).catch(e=>{
            global.name = '';
        })
    }
    static navigationOptions = {
        headerShown: false,
    };
    onChangeName(text) {
        global.name = text;
    }
    saveName() {
        if (!name.match(/\S/gm))  {
            this.setState({error: 'Le nom ne peut pas être vide'});
            return
        }
        if (name.length > 20) {
            this.setState({error: '20 caractères maximum'});
            return
        }
        this.setState({error: false});
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
                    <Image
                    style={styles.logo}
                    source={require('../assets/icon.png')}
                    />
                    <View style={{flex: 1}}>
                        <Text style={styles.titleText}>Choisissez votre pseudo</Text>
                        <TextInput
                        ref={this.textInput}
                        style={styles.input}
                        onChangeText={text => this.onChangeName(text)}
                        onSubmitEditing={()=>this.saveName()}
                        />
                        {this.state.error && <Text style={{color:"#F57E7E"}}>{this.state.error}</Text>}
                        <TouchableOpacity
                        style={styles.button}
                        onPress={()=>this.saveName()}
                        >
                        <Text>Continuer</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Conditions')} style={{paddingVertical:20}}>
                            <Text style={styles.conditions}>En continuant, vous acceptez les <Text style={{textDecorationStyle:'solid', textDecorationColor: '#DDD', textDecorationLine: "underline"}}>conditions d'utilisation</Text></Text>
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
        flex: 1,
        padding: 50,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },  
    logo: {
        flex:1,
        width: 100,
        resizeMode: 'contain',
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold",
        paddingVertical:5
    },
    input: { 
        height: 40,
        width: 250,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10 
    },
    button: {
        width: 250,
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        padding: 10,
        marginTop: 10,
        borderRadius: 5
    },
    title: {
        textAlign: 'center',
    },
    conditions: {
        fontSize: 10
    }
});

