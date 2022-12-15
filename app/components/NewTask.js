import React, { useEffect, useState } from "react";
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from "../components/Button";
import DateTimePicker from '@react-native-community/datetimepicker';
import taskCollection from '../database/taskCollection';


function NewTask({ open = false, setModal, refresh, task, setTask, update }) {
    const createNewTask = () => {
        if (task.length == 0) {
            return;
        }
        if (update) {
            taskCollection.updateTask(update, { task: task })
        } else {

            taskCollection.createTask(task)
        }
        setModal(false)
        setTask("")
        refresh()
    }
    if (!open) return;

    return (
        // <Modal transparent={true} animationType="slide" visible={open}>
        <View style={styles.editContainer}>
            <TouchableOpacity onPress={() => setModal(false)} style={styles.cross}>
                <MaterialCommunityIcons color={colors.white} name='close' size={25} />
            </TouchableOpacity>
            <Text style={[styles.headText, {color: update?colors.sky:colors.danger}]}>{update ? "Update a task" : "Create a task"}</Text>
            <TextInput onChangeText={(t) => setTask(t)} value={task} multiline autoFocus style={styles.input} placeholderTextColor={colors.white} placeholder="Start typing..." />
            {/* <DateTimePicker value={new Date()} mode="date"/> */}
            <Button onPress={createNewTask} color={update ? colors.sky : colors.danger} style={styles.button} textStyle={styles.buttonText} title={update ? "Update" : "Done"} />
        </View>
        // </Modal>
    );
}


const styles = StyleSheet.create({
    date: {
        borderWidth: 0.5,
        borderColor: colors.danger,
        width: 70,
        marginTop: 20,
        borderRadius: 10,
        padding: 5,
        backgroundColor: "#303030",
        paddingHorizontal: 7,
    },
    dateText: {
        fontWeight: "900",
        textAlign: 'center',
        color: colors.danger,

    },
    button: {
        marginTop: 20,
        elevation: 1
    },
    headText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 17
    },
    cross: {
        position: 'absolute',
        top: -35,
        right: 15
    },
    editContainer: {
        backgroundColor: "#202020",
        width: "100%",
        paddingHorizontal: 20,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        position: 'absolute',
        bottom: 0,
        paddingBottom: 30
    },
    input: {
        color: colors.white,
        marginTop: 10,
        minHeight: 50,
        maxHeight: 100

    }
})

export default NewTask;