import * as React from "react";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Technology from "../components/Technology";
import { TechnologyI } from "../types";
import { useTechsStore } from "../hooks/TechsContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TECHS } from "../graphQL/Queries";
import { useObserver } from "mobx-react";
import { ADD_TECH } from "../graphQL/Mutations";

export default function HomeScreen({ navigation }: any) {
  const techsStore = useTechsStore();
  //getting techs
  const { error, loading, data } = useQuery(GET_TECHS);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (data) {
      techsStore.setTechs(data.technologies);
    }
  }, [data]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle:
        "Technologies" +
        (techsStore.technologies?.length
          ? ` (${techsStore.technologies.length})`
          : ""),
    });
  }, [techsStore.technologies]);

  return useObserver(() => (
    <View style={styles.container}>
      <View
        style={[styles.button, { alignSelf: "center", marginVertical: 30 }]}
      >
        <Button title="Add tech" onPress={() => setModalVisible(true)} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <AddTechModal onCloseModal={setModalVisible} />
      </Modal>
      <FlatList
        data={techsStore.technologies}
        renderItem={(item) => renderItem(item.item, navigation)}
        keyExtractor={(item) => item.id}
      />
    </View>
  ));
}

const AddTechModal = ({ onCloseModal }: any) => {
  const [name, onNameChange] = React.useState("");

  const techsStore = useTechsStore();

  const [addTech, { data }] = useMutation(ADD_TECH);

  useEffect(() => {
    if (data) {
      techsStore.addTech({
        ...data.addTechnology,
        posts: [],
      });
      onCloseModal(false);
    }
  }, [data]);

  const handleAddTech = () => {
    addTech({
      variables: {
        name: name,
      },
    });
  };
  return (
    <View style={styles.modal}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add New Technology</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#000"
          onChangeText={(text) => onNameChange(text)}
          value={name}
          autoFocus
        />
        <View style={styles.button}>
          <Button title="Save" disabled={!name} onPress={handleAddTech} />
        </View>
      </View>
    </View>
  );
};

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
    color: "#fff",
  },
  input: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    color: "#000",
    backgroundColor: "#fff",
    padding: 5,
  },
  button: {
    marginTop: 30,
    width: 200,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(52, 52, 52, 0.7)",
  },
  card: {
    backgroundColor: "#fff",
    paddingBottom: 90,
    paddingTop: 30,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    color: "#000",
    marginBottom: 50,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
