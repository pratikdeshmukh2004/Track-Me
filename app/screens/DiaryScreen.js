import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView, FlatList, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import colors from '../config/colors';
import useAuth from '../hooks/useAuth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthContext from '../auth/authContext';
import Header from '../components/Header';
import Button from '../components/Button';
import diearyCollection from "../database/diaryCollection"


function DaeryScreen({ navigation }) {
    const [activeEdit, setActiveEdit] = useState("")
    const [activeEditContent, setActiveEditContent] = useState("")
    const [content, setcontent] = useState([])
    const [active, setActive] = useState("")
    const [refreshing, setRefreshing] = useState(false)


    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const restoreContent = async () => {
        setRefreshing(true)
        const times = [
            "06:00 - 09:00",
            "09:00 - 12:00",
            "12:00 - 15:00",
            "15:00 - 17:30",
            "17:30 - 19:00",
            "19:00 - 21:00",
            "21:00 - 00:00",
            "00:00 - 06:00"
        ]
        var content_list = {}
        var content_data = await diearyCollection.listContents()
        var hour = new Date().getHours()
        for (var c of times) {
            content_list[c] = c in content_data ? content_data[c].content : ""
            if (hour == c.slice(0, 2)) {
                setActive(c)
            }
        }
        setcontent(content_list)
        setRefreshing(false)
    }
    useEffect(() => {
        restoreContent()
    }, [])

    const addOrUpdate = async(id) => {
        if (activeEditContent.length == 0){
            return ;
        }
        setActiveEdit("")
        await diearyCollection.createUpdateContent(activeEdit, activeEditContent, content)
        await restoreContent()

    }
    return (
        <>
            <ScrollView refreshControl={
                <RefreshControl progressBackgroundColor={"#303030"} colors={[colors.danger, colors.sky, colors.yellow]} refreshing={refreshing} onRefresh={restoreContent} />
            } stickyHeaderIndices={[0]} style={styles.container}>
                <Header icon={"account-off"} navigation={navigation} title="Diary" />
                {Object.keys(content)?.map((item, index) => (
                    <TouchableOpacity onPress={() => { setActiveEdit(item); setActiveEditContent(content[item]) }} key={index}>
                        <View style={[styles.view, active == item ? { borderColor: colors.yellow } : {}]}>
                            <Text style={{ color: content[item].length ? colors.white : "#505050" }}>{content[item].length ? content[item] : "Start writing..."}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <Text style={styles.slot}>{item}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {activeEdit &&
                <View style={styles.editable}>
                    <TextInput onChangeText={(text) => {
                        setActiveEditContent(text)
                    }
                    } cursorColor={colors.yellow} autoFocus multiline placeholderTextColor={"#505050"} placeholder='Start writing...' style={{ color: colors.white, fontSize: 15 }}>{activeEditContent}</TextInput>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Text style={{ color: colors.yellow, fontSize: 10, marginTop: 5, fontWeight: '400' }}>{activeEditContent.length} Letters | {activeEditContent.split(' ').length} Words</Text>
                        <Text style={styles.slot}>{activeEdit}</Text>
                    </View>
                    <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                        <Button onPress={() => setActiveEdit("")} textStyle={{ color: "#707070" }} icon={"close"} iconColor="#707070" color={"#202020"} style={{ borderRadius: 10 }} title='Cancel' />
                        <Button onPress={() => setActiveEditContent("")} textStyle={{ color: "#404040" }} color={"#202020"} style={{ borderRadius: 10, marginLeft: 'auto' }} title='Clear' />
                        <Button onPress={addOrUpdate} textStyle={{ color: colors.yellow }} iconColor={colors.yellow} icon="check" style={{ marginLeft: 'auto', borderRadius: 10 }} color={"#202020"} title='Save' />

                    </View>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        shadowOffset: {
            width: 0,
            height: 3
        },
        backgroundColor: '#101010',
    },
    view: {
        marginHorizontal: "5%",
        backgroundColor: "#202020",
        borderRadius: 10,
        elevation: 1,
        padding: 15,
        paddingBottom: 10,
        marginVertical: 10
    },
    slot: {
        color: colors.yellow,
        fontSize: 12,
        marginLeft: 'auto',
        marginTop: 5,
        fontWeight: '500',
        borderRadius: 10,
        padding: 2,
        paddingHorizontal: 5,
        borderWidth: 0.1,
        borderColor: colors.yellow,
    },
    editable: {
        backgroundColor: "#202020",
        elevation: 1,
        borderColor: "#202030",
        borderWidth: 1,
        padding: 15,
        paddingBottom: 10,
        position: 'absolute',
        bottom: 0,
        width: "100%",
    },
});

export default DaeryScreen