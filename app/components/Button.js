import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from "../config/colors";

function Button({ title, onPress, image, color = colors.white, icon, textStyle={}, style={} , iconColor=colors.white}) {
    return (
        <TouchableOpacity
            style={[style, styles.button, { backgroundColor: color , flexDirection: "row"}]}
            onPress={onPress}
        >
            {image && <Image style={styles.image} source={image} />}
            {icon && <MaterialCommunityIcons size={25} color={iconColor} name={icon} style={{marginRight: 5}}/>}
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        marginVertical: 5,
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: "bold",
    },
    image:{
        width: 25,
        height: 25,
        marginRight: 10
    }
});

export default Button;