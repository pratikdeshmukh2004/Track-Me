import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

function Loader({ visible = false }) {
    if (!visible) return null;
    return (
        <View style={styles.overlay}>
            <LottieView autoPlay loop source={require("../assets/animations/logo_loader.json")} />
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 1,
    }

})

export default Loader