import { DataContext } from "@/components/DataProvider";
import { Character, RoleName } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const CharacterCreate = () => {
  const [newCharacter, setNewCharacter] = useState<Character>({
    uuid: "",
    displayName: "",
    displayIcon:
      "https://cdn.oneesports.gg/cdn-data/wp-content/uploads/2020/12/Valorant_UnknownAgent.jpg",
    description: "",
    fullPortrait:
      "https://cdn.oneesports.gg/cdn-data/wp-content/uploads/2020/12/Valorant_UnknownAgent.jpg",
    role: null,
  });

  const { characters, createCharacter } = useContext(DataContext);

  const navigation = useNavigation();

  const handleCreateCharacter = () => {
    // Ensure a fresh UUID is generated right before saving the character
    const characterWithUUID = { ...newCharacter, uuid: uuidv4() };

    if (createCharacter) {
      createCharacter(characterWithUUID); // Save character with a unique UUID
      Alert.alert("Character created successfully");
      navigation.goBack(); // Navigate back to the character list
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setNewCharacter({
        ...newCharacter,
        displayIcon: pickerResult.assets[0].uri,
      });
    } else {
      alert("Image selection cancelled");
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setNewCharacter({
        ...newCharacter,
        displayIcon: pickerResult.assets[0].uri,
      });
    } else {
      alert("Image selection cancelled");
    }
  };

  const roles = [
    { id: 1, name: RoleName.Controller },
    { id: 2, name: RoleName.Duelist },
    { id: 3, name: RoleName.Initiator },
    { id: 4, name: RoleName.Sentinel },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.editContainer}>
        {newCharacter.displayIcon ? (
          <Image
            source={{ uri: newCharacter.displayIcon }}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: "https://cdn.oneesports.gg/cdn-data/wp-content/uploads/2020/12/Valorant_UnknownAgent.jpg",
            }}
          />
        )}

        <View style={styles.imageButtons}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick from gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take a photo</Text>
          </TouchableOpacity>
        </View>

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

        <Text style={styles.inputDescription}>Role</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={newCharacter.role}
            onValueChange={(itemValue) =>
              setNewCharacter({ ...newCharacter, role: itemValue })
            }
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {roles.map((role) => (
              <Picker.Item key={role.id} label={role.name} value={role.name} />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleCreateCharacter}>
          <Text style={styles.buttonText}>Create new character</Text>
        </TouchableOpacity>
      </View>
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
  imageButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 275,
    marginBottom: 20,
    marginTop: 20,
  },
  picker: {
    height: 50,
    width: 325,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderColor: "#ff4655",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 10,
  },
  pickerItem: {
    fontWeight: 300,
  },
});

export default CharacterCreate;
