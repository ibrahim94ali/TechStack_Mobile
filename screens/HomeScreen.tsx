import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, TextInput, View, Text } from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Technology from "../components/Technology";
import { TechnologyI } from "../types";
import { useTechsStore } from "../hooks/TechsContext";
import { useMutation } from "@apollo/client";
import { observer } from "mobx-react";
import { ADD_TECH, DELETE_TECH, EDIT_TECH } from "../graphQL/Mutations";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { autorun } from "mobx";

export function HomeScreen({ navigation }: any) {
  const { showActionSheetWithOptions } = useActionSheet();
  const techsStore = useTechsStore();

  const [deleteTechnology, { data: deletedTech }] = useMutation(DELETE_TECH);

  const [modalVisible, setModalVisible] = useState(false);
  const [isEditingTech, setIsEditingTech] = useState<TechnologyI>();

  useEffect(() => {
    if (deletedTech) {
      techsStore.deleteTech(deletedTech.deleteTechnology.id);
    }
  }, [deletedTech]);

  useEffect(() =>
    autorun(() => {
      navigation.setOptions({
        headerTitle:
          "Technologies" +
          (techsStore.technologies?.length
            ? ` (${techsStore.technologies.length})`
            : ""),
      });
    })
  );

  const renderItem = (item: TechnologyI, index: number) => (
    <TouchableWithoutFeedback
      onPress={() => handlePress(index)}
      onLongPress={() => showActionSheet(item)}
    >
      <Technology item={item} />
    </TouchableWithoutFeedback>
  );

  const handlePress = (index: number) => {
    techsStore.selectTechnology(index);
    navigation.navigate("Technology");
  };

  const handleActionSheetActions = (index: number, item: TechnologyI) => {
    switch (index) {
      case 0:
        setIsEditingTech(item);
        setModalVisible(true);
        break;
      case 1:
        deleteTechnology({
          variables: {
            id: item.id,
          },
        });
        break;
      default:
        break;
    }
  };

  const showActionSheet = (item: TechnologyI) => {
    showActionSheetWithOptions(
      {
        title: item.name,
        options: ["Rename", "Delete"],
        cancelButtonIndex: -1,
      },
      (index) => handleActionSheetActions(index, item)
    );
  };

  return (
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
          setModalVisible(false);
          setIsEditingTech(undefined);
        }}
      >
        <AddEditTechModal
          onCloseModal={setModalVisible}
          isEditingTech={isEditingTech}
        />
      </Modal>
      <FlatList
        data={techsStore.technologies}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default connectActionSheet(observer(HomeScreen));

const AddEditTechModal = ({ onCloseModal, isEditingTech }: any) => {
  const [name, onNameChange] = useState(
    isEditingTech ? isEditingTech.name : ""
  );

  const techsStore = useTechsStore();

  const [addTechnology, { data: newTech }] = useMutation(ADD_TECH);
  const [editTechnology, { data: editedTech }] = useMutation(EDIT_TECH);

  useEffect(() => {
    if (newTech) {
      techsStore.addTech({
        ...newTech.addTechnology,
        posts: [],
      });
      onCloseModal(false);
    }
    if (editedTech) {
      techsStore.editTech(editedTech.updateTechnology.id, name);
      onCloseModal(false);
    }
  }, [newTech, editedTech]);

  const handleAddTech = () => {
    addTechnology({
      variables: {
        name: name,
      },
    });
  };
  const handleEditTech = () => {
    editTechnology({
      variables: {
        name: name,
        id: isEditingTech.id,
      },
    });
  };
  return (
    <View style={styles.modal}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {isEditingTech ? isEditingTech.name : "Add New Technology"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#000"
          onChangeText={(text) => onNameChange(text)}
          value={name}
          autoFocus
        />
        <View style={styles.button}>
          <Button
            title="Save"
            disabled={!name}
            onPress={isEditingTech ? handleEditTech : handleAddTech}
          />
        </View>
      </View>
    </View>
  );
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
