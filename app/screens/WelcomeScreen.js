import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View, Image, Text, Dimensions, TextInput, Alert, TouchableOpacity, TouchableHighlight } from "react-native";
import AuthContext from "../auth/authContext";
import Button from "../components/Button";
import colors from "../config/colors";
import useAuth from "../hooks/useAuth";


function WelcomeScreen({ navigation, setLoading }) {
    
    const auth = useAuth()
    const {user, setUser} = useContext(AuthContext)

    const [loginForm, setLoginForm] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const clearForm = () => {
        setEmail("")
        setError("")
        setPassword("")
        setUser(auth.user)
    }

    const loginHandler = async() => {
        setLoading(true)
        const user = await auth.login(email, password)
        if (user.constructor == String){
            setError(user)
        }
        setLoading(false)
    }

    const registerHandler = async() => {
        setLoading(true)
        const user = await auth.register(email, password)
        if (user.constructor == String){
            setError(user)
        }
        setLoading(false)
    }
    return (
        <ImageBackground
            blurRadius={10}
            style={styles.background}
            source={require("../assets/background.png")}
        >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/logo.png")} />
                <Text onPress={() => Alert.prompt("Hi", "hello")} style={styles.tagline}>Track Me {loginForm ? "Login" : "Register"}</Text>
                <Text style={styles.error}>{error}</Text>
                <TextInput value={email} onChangeText={(text) => setEmail(text)} autoCapitalize="none" textContentType="emailAddress" style={styles.input} placeholder="Enter your email" />
                <TextInput value={password} secureTextEntry onChangeText={(text) => setPassword(text)} textContentType="password" style={styles.input} placeholder="Enter your password" />
                {loginForm && <Text style={styles.forget}>Recover Password</Text>}
                <Button onPress={() => loginForm ? loginHandler() : registerHandler()} textStyle={styles.buttonText} color={colors.sky} style={styles.button} title={loginForm ? "Login" : "Register"} />
                <TouchableOpacity  onPress={() => { setLoginForm(!loginForm); clearForm() }}><Text style={styles.register_text}>{loginForm ? "Not a member? Register" : "Already have an account? Log In"}</Text></TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    error:{
        color: colors.white,
        fontSize: 12,
        width: "90%",
        textAlign: "center"

    },
    register_text: {
        marginTop: 20,
        color: "#303030",
        fontWeight: '600',
        fontSize: 12,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 0.3,
        borderColor: "#404040"
    },
    forget: {
        textAlign: "right",
        marginTop: 10,
        fontSize: 12,
        fontWeight: "500",
        marginLeft: 'auto',
        color: "#404040"
    },
    input: {
        width: 250,
        borderRadius: 7,
        fontSize: 15,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 10,
        color: "#404040",
        fontWeight: "500",
        borderWidth: 0.5,
        borderColor: "#707070"
    },
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: "absolute",
        top: "17%",
        alignItems: "center",
    },
    tagline: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#404040",
        marginTop: 30,
        paddingVertical: 20,
    },
    button: {
        elevation: 1,
        marginTop: 20,
        width: 250
    },
    buttonText: {
        color: "#404040",
        fontSize: 17,
        fontWeight: '900'
    },
    gif: {
        width: 350,
        height: 300
    }
});

export default WelcomeScreen;