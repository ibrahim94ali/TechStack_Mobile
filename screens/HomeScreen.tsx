import * as React from "react";
import { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Technology from "../components/Technology";
import { TechnologyI } from "../types";
import { TechsContext } from "../hooks/TechsContext";

export default function HomeScreen({ navigation }: any) {
  const techs = useContext(TechsContext);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Technologies" + (techs?.length ? ` (${techs.length})` : ""),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={techs}
        renderItem={(item) => renderItem(item.item, navigation)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const renderItem = (item: TechnologyI, navigation: any) => (
  <TouchableWithoutFeedback onPress={(ev) => handlePress(item, navigation)}>
    <Technology item={item} />
  </TouchableWithoutFeedback>
);

const handlePress = (item: TechnologyI, navigation: any) => {
  navigation.navigate("Technology", item);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 20,
  },
});
