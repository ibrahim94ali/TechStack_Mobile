import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import TechnologyScreen from "../screens/TechnologyScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import Colors from "../constants/Colors";

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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Technology" component={TechnologyScreen} />
    </Stack.Navigator>
  );
}
