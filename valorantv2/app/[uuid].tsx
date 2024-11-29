import { DataContext } from "@/components/DataProvider";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CharacterScreen = () => {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();
  const { characters } = useContext(DataContext);
  const navigation = useNavigation();

  const character = characters.find((character) => character.uuid === uuid);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{character?.displayName}</Text>

      <View style={styles.card}>
        <View style={styles.upperCardContainer}>
          <Image
            source={{ uri: character?.fullPortrait! }}
            style={styles.image}
          />
          <Text style={styles.roleTitle}>
            {character?.role?.displayName}
          </Text>
        </View>

        <View style={styles.description}>
          <Text>{character?.description}</Text>
        </View>
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
    backgroundColor: "#fff",
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
  roleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  description: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
    padding: 10,
  },
  upperCardContainer: {
    flexDirection: "row",
    alignItems: "center",
  }
});

export default CharacterScreen;
