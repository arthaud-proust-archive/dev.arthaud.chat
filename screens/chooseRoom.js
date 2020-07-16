import React from 'react';
import {
StyleSheet,
View,
SafeAreaView,
Text,
TextInput,
TouchableOpacity,
FlatList
} from 'react-native';
import AddRoom from '../components/AddRoom';


export default class ScreenHome extends React.Component {
    constructor() {
        super();
        //Setting up global variable
        global.rooms = [];

        global.storage.load({
            key: 'rooms',
            autoSync: true,
        }).then(ret => {
            global.rooms = ret;
            this.forceUpdate();
        }).catch(e=>{
            global.rooms = [];
        })

        global.globalRooms = [
            'informations',
            'escalade'
        ];
        global.actualRoom = undefined;
        this.room = '';
    }
    static navigationOptions = {
        title: 'Salons de discussion'
    };
    onChangeRoom(text) {
        this.room = text;
    }
    joinRoom(room) {
        if(!global.rooms.includes(room) && room!=="" && !global.globalRooms.includes(room)) {
            global.rooms.push(room);
            global.storage.save({
                key: 'rooms',
                data: global.rooms
            });
        }
        global.actualRoom = room;
        this.forceUpdate();
        this.props.navigation.navigate('Chat', {title: room});
    }
    leaveRoom(room) {
        let index = global.rooms.indexOf(room);
        if(index !== -1) {
            global.rooms.splice(index, 1);
            global.storage.save({
                key: 'rooms',
                data: global.rooms
            });
        }
        this.forceUpdate();
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.home}>
                <Text style={styles.infoText}>Connecté en tant que {global.name}</Text>
                <View style={styles.main}>
                    {global.rooms.length>=1 && 
                        <AddRoom this={this}></AddRoom>
                    }
                </View>
                <View style={styles.listRooms}>
                    <View style={styles.globalRooms}>
                        <Text style={styles.title}>Salons communs</Text>
                        <FlatList
                            numColumns="1"
                            contentContainerStyle={{paddingVertical:10}}
                            keyExtractor={item => global.globalRooms.indexOf(item).toString()}
                            data={global.globalRooms}
                            renderItem={({ item }) => <TouchableOpacity style={styles.roomLink} onPress={()=>this.joinRoom(item)}><Text>{item}</Text></TouchableOpacity>}
                        />
                    </View>
                    <View style={styles.rooms}>
                        <Text style={styles.title}>Salons déjà visités</Text>
                        {global.rooms.length<1 && 
                        <>
                        <Text style={{paddingHorizontal:20}}>Vous n'avez rejoint aucun salon</Text>
                        <AddRoom this={this}></AddRoom>
                        </>
                        }
                        <FlatList
                            numColumns="1"
                            contentContainerStyle={{paddingVertical:10}}
                            // contentContainerStyle={styles.scrollView}
                            keyExtractor={item => global.rooms.indexOf(item).toString()}
                            data={global.rooms}
                            renderItem={({ item }) => <TouchableOpacity style={styles.roomLink} onPress={()=>this.joinRoom(item)}><Text>{item}</Text><TouchableOpacity style={styles.leaveButton} onPress={()=>this.leaveRoom(item)}><Text style={{color: "#F6F6F6"}}>Quitter</Text></TouchableOpacity></TouchableOpacity>}
                        />
                    </View>
                </View>
                
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    infoText: {
        fontWeight: "100",
        alignSelf: "flex-end",
        padding:20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        paddingVertical:5
    },
    home: {
        flex: 1,
        flexDirection: 'column'
    },
    main: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: "center",
        alignContent: "center"
    },
    listRooms: {
        flex: 3
    },
    globalRooms: {
        marginVertical: 10,
        justifyContent: "center",
        alignContent: "center"
    }, 
    rooms: {
        justifyContent: "center",
        alignContent: "center"
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
    leaveButton: {
        alignItems: "center",
        backgroundColor: "#F57E7E",
        paddingVertical: 5,
        paddingHorizontal:10,
        borderRadius: 5
    },
    roomLink: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#EEE",
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 5
    },
    title: {
        paddingHorizontal: 20,
        fontSize: 20,
        fontWeight: "bold"
    }
});

