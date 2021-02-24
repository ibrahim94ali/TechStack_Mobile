import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PostsI } from "../types";
import Colors from "../constants/Colors";

export default function Post(props: { item: PostsI }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {props.item.title}
      </Text>
      <Text style={styles.posts}>
        By: <Text style={styles.metaData}>{props.item.owner} </Text>
      </Text>
      <Text style={styles.posts}>
        Date:{" "}
        <Text style={styles.metaData}>
          {new Date(+props.item.date).toLocaleDateString()}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.purple,
  },
  posts: {
    fontSize: 14,
    fontStyle: "italic",
    color: Colors.purple,
  },
  metaData: {
    fontWeight: "bold",
  },
});
