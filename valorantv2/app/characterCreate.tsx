import { DataContext } from "@/components/DataProvider";
import { Character } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

const CharacterCreate = () => {
  const [newCharacter, setNewCharacter] = useState<Character>({
    uuid: "",
    displayName: "",
    displayIcon:
      "https://cdn.oneesports.gg/cdn-data/wp-content/uploads/2020/12/Valorant_UnknownAgent.jpg",
    description: "",
    fullPortrait:
      "https://cdn.oneesports.gg/cdn-data/wp-content/uploads/2020/12/Valorant_UnknownAgent.jpg",
  });

  const { createCharacter } = useContext(DataContext);

  const navigation = useNavigation();

  const handleCreateCharacter = () => {
    if (createCharacter) {
      createCharacter(newCharacter);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.editContainer}>
        <Image
          style={styles.image}
          source={{
            uri: "https://cdn.oneesports.gg/cdn-data/wp-content/uploads/2020/12/Valorant_UnknownAgent.jpg",
          }}
        />

        <Text style={styles.inputDescription}>Display Name</Text>
        <TextInput
          onChangeText={(text) =>
            setNewCharacter({ ...newCharacter, displayName: text })
          }
          value={newCharacter.displayName}
          placeholder="Character Name"
          style={styles.input}
        />
        <Text style={styles.inputDescription}>Description</Text>
        <TextInput
          onChangeText={(text) =>
            setNewCharacter({ ...newCharacter, description: text })
          }
          value={newCharacter.description}
          placeholder="Character Description"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Create new character</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ff4655",
    height: 50,
    width: 325,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    elevation: 10,
  },
  button: {
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
  backButton: {
    position: "absolute",
    zIndex: 10,
    top: 30,
    left: 20,
    backgroundColor: "#ff4655",
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "white",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  editContainer: {
    alignItems: "center",
  },
  inputDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CharacterCreate;
