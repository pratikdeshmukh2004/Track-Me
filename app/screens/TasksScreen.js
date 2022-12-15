import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text, TouchableOpacity, Animated, TouchableHighlight, RefreshControl } from 'react-native';
import Header from '../components/Header';
import colors from '../config/colors';
import Checkbox from 'expo-checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import taskCollection from '../database/taskCollection';
import NewTask from '../components/NewTask';
import TaskAction from '../components/TaskAction';
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";
import AnimatedLottieView from "lottie-react-native";


function TasksScreen({ navigation }) {

  const [task, setTask] = useState("hello")
  const [tasks, setTasks] = useState()
  const [newModal, setNewModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [update, setUpdate] = useState(false)
  const [setingCheck, setSettingCheck] = useState(false)

  const refreshTasks = async () => {
    setRefreshing(true)
    const tlist = await taskCollection.listTasks()
    setTasks(tlist)
    setRefreshing(false)
    setSettingCheck(false)
  }

  useEffect(() => {
    refreshTasks()
  }, [])

  const setChecked = async (item) => {
    setSettingCheck(item.id)
    await taskCollection.updateTask(item, { completed: !item.completed })
    refreshTasks()
  }

  const deleteTask = async (id) => {
    setDeleting(true)
    await taskCollection.deleteTask(id)
    refreshTasks()
    setDeleting(false)
  }

  const editTask = (task) => {
    setNewModal(true)
    setTask(task.task)
    setUpdate(task)
  }

  let today = new Date().toDateString()
  let yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday = yesterday.toDateString()
  const dates = [...new Set(tasks?.map((task) => task.date.toDate().toDateString()))]

  return (
    <>
      {
        !newModal && <TouchableOpacity onPress={() => { setNewModal(true); setTask(""); setUpdate(false) }} style={styles.plus}>
          <MaterialCommunityIcons color={colors.white} name='plus' size={25} />
        </TouchableOpacity>
      }
      <ScrollView refreshControl={
        <RefreshControl progressBackgroundColor={"#303030"} colors={[colors.danger, colors.sky, colors.yellow]} refreshing={refreshing} onRefresh={refreshTasks} />
      } stickyHeaderIndices={[0]} style={styles.container}>
        <Header icon={"account-off"} title="Tasks" color={colors.danger} />
        <GestureHandlerRootView>
          {dates?.map((date) => (
            <View key={date}>
              <Text style={styles.dayText}>{date == today ? "Today's Tasks" : date == yesterday ? "Yesterday's Tasks" : date}</Text>
              {tasks?.map((item) => {
                if (item.date.toDate().toDateString() != date) {
                  return;
                }
                return <Swipeable key={item.id} renderLeftActions={() => <TaskAction style={{ marginLeft: 20 }} color={colors.sky} icon={"pencil"} play={deleting} onPress={() => editTask(item)} />} renderRightActions={() => <TaskAction icon={"trash-can"} style={{ marginRight: 20 }} play={deleting} onPress={() => deleteTask(item.id)} />}>
                  <View key={item.id} style={styles.box}>
                    <View style={{ width: 20, height: 20 }}>
                      {setingCheck == item.id ? <AnimatedLottieView autoPlay loop source={require("../assets/animations/logo_loader.json")} />
                        : <Checkbox
                          style={styles.checkbox}
                          value={item.completed}
                          onValueChange={() => setChecked(item)}
                          color={colors.danger}
                        />}
                    </View>
                    <Text style={[styles.boxText, { textDecorationLine: item.completed ? "line-through" : "none", color: item.completed ? "#808080" : colors.white }]}>
                      {item.task}</Text>
                  </View>
                </Swipeable>
              })}
            </View>
          ))}
        </GestureHandlerRootView>
      </ScrollView>
      <NewTask task={task} update={update} setTask={setTask} setModal={setNewModal} refresh={refreshTasks} open={newModal} />
    </>
  )
}

const styles = StyleSheet.create({
  dateText: {
    marginTop: 10,
    marginRight: 'auto',
    // marginLeft: 'auto',
    padding: 2,
    color: "#909090",
    fontSize: 12,
    paddingHorizontal: 7,
    marginBottom: 7,
  },
  plus: {
    position: "absolute",
    backgroundColor: colors.danger,
    padding: 15,
    zIndex: 1,
    bottom: 20,
    right: 20,
    borderRadius: 50,
    elevation: 1,
  },
  dayText: {
    textTransform: 'uppercase',
    color: '#909090',
    marginLeft: 20,
    marginVertical: 20,
    fontWeight: '600',
    fontSize: 12
  },
  container: {
    flex: 1,
    paddingTop: 0,
    shadowOffset: {
      width: 0,
      height: 3
    },
    backgroundColor: '#101010',
  },
  welcomeText: {
    color: "#e5e5e5",
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 23,
    fontWeight: 'bold'
  },
  box: {
    padding: 20,
    marginVertical: 5,
    backgroundColor: "#202020",
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 1,
    flexDirection: 'row',
  },
  boxText: {
    color: "#e5e5e5",
    marginLeft: 15,
  },
  checkbox: {
    borderRadius: 20,
    width: 23,
    height: 23,
    alignSelf: 'center'
  }
});

export default TasksScreen