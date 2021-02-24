import * as React from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Post from "../components/Post";
import { PostsI, TechnologyI } from "../types";
import Colors from "../constants/Colors";

export default function TechnologyScreen({ route, navigation }: any) {
  const tech: TechnologyI = route.params;

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: tech.name + ` (${tech.posts.length})`,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      {tech.posts.length === 0 && (
        <Text style={styles.title}>No posts yet...</Text>
      )}
      <FlatList
        data={tech.posts}
        renderItem={(item) => renderItem(item.item)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const renderItem = (item: PostsI) => (
  <TouchableWithoutFeedback onPress={(ev) => handlePress(item)}>
    <Post item={item} />
  </TouchableWithoutFeedback>
);

const handlePress = (item: PostsI) => {
  Linking.openURL(item.link);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: Colors.white,
  },
});
