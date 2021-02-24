import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TechnologyI } from "../types";
import Colors from "../constants/Colors";

export default function Technology(props: { item: TechnologyI }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>
        {props.item.name}
      </Text>
      <Text style={styles.posts}>#{props.item.posts.length} Posts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginBottom: 20,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    alignSelf: "center",
    color: Colors.purple,
  },
  posts: {
    fontSize: 14,
    alignSelf: "center",
    fontStyle: "italic",
    color: Colors.purple,
  },
});
