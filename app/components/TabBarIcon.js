import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';

function TabBarIcon({ color, size, icon, name }) {
    return (
        <View style={[styles.button, name ? {
            backgroundColor: "#202020",
            borderWidth: 0.5,
            borderColor: color
        } : {}]}>
            <MaterialCommunityIcons
                name={icon}
                color={color}
                size={size}
            />
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center'
    },
    text: {
        color: colors.white,
        marginLeft: 7,
        fontWeight: '600',
    }
})

export default TabBarIcon;