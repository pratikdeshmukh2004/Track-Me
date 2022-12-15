import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import AuthContext from "./app/auth/authContext"
import TasksScreen from './app/screens/TasksScreen';
import MoneyScreen from './app/screens/MoneyScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from './app/config/colors';
import TabBarIcon from "./app/components/TabBarIcon"
import DiaryNavigator from './app/navigation/DiaryNavigator';
import useAuth from './app/hooks/useAuth';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from './app/components/Loader';
import * as LocalAuthentication from 'expo-local-authentication';

const Tab = createBottomTabNavigator();

export default function App() {


  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)

  const auth = useAuth()

  const setCurrentUser = async () => {
    LocalAuthentication.authenticateAsync().then((data)=>{
      if (data.success){

        onAuthStateChanged(auth.auth, (currentUser) => {
          setUser(currentUser)
          setTimeout(() => {
    
            SplashScreen.hideAsync();
          }, 1000);
        })
      }else{
        setCurrentUser()
      }
    })
  }

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setCurrentUser()
  }, [])

  return (
    <View style={{ flex: 1, zIndex: 0 }}>
      <Loader visible={loading} />
      <StatusBar style='dark' />
      <AuthContext.Provider value={{ user, setUser }}>
        {!user ? <WelcomeScreen setLoading={setLoading} /> :
          <>
            <NavigationContainer>
              <Tab.Navigator
                initialRouteName='Tasks'
                screenOptions={{
                  headerShown: false,
                  tabBarStyle: { paddingBottom: 5, height: 60, backgroundColor: "#101010", borderTopColor: "#707070" },
                  tabBarLabelStyle: { fontWeight: "bold", fontSize: 11 },
                  tabBarShowLabel: false,
                  tabBarHideOnKeyboard: true,
                }}>
                <Tab.Screen options={{ tabBarIcon: ({ size, focused }) => <TabBarIcon name={focused ? "Tasks" : ""} color={colors.danger} size={size} icon={"checkbox-marked-circle-plus-outline"} /> }} name="Tasks" component={TasksScreen} />
                <Tab.Screen options={{
                  tabBarIcon: ({ size, focused }) => (
                    <TabBarIcon color={colors.yellow} name={focused ? "Diary" : ""} size={size} icon={"book"} />
                  ),
                }} name="Dairy" component={DiaryNavigator} />
                <Tab.Screen options={{ tabBarIcon: ({ size, focused }) => <TabBarIcon name={focused ? "Money" : ""} color={colors.sky} size={size} icon={"bank-outline"} /> }} name="Money" component={MoneyScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </>
        }
      </AuthContext.Provider>
    </View>
  );
}
