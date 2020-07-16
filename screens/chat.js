import React from 'react';
import axios from 'axios';
import {
StyleSheet,
View,
SafeAreaView,
Text,
TextInput,
TouchableOpacity,
FlatList
} from 'react-native';
import Message from '../components/Message';



export default class ScreenHome extends React.Component {
    constructor() {
        super();

        this.lastMsgId = -1;
        this.room = global.actualRoom;
        this.state = {
            messages: new Array()
        }
    }
    componentDidMount() {
        this.fetchMessages();
    }
    componentDidUpdate() {
        this.fetchMessages();
    }
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    });
    onTyping(text) {
        this.typingMessage = text
    }
    send() {
        if (!this.typingMessage.match(/\S/gm)) return
    
        axios({
            method: 'post',
            url: 'https://chat.arthaud.dev/messages',
            timeout: 60 * 1 * 1000, // 1 minute
            data: {
                room: this.room,
                author: global.name,
                content: this.typingMessage
            }
        }).then(r=>{
            this.lastMsgId = r.data.runtimeId;
            this.textInput.clear();
        });
    }
    pushMessages(messages) {
        this.lastMsgId = messages[messages.length-1].id;
        this.setState((state)=>{
            return {messages: state.messages.concat(messages)};
        })
    }
    fetchMessages() {
        return new Promise(resolve=>{
            axios({
                method: 'post',
                url: 'https://chat.arthaud.dev/messages/fetch',
                timeout: 60 * 60 * 1000, // 1 heure
                data: {lastRuntimeId: this.lastMsgId, room: this.room}
            }).then(r=>{  
                this.pushMessages(r.data);
                resolve();
            });
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        const room = global.actualRoom;

        return (
            <SafeAreaView style={styles.home}>
                <View style={styles.main}>
                    <FlatList
                    numColumns="1"
                    contentContainerStyle={styles.scrollView}
                    keyExtractor={item => (item.id).toString()}
                    data={this.state.messages}
                    renderItem={({ item }) => <View style={{flexDirection:"column", justifyContent:'flex-start', alignItems:global.name==item.author?'flex-end':'flex-start'}}><Message id={item.id} author={item.author} content={item.content} time={item.time}/></View>}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                    onLayout={() => this.flatList.scrollToEnd({animated: true})}
                    />
                </View>
                <View style={styles.form}>
                    <TextInput
                    ref={input => { this.textInput = input }}
                    placeholder="Message..."
                    style={styles.message}
                    onChangeText={text => this.onTyping(text)}
                    />
                    <TouchableOpacity
                    style={styles.send}
                    onPress={()=>this.send()}
                    >
                    <Text style={{color: "#F6F6F6"}}>Envoyer</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    home: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#ffffff"
    },
    main: {
        flex: 1,
        flexDirection: 'column',
    },
    scrollView: {
        paddingTop: 30
    }, 
    title: {
        textAlign: 'center',
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    form: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal:10,
        paddingVertical:8,
    },
    message: { 
        flex: 9,
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
        marginRight:5
    },
    send: {
        flex: 3,
        alignItems: "center",
        backgroundColor: "#73C16E",
        padding: 10,
        borderRadius: 5
    },
});

