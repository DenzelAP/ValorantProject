import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { Character } from "@/types";
import * as Font from "expo-font";

interface CharacterCardProps {
  item: Character;
}

const CharacterCard = ({ item }: CharacterCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.characterName}>{item.displayName}</Text>

      <Image
        source={{ uri: item.displayIcon }}
        style={styles.characterImage}
        resizeMode="cover"
      />
    </View>
  );
};

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filter, setFilter] = useState("");

  const filteredCharacters = characters.filter((character) =>
    character.displayName.toLowerCase().includes(filter.toLowerCase())
  );

  const loadCharacters = async () => {
    try {
      const response = await fetch("https://valorant-api.com/v1/agents");
      const data = await response.json();
      setCharacters(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      valorant: require("../../assets/fonts/ValorantFont.ttf"),
    });
  };

  useEffect(() => {
    loadCharacters();
    loadFonts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELECT AN AGENT</Text>

      <View>
        <TextInput
          onChangeText={(text) => setFilter(text)}
          value={filter}
          placeholder="Search for an agent..."
          style={{
            backgroundColor: "#fff",
            borderColor: "#ddd",
            height: 50,
            width: 325,
            borderRadius: 8,
            padding: 15,
            marginBottom: 10,
            borderWidth: 1,
            elevation: 10,
          }}
        />
      </View>

      <FlatList
        data={filteredCharacters}
        renderItem={({ item }) => <CharacterCard item={item} />}
        keyExtractor={(item) => item.uuid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "white",
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 8,
    backgroundColor: "#5A002C",
    borderWidth: 2,
    borderColor: "FF4D4D",
    borderRadius: 8,
    alignItems: "center",
    padding: 16,
    elevation: 4,
  },
  characterImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  characterName: {
    fontFamily: "valorant",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 8,
    textAlign: "center",
    color: "white",
  },
});

export default Characters;
