import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Button,
  Modal,
  TextInput,
} from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Post from "../components/Post";
import { PostsI } from "../types";
import Colors from "../constants/Colors";
import {
  connectActionSheet,
  useActionSheet,
} from "@expo/react-native-action-sheet";
import { useTechsStore } from "../hooks/TechsContext";
import { useMutation } from "@apollo/client";
import { ADD_POST, DELETE_POST, EDIT_POST } from "../graphQL/Mutations";
import { observer } from "mobx-react";
import { autorun } from "mobx";

export function TechnologyScreen({ navigation }: any) {
  const techsStore = useTechsStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState<PostsI>();
  const { showActionSheetWithOptions } = useActionSheet();

  const [deletePost, { data: deletedPost }] = useMutation(DELETE_POST);

  useEffect(() =>
    autorun(() => {
      console.log("autorun");
      navigation.setOptions({
        headerTitle:
          techsStore.technologies[techsStore.selectedIndex].name +
          ` (${
            techsStore.technologies[techsStore.selectedIndex].posts.length
          })`,
      });
    })
  );

  useEffect(() => {
    if (deletedPost) {
      techsStore.deletePost(deletedPost.deletePost.id);
    }
  }, [deletedPost]);

  const handleActionSheetActions = (index: number, item: PostsI) => {
    switch (index) {
      case 0:
        setIsEditingPost(item);
        setModalVisible(true);
        break;
      case 1:
        deletePost({
          variables: {
            id: item.id,
          },
        });
        break;
      default:
        break;
    }
  };

  const renderItem = (item: PostsI) => (
    <TouchableWithoutFeedback
      onPress={() => handlePress(item)}
      onLongPress={() => showActionSheet(item)}
    >
      <Post item={item} />
    </TouchableWithoutFeedback>
  );

  const handlePress = (item: PostsI) => {
    Linking.openURL(item.link);
  };

  const showActionSheet = (item: PostsI) => {
    showActionSheetWithOptions(
      {
        title: item.title,
        options: ["Edit", "Delete"],
        cancelButtonIndex: -1,
      },
      (index) => handleActionSheetActions(index, item)
    );
  };

  const AddEditTechModal = ({ onCloseModal, isEditingPost }: any) => {
    const [title, onTitleChange] = useState(
      isEditingPost ? isEditingPost.title : ""
    );
    const [owner, onOwnerChange] = useState(
      isEditingPost ? isEditingPost.owner : ""
    );
    const [link, onLinkChange] = useState(
      isEditingPost ? isEditingPost.link : ""
    );

    const [addPost, { data: newPost }] = useMutation(ADD_POST);
    const [editPost, { data: editedPost }] = useMutation(EDIT_POST);

    useEffect(() => {
      if (newPost) {
        techsStore.addPost(newPost.addPost);
        onCloseModal(false);
      }
      if (editedPost) {
        const updatedPost: PostsI = {
          ...editedPost.updatePost,
          title: title,
          owner: owner,
          link: link,
        };
        techsStore.editPost(updatedPost);
        onCloseModal(false);
      }
    }, [newPost, editedPost]);

    const handleAddPost = () => {
      const newDate = (+new Date()).toString();
      addPost({
        variables: {
          title: title,
          owner: owner,
          link: link,
          date: newDate,
          techId: techsStore.technologies[techsStore.selectedIndex].id,
        },
      });
    };
    const handleEditPost = () => {
      const newDate = (+new Date()).toString();
      editPost({
        variables: {
          id: isEditingPost.id,
          title: title,
          owner: owner,
          link: link,
          date: newDate,
          techId: techsStore.technologies[techsStore.selectedIndex].id,
        },
      });
    };
    return (
      <View style={styles.modal}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {isEditingPost ? isEditingPost.title : "Add New Post"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#000"
            onChangeText={(text) => onTitleChange(text)}
            value={title}
            autoFocus
          />
          <TextInput
            style={styles.input}
            placeholder="Created By"
            placeholderTextColor="#000"
            onChangeText={(text) => onOwnerChange(text)}
            value={owner}
          />
          <TextInput
            style={styles.input}
            placeholder="Link"
            placeholderTextColor="#000"
            onChangeText={(text) => onLinkChange(text)}
            value={link}
          />
          <View style={styles.button}>
            <Button
              title="Save"
              disabled={!title || !owner || !link}
              onPress={isEditingPost ? handleEditPost : handleAddPost}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.button, { alignSelf: "center", marginVertical: 30 }]}
      >
        <Button title="Add post" onPress={() => setModalVisible(true)} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsEditingPost(undefined);
        }}
      >
        <AddEditTechModal
          onCloseModal={setModalVisible}
          isEditingPost={isEditingPost}
        />
      </Modal>
      {techsStore.technologies[techsStore.selectedIndex].posts.length === 0 && (
        <Text style={styles.title}>No posts yet...</Text>
      )}
      <FlatList
        data={techsStore.technologies[techsStore.selectedIndex].posts}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default connectActionSheet(observer(TechnologyScreen));

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
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    color: "#000",
    backgroundColor: "#fff",
    padding: 5,
    marginBottom: 10,
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
