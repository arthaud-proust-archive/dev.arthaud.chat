import React from 'react';
import {
StyleSheet,
View,
Text,
TextInput,
TouchableOpacity,
} from 'react-native';

export default function(props) {
    return(
        <View style={styles.main}>
            <Text style={styles.titleText}>Rejoindre un salon</Text>
            <View style={styles.container}>
                <TextInput
                placeholder="Code du salon"
                style={styles.input}
                onChangeText={text => props.this.onChangeRoom(text)}
                onSubmitEditing={()=>props.this.joinRoom(props.this.room)}
                />
                <TouchableOpacity
                style={styles.button}
                onPress={()=>props.this.joinRoom(props.this.room)}
                >
                <Text style={{color: "#FFF"}}>Rejoindre ou créer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 20,
        justifyContent: "center",
        alignContent: "center"
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold",
        paddingVertical:5
    },
    container: {
        flexDirection: "row",
        alignContent: "center"
    },
    input: { 
        height: 40,
        width: 150,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10 
    },
    button: {
        height: 40,
        alignItems: "center",
        backgroundColor: "#73C16E",
        padding: 10,
        marginLeft: 5,
        borderRadius: 5
    }
});

