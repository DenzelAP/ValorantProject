import { DataContext } from "@/components/DataProvider";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CharacterScreen = () => {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();
  const { characters } = useContext(DataContext);

  const character = characters.find((character) => character.uuid === uuid);

  return (
    <View style={styles.container}>
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
    fontSize: 24,
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
    borderColor: "#ddd",
    padding: 10,
  },
  upperCardContainer: {
    flexDirection: "row",
    alignItems: "center",
  }
});

export default CharacterScreen;
