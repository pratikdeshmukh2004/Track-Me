import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from "expo-constants";


function DaeryHeader(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daery</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        width: "100%",
        backgroundColor: "#f7965f",
        padding: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: '#101010',
        textAlign: 'center'

    }
});

export default DaeryHeader