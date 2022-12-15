import React, { useContext } from 'react';
import { View, StyleSheet, Image, Text, FlatList } from 'react-native';
import AuthContext from '../auth/authContext';
import Button from '../components/Button';
import colors from '../config/colors';
function AccountScreen(props) {
    const { user } = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <Image source={{ uri: user.picture }} style={styles.image} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Button title={"Logout"} color={colors.danger} icon="logout" style={{marginTop: 20, width: "70%", marginTop: "auto", marginBottom: 20}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#101010", alignItems: 'center' },
    image: { width: 150, height: 150, borderRadius: 100, marginTop: 50 },
    name: { color: 'white', marginTop: 10, fontSize: 25, fontWeight: '900' },
    email: { color: '#909090', marginTop: 10, fontSize: 15 }
});

export default AccountScreen;