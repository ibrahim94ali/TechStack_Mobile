import { useMutation } from "@apollo/client";
import { useObserver } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { ADD_TECH } from "../graphQL/Mutations";
import { useTechsStore } from "../hooks/TechsContext";

export default function NewTechModal({ route, navigation }: any) {
  const [name, onNameChange] = React.useState("");

  const techsStore = useTechsStore();

  const [addTech, { data }] = useMutation(ADD_TECH);

  useEffect(() => {
    if (data) {
      techsStore.addTech({
        ...data.addTechnology,
        posts: [],
      });
      navigation.goBack();
    }
  }, [data]);

  const handleAddTech = () => {
    addTech({
      variables: {
        name: name,
      },
    });
  };

  return useObserver(() => (
    <View style={styles.container}>
      <Text style={styles.title}>new tech</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#000"
        onChangeText={(text) => onNameChange(text)}
        value={name}
      />
      <Button title="Save" disabled={!name} onPress={handleAddTech} />
    </View>
  ));
}

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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    color: "#000",
    backgroundColor: "#fff",
  },
});
