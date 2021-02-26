import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import TechnologyScreen from "../screens/TechnologyScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import NewTechModal from "../screens/NewTechModal";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.black,
    text: Colors.white,
    primary: Colors.purple,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={MyTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: MyTheme.colors.text,
        headerStyle: {
          backgroundColor: MyTheme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        // options={{
        //   headerRight: () => (
        //     <Ionicons
        //       size={30}
        //       style={{ color: Colors.white, marginRight: 15 }}
        //       name="add"
        //       onPress={handleAddTech}
        //     />
        //   ),
        // }}
      />
      <Stack.Screen name="NewTech" component={NewTechModal} />
      <Stack.Screen
        name="Technology"
        component={TechnologyScreen}
        // options={{
        //   headerRight: () => (
        //     <Ionicons
        //       size={30}
        //       style={{ color: Colors.white, marginRight: 15 }}
        //       name="add"
        //       onPress={() => handleAddTech}
        //     />
        //   ),
        // }}
      />
    </Stack.Navigator>
  );
}
