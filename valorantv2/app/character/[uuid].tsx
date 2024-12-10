import { DataContext } from "@/components/DataProvider";
import { useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CharacterScreen = () => {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();
  const { characters } = useContext(DataContext); // updateCharacter weg gelaten
  const navigation = useNavigation();

  const character = characters.find((character) => character.uuid === uuid);

  const [modalVisible, setModalVisible] = useState(false);
  const [displayName, setDisplayName] = useState(character?.displayName || "");
  const [description, setDescription] = useState(character?.description || "");
  const [imageUri, setImageUri] = useState(character!.displayIcon);

  // Handle the case where the character is not found (maybe show a 404 or similar message)
  if (!character) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Character not found</Text>
      </View>
    );
  }

  const toggleImage = () => {
    setImageUri((prevUri) =>
      prevUri === character.displayIcon
        ? character.fullPortrait!
        : character.displayIcon
    );
  };

  // const handleUpdate = () => {
  //   if (updateCharacter) {
  //     updateCharacter({ ...character, displayName, description });
  //     setModalVisible(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{character?.displayName}</Text>

      <View style={styles.card}>
        <View style={styles.upperCardContainer}>
          <TouchableOpacity onPress={toggleImage}>
            <Image
              source={{ uri: imageUri }}
              style={{ width: 200, height: 200 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.description}>
          <Text>{character?.description}</Text>
        </View>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={displayName}
                onChangeText={setDisplayName}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => {}}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
    gap: 50,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#ff4655",
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "white",
  },
  card: {
    backgroundColor: "lightgrey",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: "red",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  image: {
    width: 200,
    height: 200,
  },
  description: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ff4655",
    padding: 10,
  },
  upperCardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#ff4655",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff4655",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ff4655",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
});

export default CharacterScreen;
