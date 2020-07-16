import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default function Message(props) {
    let x = global.name==props.author?me:other;
return (
    <View style={x.card}>
        <View style={x.header}>
            <Text style={x.author}>{props.author}</Text>
            <Text style={x.time}>{props.time}</Text>
        </View>
        <View style={x.content}>
            <Text style={x.text}>{props.content}</Text>
        </View>
    </View>
);
}

const other = StyleSheet.create({
    card: {
        flex: 0.5,
        minHeight: 0,
        backgroundColor: '#FAFAFA',
        justifyContent: 'flex-start',
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 12,
        paddingHorizontal: 20, 
        borderRadius: 20
    },
    header: {
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    title: {
        textAlign: 'left',
        color: "#aee",
        fontSize: 16,
        fontWeight: 'bold'
    },
    time: {
        color: '#ddd',
        fontSize: 10,
        marginLeft: 5,
        lineHeight: 16
    },
    text: {
        color: '#000000',
        fontSize: 16,
        fontWeight: "100"
    }
});

const me = StyleSheet.create({
    card: {
        flex: 0.5,
        flexDirection: 'column',
        minHeight: 0,
        backgroundColor: '#F6F6F6',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 12,
        paddingHorizontal: 20, 
        borderRadius: 20
    },
    header: {
        paddingBottom: 5,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        textAlign: 'left',
        color: "#aee",
        fontSize: 16,
        fontWeight: 'bold'
    },
    time: {
        color: '#ddd',
        fontSize: 10,
        marginRight: 5,
        lineHeight: 16
    },
    content: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    // text: {
    //     color: '#000000',
    //     fontSize: 16,
    //     fontWeight: "100"
    // }
});
