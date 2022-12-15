import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from "../config/colors";
import Constants from "expo-constants";
import { StatusBar } from 'expo-status-bar';
import AuthContext from '../auth/authContext';
import useAuth from '../hooks/useAuth';


function Header({ title, icon, color = colors.yellow, navigation }) {

    const auth = useAuth()


    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <View style={styles.header}>
                <MaterialCommunityIcons onPress={() => auth.logOut()} name={icon} size={25} color={color} />
                <Text style={styles.headerTitle}>{title}</Text>
                <TouchableOpacity onPress={()=>navigation.push("Account")}>
                    {/* <Image style={[styles.image, { borderColor: color }]} source={{ uri: user.picture }} /> */}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: 'row',
        width: "100%",
        backgroundColor: "#101010",
        paddingTop: Constants.statusBarHeight + 10,
        paddingHorizontal: "5%",
        paddingBottom: 10,
        alignItems: 'center'
    },
    headerTitle: {
        color: "#e5e5e5",
        fontSize: 17,
        marginLeft: 6,
        fontWeight: '500',
        marginLeft: 'auto',
        marginRight: "auto"
    },
    image: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 100,
        width: 30,
        height: 30,
        borderWidth: 1,
    },
})

export default Header;