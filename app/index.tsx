import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MovieScreen from "@/screens/MovieScreen";
import HomeScreen from "@/screens/HomeScreen";
import PersonScreen from "@/screens/PersonScreen";
import SearchScreen from "@/screens/SearchScreen";

const Tab = createBottomTabNavigator();

export default function App({}) {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen name="HomeStack" component={StackScreen} />
    </Tab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function StackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: "#272727",
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Movie"
        component={MovieScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Person"
        component={PersonScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
